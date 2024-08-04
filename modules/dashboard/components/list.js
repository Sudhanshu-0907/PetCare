import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Dashboard from '../../../css/dashboard';
import Layout from '../../../css/layout';
import Common from '../../../css/common';
import moment from 'moment';
import {Surface} from 'react-native-paper';

const List = ({item}) => {
  return (
    <SafeAreaView>
      <Surface
        mode="elevated"
        elevation={3}
        style={[Dashboard.petProfile, Layout.col10]}>
        <View
          style={[
            Layout.col3,
            // Common.justifyCenter,
            Common.alignCenter,
            Common.p10,
            {backgroundColor: '#99C0E7'},
          ]}>
          <Text style={[Common.textColorList, Common.fs16, {fontWeight: 700}]}>
            {item.name}
          </Text>
          <Text style={[Common.textColorList, Common.fs16, {fontWeight: 700}]}>
            {`${item.dob} (${moment().diff(
              moment(item.dob, 'DD MMM YYYY'),
              'years',
            )} years old)`}
          </Text>
          <Text style={[Common.textColorList, Common.fs16, {fontWeight: 700}]}>
            {item.gender}
          </Text>
        </View>
        <View style={[Layout.col7, Common.p10]}>
          <Text>{`Weight: ${item.weights.length ? item.weight[0] : 0}`}</Text>
          <Text>{`Vaccines: ${
            item.vaccines.length ? item.vaccines[0] : 0
          }`}</Text>
          <Text>{`Notification: ${2}`}</Text>
          <Text>{`Todo: ${2}`}</Text>
        </View>
      </Surface>
    </SafeAreaView>
  );
};

export default List;
