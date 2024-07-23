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
import {
  handleFirebaseAuthError,
  toastr,
  validateEmail,
} from '../../utils/common';

export function* setLoginForm(params) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));
    if (params[0] === 'email') {
      obj.email = params[1];
      if (validateEmail(obj.email)) {
        obj.isEmailValid = true;
        obj.emailCaption = 'Looks good!';
      } else {
        obj.isEmailValid = false;
        obj.emailCaption = 'Please enter valid email';
      }
    } else if (params[0] === 'password') {
      obj.password = params[1];
      if (obj.password.length >= 8) {
        obj.isPasswordValid = true;
        obj.passwordCaption = 'Looks good!';
      } else {
        obj.isPasswordValid = false;
        obj.passwordCaption =
          'Please enter password greater than equal to 8 digits';
      }
    }

    yield put({
      type: 'LOGIN_OBJ',
      value: obj,
    });
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
  }
}

export function* submitLogin() {
  let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));
  try {
    // obj.loader = true;
    // yield put({
    //   type: 'LOGIN_OBJ',
    //   value: obj,
    // });

    const userCredential = yield auth()
      .signInWithEmailAndPassword(obj.email, obj.password)
      .catch(error => {
        handleFirebaseAuthError(error);
        console.log(error.message);

        // console.log(error);
      });
    const user = userCredential?.user;
    if (user != null) yield verifyEmail(user);
  } catch (error) {
    handleFirebaseAuthError(error);
    console.log(error.message);
  }
}

export function* verifyEmail(user) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));
    if (user.emailVerified) {
      //   navigation.navigate('Dashboard');
      obj.isEmailVerified = true;
    } else {
      toastr.showToast(
        'Please verify your email before logging in',
        'danger',
        2000,
      );
    }
    obj.loader = false;
    yield put({
      type: 'LOGIN_OBJ',
      value: obj,
    });
  } catch (error) {
    handleFirebaseAuthError(error);
    console.log(error.message);
  }
}
