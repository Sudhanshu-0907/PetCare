/**
 * plugins
 */
import {View, Text, SafeAreaView, InteractionManager} from 'react-native';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import Header from '../Header';
import Layout from '../../src/css/layout';
import Common from '../../src/css/common';

import List from './components/list';
import {Button} from 'react-native-paper';

const Dashboard = props => {
  const load = async () => {
    props.fetchPetsDataFn();
    // const url = await storage().ref('DefaultImage/Doggy.png').getDownloadURL();
    // console.log(url);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Anything in here is fired on component mount.
      const task = InteractionManager.runAfterInteractions(() => {
        load();
      });
      return () => {
        props.resetFn();
        // Anything in here is fired on component unmount.
        task.cancel();
      };
    }, []),
  );

  useEffect(() => {
    const getFCMToken = async () => {
      try {
        // Get the reference to the user's pet collection
        const petCollectionRef = firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .collection('PetsCollections');

        // Fetch the pets collection snapshot
        const petsSnapshot = await petCollectionRef.get();

        // Iterate over each pet document
        for (const petDoc of petsSnapshot.docs) {
          // Get notifications from each pet document
          const notificationsSnapshot = await petDoc.ref
            .collection('Notifications')
            .get();

          // Process each notification
          await Promise.all(
            notificationsSnapshot.docs.map(async doc => {
              try {
                const fcmToken = await messaging().getToken(); // Get FCM token
                await doc.ref.update({
                  fcmToken: fcmToken, // Update notification with FCM token
                });
              } catch (error) {
                console.error(
                  'Error updating notification with FCM token:',
                  error,
                );
              }
            }),
          );
        }
      } catch (error) {
        console.error(
          'Error getting FCM token or processing notifications:',
          error,
        );
      }
    };

    getFCMToken();
  }, []);

  const renderItem = React.useCallback(({item, index}) => {
    return (
      <List item={item._data} key={item.id} petId={item.id} index={index} />
    );
  }, []);

  return (
    <SafeAreaView style={[Layout.viewHeight, Common.bgWhite]}>
      <View style={[Layout.viewHeight, {paddingHorizontal: 10}]}>
        <Header />
        <FlashList
          data={props.obj.list}
          estimatedItemSize={300}
          windowSize={7}
          initialListSize={36}
          initialNumToRender={36}
          maxToRenderPerBatch={72}
          removeClippedSubviews={true}
          renderItem={renderItem}
          scrollEventThrottle={16}
          keyExtractor={item => item.id}
        />
        <Button
          contentStyle={{flexDirection: 'row-reverse'}}
          onPress={props.signoutFn}
          icon="lock"
          mode="contained">
          Sign Out
        </Button>
      </View>
    </SafeAreaView>
  );
};

//getting state from reducer
const mapStateToProps = state => {
  return {
    obj: state.dashboard.obj,
  };
};

//sending data to reducer or action
const mapDispatchToProps = dispatch => {
  return {
    resetFn: () => dispatch({type: 'DASHBOARD_RESET'}),
    signoutFn: () => dispatch({type: 'SIGNOUT'}),
    fetchPetsDataFn: () => dispatch({type: 'FETCH_DATA'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
