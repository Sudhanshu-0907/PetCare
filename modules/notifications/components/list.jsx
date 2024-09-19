import {
  View,
  Text,
  SafeAreaView,
  Image,
  InteractionManager,
  Switch,
} from 'react-native';
import React from 'react';
import Dashboard from '../../../src/css/dashboard';
import Layout from '../../../src/css/layout';
import Common from '../../../src/css/common';
import moment from 'moment';
import {Surface} from 'react-native-paper';
import {DashboardIcons} from '../../../src/icons/svgIcons';
import * as RootNavigation from '../../../utils/RootNavigation';
import {useFocusEffect} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const List = ({item, petId, index, updateNotification}) => {
  const onPress = screenName => {
    try {
      RootNavigation.navigate(screenName, {
        petId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const load = async () => {};

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
        <View style={[Layout.col10, Common.p10, Layout.row]}>
          <View
            style={[
              Layout.col3,
              Common.alignCenter,
              Common.spaceAround,
              {borderRightColor: 'gray', borderRightWidth: 1},
            ]}>
            <Text style={[Common.textCenter]}> {item.title}</Text>
            <Switch
              trackColor={{false: 'red', true: 'green'}}
              ios_backgroundColor="#3e3e3e"
              thumbColor={item.enable ? '#f4f3f4' : '#f4f3f4'}
              onValueChange={val => {
                updateNotification(petId, index, {enable: val});
              }}
              value={item.enable}
            />
          </View>
          <View
            style={[
              Layout.col7,
              Common.alignCenter,
              Common.spaceAround,
              {gap: 5},
            ]}>
            <Text>Every 1st {item.repeatInterval}</Text>
            <Text>{moment(item.scheduledTime).format('DD/MM/YYYY')}</Text>
            <Text>{item.body}</Text>
          </View>
        </View>
      </Surface>
    </SafeAreaView>
  );
};

export default List;
