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

const List = ({item, petId, index, updateVaccineDataFn}) => {
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
          updateVaccineDataFn(index, petId);
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
                {borderBottomColor: '#9498C1', borderBottomWidth: 2},
              ]}>
              <Text
                style={[Common.fs16, Common.textColorList, {fontWeight: 700}]}>
                {item.vaccineName}
              </Text>
            </View>

            <View style={[Common.dFlex, Layout.col10, Layout.row]}>
              <View
                style={[Layout.col2, Common.alignCenter, Common.justifyCenter]}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  resizeMode="contain"
                  source={require('../../../src/assets/syringeImg.png')}
                />
              </View>

              <View style={[Layout.col8, Common.spaceAround]}>
                <View style={[Layout.row, Common.alignCenter]}>
                  <Text style={[Common.fs16, Common.textColorList]}>
                    From:{' '}
                    {moment(item.vaccineApplicationDate).format(
                      'DD MMM YYYY h:mm A',
                    )}
                  </Text>
                </View>

                {item.vaccineExpirationDate !== '' && (
                  <View
                    style={[
                      Layout.row,
                      // Common.spaceAround,
                      Common.alignCenter,
                      Common.mb10,
                    ]}>
                    <Text style={[Common.fs16, Common.textColorList]}>
                      Until:{' '}
                      {moment(item.vaccineExpirationDate).format(
                        'DD MMM YYYY h:mm A',
                      )}
                    </Text>
                  </View>
                )}
                {item.notes && (
                  <View>
                    <Text style={[Common.textColorgray, Common.pr20]}>
                      Notes:- {item.notes}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Surface>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default List;
