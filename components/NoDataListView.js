import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

/**
 * css
 */
import Layout from '../src/css/layout';
import Common from '../src/css/common';

const NoDataListView = () => {
  return (
    <View
      style={[
        // Common.spaceBetween,
        Layout.col10,
        Layout.viewHeight,
        Common.alignCenter,
      ]}>
      <View style={[Layout.col5, Common.justifyCenter]}>
        <Text
          style={[
            Common.textColorBlack,
            Common.fs22,
            Common.textCenter,
            Common.mb10,
            {fontWeight: '700'},
          ]}>
          No Log Found
        </Text>
        <Text style={[Common.fs16, Common.textCenter]}>
          Add your first log by adding + Button on top right
        </Text>
      </View>

      <View style={[Layout.col5]}>
        <LottieView
          source={require('../src/assets/lottie/EmptyItem.json')}
          style={[
            Layout.col10,
            {
              width: 100,
              height: 100,
            },
          ]}
          autoPlay
          loop={false}
          resizeMode="cover"
          // speed={}
          // onAnimationFinish={() => setIsLoading(true)}
        />
      </View>
    </View>
  );
};

export default NoDataListView;
