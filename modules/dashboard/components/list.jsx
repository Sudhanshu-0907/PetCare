import {
  View,
  Text,
  SafeAreaView,
  Image,
  InteractionManager,
} from 'react-native';
import React from 'react';
import Dashboard from '../../../src/css/dashboard';
import Layout from '../../../src/css/layout';
import Common from '../../../src/css/common';
import moment from 'moment';
import {Surface} from 'react-native-paper';
import {DashboardIcons} from '../../../src/icons/svgIcons';
import Chip from './Chip';
import * as RootNavigation from '../../../utils/RootNavigation';
import {useFocusEffect} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const List = ({item, petId}) => {
  const [cameraCount, setCameraCount] = React.useState(0);
  const images = {
    Cat: require('../../../src/assets/defaultImg/Cat.png'),
    Dog: require('../../../src/assets/defaultImg/Dog.png'),
    Cow: require('../../../src/assets/defaultImg/Cow.png'),
    Rat: require('../../../src/assets/defaultImg/Rat.png'),
    Rabbit: require('../../../src/assets/defaultImg/Rabbit.png'),
    Fish: require('../../../src/assets/defaultImg/Fish.png'),
    // Add more images as needed
  };
  const onPress = screenName => {
    try {
      RootNavigation.navigate(screenName, {
        petId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const load = async () => {
    const user = auth().currentUser;
    const storageRef = storage().ref(`/users/${user.uid}/${petId}/`);
    const result = await storageRef.listAll();
    setCameraCount(result.items.length);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Anything in here is fired on component mount.
      const task = InteractionManager.runAfterInteractions(() => {
        load();
      });
      return () => {
        // Anything in here is fired on component unmount.
        task.cancel();
      };
    }, []),
  );

  return (
    <SafeAreaView>
      <Surface
        mode="elevated"
        elevation={2}
        style={[Dashboard.petProfile, Layout.col10, Layout.viewHeight]}>
        <View
          style={[
            Layout.col3,
            Common.p10,
            {
              backgroundColor: '#32409E',
              borderTopRightRadius: 18,
              borderTopLeftRadius: 18,
            },
          ]}>
          <View style={[Layout.row]}>
            <View
              style={{
                borderRadius: 200,
                backgroundColor: '#94DAFA',
                overflow: 'hidden',
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 70,
                  height: 70,
                }}
                source={images[item.species]}
              />
            </View>
            <View style={Common.ml15}>
              <View style={[Layout.row, Common.alignCenter]}>
                <Text
                  style={[
                    Common.textColorWhite,
                    Common.fs16,
                    {fontWeight: 600},
                  ]}>
                  {item.name}
                </Text>
                {DashboardIcons(item.gender)}
              </View>

              <Text
                style={[Common.textColorWhite, Common.fs15, {fontWeight: 700}]}>
                {`${item.dob} (${moment().diff(
                  moment(item.dob, 'DD MMM YYYY'),
                  'years',
                )} years old)`}
              </Text>

              <Text
                style={[Common.textColorWhite, Common.fs15, {fontWeight: 500}]}>
                {`${item.breed}`}
              </Text>
            </View>
          </View>
        </View>
        <View style={[Layout.col7, Common.p10, Layout.row, {flexWrap: 'wrap'}]}>
          <Chip
            icon={'weight'}
            value={`${
              item.weights.length > 0
                ? item.weights[item.weights.length - 1].weightKg
                : 0
            } Kg`}
            onPress={() => {
              onPress('Weights');
            }}
          />

          <Chip
            icon={'vaccine'}
            value={`${item.vaccines.length}`}
            onPress={() => {
              onPress('Vaccines');
            }}
          />

          <Chip
            icon={'camera'}
            value={cameraCount}
            onPress={() => {
              onPress('PetPhotos');
            }}
          />

          <Chip icon={'bellIcon'} value={` 0`} />

          <Chip icon={'todo'} value={` 0`} />
        </View>
      </Surface>
    </SafeAreaView>
  );
};

export default List;
