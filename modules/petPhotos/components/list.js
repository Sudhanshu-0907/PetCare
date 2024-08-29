import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  InteractionManager,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import moment from 'moment';
import Common from '../../../src/css/common';
import Layout from '../../../src/css/layout';

import * as RootNavigation from '../../../utils/RootNavigation';
import PetPhotos from '../../../src/css/petPhotos';

const List = ({index, petId, uploadPhotoFn}) => {
  const [response, setResponse] = useState('');
  const [uploading, setUploading] = useState(null);
  const [imageHeight, setImageHeight] = useState(0);
  const SCREENWIDTH = Dimensions.get('screen').width;

  const handleImageLoad = event => {
    const {width, height} = event.nativeEvent.source;
    setImageHeight(width > 0 ? (height / width) * (SCREENWIDTH * 0.38) : 0); // Calculate height based on aspect ratio and fixed width
  };

  const onClick = async () => {
    try {
      await uploadPhotoFn(index, petId, setResponse, setUploading);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDelete = async () => {
    try {
      const user = auth().currentUser;
      const storageRef = storage().ref(
        `/users/${user.uid}/${petId}/${moment(index + 1, 'MM').format(
          'MMM',
        )}_photo.jpg`,
      );
      storageRef
        .delete()
        .then(() => {
          setResponse('');
          setImageHeight(0);
        })
        .catch(error => {
          // console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      (async () => {
        const user = auth().currentUser;
        const storageRef = storage().ref(
          `/users/${user.uid}/${petId}/${moment(index + 1, 'MM').format(
            'MMM',
          )}_photo.jpg`,
        );
        storageRef
          .getDownloadURL()
          .then(downloadURL => {
            setResponse(downloadURL);
          })
          .catch(error => {
            // console.log(error);
          });
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={onClick}
      key={index}
      style={[PetPhotos.petProfile, {height: imageHeight}]}>
      {response && (
        <TouchableOpacity style={[PetPhotos.delete]} onPress={onClickDelete}>
          <MaterialCommunityIcons name="delete" size={30} color="#B71C1C" />
        </TouchableOpacity>
      )}
      <View style={[Common.p5, Common.bgBlue, PetPhotos.monthTag]}>
        <Text style={[Common.textColorWhite]}>
          {moment(index + 1, 'MM').format('MMM')}
        </Text>
      </View>
      <View
        style={[
          Common.alignCenter,
          Common.justifyCenter,

          {width: SCREENWIDTH * 0.38},
        ]}>
        {response ? (
          <Image
            resizeMode="contain"
            // resizeMethod="scale"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 14,
            }}
            source={{uri: response}}
            onLoad={handleImageLoad}
          />
        ) : uploading ? (
          <Text>Uploading...</Text>
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
