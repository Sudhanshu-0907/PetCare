/**
 * plugins
 */
import {View, Text, SafeAreaView, InteractionManager} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

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
