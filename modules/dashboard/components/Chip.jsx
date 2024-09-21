import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {DashboardIcons} from '../../../src/icons/svgIcons';
import Common from '../../../src/css/common';
import Layout from '../../../src/css/layout';

const Chip = ({icon, value, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        Layout.row,
        Common.alignCenter,
        Common.spaceBetween,
        {
          width: 100,
          borderWidth: 3,
          borderColor: '#32409E',
          backgroundColor: '#303F9B',
          borderRadius: 20,
          margin: 10,
          paddingRight: 5,
        },
      ]}>
      <View
        style={{
          padding: 5,
          backgroundColor: '#94DAFA',
          borderRadius: 50,
        }}>
        {DashboardIcons(icon)}
      </View>
      <Text style={[Common.textColorWhite, Common.pr10]}>{value}</Text>
    </TouchableOpacity>
  );
};

export default Chip;
