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

export function* setFormfn(params) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));
    if (params[0] === 'email') {
      obj.email = params[1];
    } else if (params[0] === 'password') {
      obj.password = params[1];
    } else if (params[0] === 'confirmPassword') {
      obj.confirmPassword = params[1];
    }
    yield put({
      type: 'SIGNUP_OBJ',
      value: obj,
    });
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
  }
}

export function* submitFn() {
  let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));
  try {
    if (obj.password !== obj.confirmPassword) {
      toastr.showToast('Password do not matched!', 'danger', 2000);
      return;
    }
    obj.loader = true;
    yield put({
      type: 'SIGNUP_OBJ',
      value: obj,
    });
    const userCredential = yield auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    yield user
      .sendEmailVerification()
      .then
      // props.navigation.navigate('Login')
      ();
    toastr.showToast(
      'Verification email sent. Please check your email',
      'danger',
      2000,
    );
  } catch (error) {
    obj.loader = false;
    yield put({
      type: 'SIGNUP_OBJ',
      value: obj,
    });
    toastr.showToast(error, 'danger', 2000);
    console.log(error);
  }
}
