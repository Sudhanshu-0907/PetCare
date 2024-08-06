/**
 * Plugins
 */
import {put, select, call, race, delay} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

/**
 * Utils
 */

/**
 * Common
 */
import {handleFirebaseAuthError, toastr} from '../../utils/common';

/**
 * Siblings
 */
import * as selector from './selector';
import moment from 'moment';

export function* photoUpload(params) {
  console.log(params);
  try {
    const {0: index, 1: petId, 2: setResponse, 3: setUploading} = params;

    const OPTIONS = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    };

    const result = yield launchImageLibrary(OPTIONS);
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else {
      setUploading(true);
      const imageUri = result.assets[0].uri;
      const user = auth().currentUser;

      if (user) {
        const storageRef = storage().ref(
          `/users/${user.uid}/${petId}/${moment(index + 1, 'MM').format(
            'MMM',
          )}_photo.jpg`,
        );
        const response = yield fetch(imageUri);
        const blob = yield response.blob();

        const task = storageRef.put(blob);

        task.on('state_changed', snapshot => {
          console.log(`Transferred: ${snapshot.bytesTransferred}`);
        });

        task.then(async () => {
          const downloadURL = await storageRef.getDownloadURL();
          setUploading(false);
          setResponse(downloadURL);
        });
      } else {
        console.log('User not authenticated');
      }
    }
    // yield put({
    //   type: 'PET_PHOTOS_OBJ',
    //   value: obj,
    // });
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
  }
}
