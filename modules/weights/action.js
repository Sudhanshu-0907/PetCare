/**
 * Plugins
 */
import {put, select, call, race, delay} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/**
 * Utils
 */
import * as RootNavigation from '../../utils/RootNavigation';

/**
 * Common
 */

/**
 * Siblings
 */
import * as selector from './selector';
import {handleFirebaseAuthError, toastr} from '../../utils/common';
import moment from 'moment';

export function* fetchWeightsData({petId}) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));

    const docRef = yield firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection('PetsCollections')
      .doc(petId);
    const docSnapshot = yield docRef.get();
    let weights;
    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      weights = data.weights || []; // Access the weights array, default to empty array if not found
    } else {
      console.log('Document does not exist!');
    }

    obj.list = weights;
    yield put({
      type: 'WEIGHTS_OBJ',
      value: obj,
    });
  } catch (error) {
    handleFirebaseAuthError(error);
    if (__DEV__) console.log(error.message);
  }
}

export function* updatePetsData({index, petId}) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj))),
      addWeightObj = JSON.parse(
        JSON.stringify(yield select(selector.addWeightObj)),
      );

    addWeightObj = {
      ...addWeightObj,
      ...obj.list[index],
      dateOfWeight: moment(obj.list[index].dateOfWeight),
    };

    yield put({
      type: 'ADD_WEIGHT_OBJ',
      value: addWeightObj,
    });

    RootNavigation.navigate('AddWeight', {
      isUpdated: true,
      petId,
      weightIndex: index,
    });
  } catch (error) {
    handleFirebaseAuthError(error);
    if (__DEV__) console.log(error.message);
  }
}
