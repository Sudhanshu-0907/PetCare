import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Dashboard from '../../../src/css/dashboard';
import Layout from '../../../src/css/layout';
import Common from '../../../src/css/common';
import moment from 'moment';
import {Surface} from 'react-native-paper';
import {DashboardIcons} from '../../../src/icons/svgIcons';
import Chip from './Chip';

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
            Common.alignCenter,
            Common.p10,
            {
              backgroundColor: '#32409E',
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            },
          ]}>
          <View style={[Layout.row, Common.alignCenter]}>
            <Text
              style={[Common.textColorWhite, Common.fs16, {fontWeight: 700}]}>
              {item.name}
            </Text>
            {DashboardIcons('item.gender')}
          </View>

          <Text style={[Common.textColorWhite, Common.fs15, {fontWeight: 700}]}>
            {`${item.dob} (${moment().diff(
              moment(item.dob, 'DD MMM YYYY'),
              'years',
            )} years old)`}
          </Text>
        </View>
        <View style={[Layout.col7, Common.p10, Layout.row, {flexWrap: 'wrap'}]}>
          <Chip
            icon={'weight'}
            value={`${item.weights.length ? item.weight[0] : 0} Kg`}
          />

          <Chip
            icon={'vaccine'}
            value={`${item.vaccines.length ? item.vaccines[0] : 0}`}
          />

          <Chip icon={'camera'} value={` 0`} />

          <Chip icon={'bellIcon'} value={` 0`} />

          <Chip icon={'todo'} value={` 0`} />
        </View>
      </Surface>
    </SafeAreaView>
  );
};

export default List;
