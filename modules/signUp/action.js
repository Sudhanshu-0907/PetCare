/**
 * Plugins
 */
import {put, select, call, race, delay} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';

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
import {
  handleFirebaseAuthError,
  toastr,
  validateEmail,
} from '../../utils/common';

export function* setFormfn(params) {
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
  try {
    var obj = JSON.parse(JSON.stringify(yield select(selector.obj)));
    if (obj.password !== obj.confirmPassword) {
      toastr.showToast('Password do not matched!', 'danger', 2000);
      return;
    }
    // obj.loader = true;
    yield put({
      type: 'SIGNUP_OBJ',
      value: obj,
    });
    const userCredential = yield auth().createUserWithEmailAndPassword(
      obj.email,
      obj.password,
    );
    const user = userCredential.user;
    yield user.sendEmailVerification();

    toastr.showToast(
      'Verification email sent. Please check your email',
      'danger',
      2000,
    );
    RootNavigation.goBack();
  } catch (error) {
    obj.loader = false;
    yield put({
      type: 'SIGNUP_OBJ',
      value: obj,
    });
    handleFirebaseAuthError(error);
    console.log(error.message);
  }
}
