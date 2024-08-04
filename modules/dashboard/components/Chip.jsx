import {View, Text} from 'react-native';
import React from 'react';
import {DashboardIcons} from '../../../src/icons/svgIcons';
import Common from '../../../src/css/common';
import Layout from '../../../src/css/layout';

const Chip = ({icon, value}) => {
  return (
    <View
      style={[
        Layout.row,
        Common.alignCenter,
        Common.spaceBetween,
        {
          width: 80,
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
          backgroundColor: '#FFFA4A',
          borderRadius: 50,
        }}>
        {DashboardIcons(icon)}
      </View>
      <Text style={[Common.textColorWhite]}>{value}</Text>
    </View>
  );
};

export default Chip;
