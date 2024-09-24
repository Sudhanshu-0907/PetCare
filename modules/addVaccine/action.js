/**
 * Plugins
 */
import {put, select, call, race, delay} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/**
 * Utils
 */
import {handleFirebaseAuthError, toastr} from '../../utils/common';
import * as RootNavigation from '../../utils/RootNavigation';

/**
 * Common
 */

/**
 * Siblings
 */
import * as selector from './selector';

export function* addVaccineForm(params) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));
    const updatedObj = {...obj, [params[0]]: params[1]};

    yield put({
      type: 'ADD_VACCINE_OBJ',
      value: updatedObj,
    });
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
  }
}

export function* handleVaccineSubmit({
  petId,
  isUpdated,
  vaccineIndex,
  isDelete,
}) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));

    const errors = {};
    if (!obj.vaccineName) errors.vaccineName = 'Required*';
    // if (!obj.weightGrams) errors.weightGrams = 'Required*';
    obj.errors = errors;

    yield put({
      type: 'ADD_VACCINE_OBJ',
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
      const vaccinesArray = data.vaccines || [];

      if (isDelete) {
        if (vaccineIndex >= 0 && vaccineIndex < vaccinesArray.length) {
          // Remove the entry at the given index
          vaccinesArray.splice(vaccineIndex, 1);

          // Update Firestore with the modified array
          yield docRef.update({
            vaccines: vaccinesArray,
          });
        }
      } else if (isUpdated) {
        // Ensure the index exists within the array
        if (vaccineIndex >= 0 && vaccineIndex < vaccinesArray.length) {
          // Update the specific element at the index
          vaccinesArray[vaccineIndex] = {
            vaccineName: obj.vaccineName,
            vaccineApplicationDate: obj.vaccineApplicationDate,
            vaccineExpirationDate: obj.vaccineExpirationDate,
            notes: obj.notes,
          };

          // Update the entire array in Firestore
          yield docRef.update({
            vaccines: vaccinesArray,
          });
        }
      } else {
        yield docRef.update({
          vaccines: firestore.FieldValue.arrayUnion({
            vaccineName: obj.vaccineName,
            vaccineApplicationDate: obj.vaccineApplicationDate,
            vaccineExpirationDate: obj.vaccineExpirationDate,
            notes: obj.notes,
          }),
        });
      }
      RootNavigation.goBack();
    }
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
  }
}
