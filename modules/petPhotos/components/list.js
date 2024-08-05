import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import moment from 'moment';
import Common from '../../../src/css/common';
import Layout from '../../../src/css/layout';

import * as RootNavigation from '../../../utils/RootNavigation';
import PetPhotos from '../../../src/css/petPhotos';

const List = ({index}) => {
  const [response, setResponse] = useState(null);
  const [imageHeight, setImageHeight] = useState(0);

  const handleImageLoad = event => {
    const {width, height} = event.nativeEvent.source;
    setImageHeight(width > 0 ? (height / width) * (SCREENWIDTH * 0.4) : 0); // Calculate height based on aspect ratio and fixed width
  };

  const SCREENWIDTH = Dimensions.get('screen').width;

  const OPTIONS = {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
    includeExtra: true,
  };
  return (
    <TouchableOpacity
      onPress={async () => {
        await launchImageLibrary(OPTIONS, setResponse);
      }}
      key={index}
      style={[
        PetPhotos.petProfile,
        {width: SCREENWIDTH * 0.4, height: imageHeight},
      ]}>
      <View style={[Common.p5, Common.bgBlue, PetPhotos.monthTag]}>
        <Text style={[Common.textColorWhite]}>
          {moment(index + 1, 'MM').format('MMM')}
        </Text>
      </View>
      <View
        style={[
          Common.alignCenter,
          Common.justifyCenter,

          {width: SCREENWIDTH * 0.4},
        ]}>
        {response?.assets ? (
          <Image
            resizeMode="contain"
            // resizeMethod="scale"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 16,
            }}
            source={{uri: response?.assets[0].uri}}
            onLoad={handleImageLoad}
          />
        ) : (
          <MaterialCommunityIcons
            name="file-image-plus"
            size={40}
            color="#BDBDBD"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default List;
