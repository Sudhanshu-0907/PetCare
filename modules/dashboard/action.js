/**
 * Plugins
 */
import {put, select, call, race, delay} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';

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
import {toastr} from '../../utils/common';

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
    console.log(error);
  }
}
