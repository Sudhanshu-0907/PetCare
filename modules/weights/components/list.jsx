import {
  View,
  Text,
  SafeAreaView,
  Image,
  InteractionManager,
  TouchableOpacity,
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

const List = ({item, petId, index, updateWeightDataFn}) => {
  const [cameraCount, setCameraCount] = React.useState(0);

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
      <TouchableOpacity
        onPress={() => {
          updateWeightDataFn(index, petId);
        }}>
        <Surface
          mode="elevated"
          elevation={2}
          style={[Dashboard.petProfile, Layout.col10, Layout.viewHeight]}>
          <View style={[Common.p10]}>
            <View
              style={[
                Layout.row,
                Common.spaceAround,
                Common.alignCenter,
                Common.mb10,
              ]}>
              <Text style={[Common.fs16, Common.textColorList]}>
                {moment(item.dateOfWeight).format('DD MMM YYYY h:mm A')}
              </Text>
              <Text
                style={[Common.fs16, Common.textColorList, {fontWeight: 600}]}>
                {`${item.weightKg} kg ${
                  item.weightGrams > 0 ? item.weightGrams.toString() + 'g' : ''
                }`}
              </Text>
            </View>
            {item.notes && (
              <View>
                <Text style={[Common.textColorgray, Common.pl20, Common.pr20]}>
                  Notes:- {item.notes}
                </Text>
              </View>
            )}
          </View>
        </Surface>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default List;
