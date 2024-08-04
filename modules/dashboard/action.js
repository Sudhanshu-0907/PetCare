/**
 * Plugins
 */
import {put, select, call, race, delay} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as RootNavigation from '../../utils/RootNavigation';

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
import {
  handleFirebaseAuthError,
  isCollectionEmpty,
  toastr,
} from '../../utils/common';

export function* signoutFn() {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj))),
      loginObj = JSON.parse(JSON.stringify(yield select(selector.loginObj)));

    loginObj.isEmailVerified = false;
    yield put({
      type: 'LOGIN_OBJ',
      value: obj,
    });

    yield auth().signOut();
  } catch (error) {
    handleFirebaseAuthError(error);
    if (__DEV__) console.log(error.message);
  }
}

export function* fetchPetsData() {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));

    if (yield isCollectionEmpty('PetsCollection')) {
      RootNavigation.resetLevelOfStack('CreatePetProfile', 0); //rest to top level
    } else {
      const petsSnapshot = yield firestore().collection('PetsCollection').get();
      const pets = petsSnapshot.docs.filter(doc => {
        return doc._data.userId === auth().currentUser.uid;
      });
      obj.list = pets;
      yield put({
        type: 'DASHBOARD_OBJ',
        value: obj,
      });
    }
  } catch (error) {
    handleFirebaseAuthError(error);
    if (__DEV__) console.log(error.message);
  }
}
