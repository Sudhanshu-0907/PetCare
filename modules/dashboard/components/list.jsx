import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';
import Dashboard from '../../../src/css/dashboard';
import Layout from '../../../src/css/layout';
import Common from '../../../src/css/common';
import moment from 'moment';
import {Surface} from 'react-native-paper';
import {DashboardIcons} from '../../../src/icons/svgIcons';
import Chip from './Chip';
// import DogGif from '../../../src/assets/DogGif';

const List = ({item}) => {
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
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            },
          ]}>
          <View style={[Layout.row]}>
            <View
              style={{
                borderRadius: 200,
                backgroundColor: 'yellow',
                overflow: 'hidden',
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 70,
                  height: 70,
                }}
                source={require('../../../src/assets/Dog.png')}
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
            value={`${item.weights.length ? item.weight[0] : 0} Kg`}
          />

          <Chip icon={'vaccine'} value={`${item.vaccines.length}`} />

          <Chip icon={'camera'} value={` 0`} />

          <Chip icon={'bellIcon'} value={` 0`} />

          <Chip icon={'todo'} value={` 0`} />
        </View>
      </Surface>
    </SafeAreaView>
  );
};

export default List;
