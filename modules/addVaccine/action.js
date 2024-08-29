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

export function* handleVaccineSubmit({petId}) {
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
      const docRef = firestore().collection('PetsCollection').doc(petId);

      yield docRef.update({
        vaccines: firestore.FieldValue.arrayUnion({
          vaccineName: obj.vaccineName,
          vaccineApplicationDate: obj.vaccineApplicationDate,
          vaccineExpirationDate: obj.vaccineExpirationDate,
          notes: obj.notes,
        }),
      });
      RootNavigation.goBack();
    }
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
  }
}
