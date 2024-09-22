/**
 * Plugins
 */
import {put, select, call, race, delay} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/**
 * Utils
 */

/**
 * Common
 */

/**
 * Siblings
 */
import * as selector from './selector';
import {handleFirebaseAuthError, toastr} from '../../utils/common';
import * as RootNavigate from '../../utils/RootNavigation';

export function* addWeightForm(params) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));
    const updatedObj = {...obj, [params[0]]: params[1]};

    yield put({
      type: 'ADD_WEIGHT_OBJ',
      value: updatedObj,
    });
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
  }
}

export function* handleWeightSubmit({petId, isUpdated, weightIndex, isDelete}) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));

    const errors = {};
    if (!obj.weightKg) errors.weightKg = 'Required*';
    if (!obj.weightGrams) errors.weightGrams = 'Required*';
    obj.errors = errors;

    yield put({
      type: 'ADD_WEIGHT_OBJ',
      value: obj,
    });

    if (Object.keys(obj.errors).length === 0) {
      const docRef = yield firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .collection('PetsCollections')
        .doc(petId);
      const docSnapshot = yield docRef.get();
      const data = docSnapshot.data();
      const weightsArray = data.weights || [];

      if (isDelete) {
        if (weightIndex >= 0 && weightIndex < weightsArray.length) {
          // Remove the entry at the given index
          weightsArray.splice(weightIndex, 1);

          // Update Firestore with the modified array
          yield docRef.update({
            weights: weightsArray,
          });
        }
      } else if (isUpdated) {
        // Ensure the index exists within the array
        if (weightIndex >= 0 && weightIndex < weightsArray.length) {
          // Update the specific element at the index
          weightsArray[weightIndex] = {
            dateOfWeight: obj.dateOfWeight, // New or updated dateOfWeight
            weightKg: obj.weightKg,
            weightGrams: obj.weightGrams,
            notes: obj.notes,
          };

          // Update the entire array in Firestore
          yield docRef.update({
            weights: weightsArray,
          });
        }
      } else {
        yield docRef.update({
          weights: firestore.FieldValue.arrayUnion({
            dateOfWeight: obj.dateOfWeight,
            weightKg: obj.weightKg,
            weightGrams: obj.weightGrams,
            notes: obj.notes,
            updatedAt: firestore.FieldValue.serverTimestamp(),
          }),
        });
      }
      RootNavigate.goBack();
    }
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
  }
}
