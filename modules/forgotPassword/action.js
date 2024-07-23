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
import {handleFirebaseAuthError, toastr} from '../../utils/common';

export function* setFormFn(params) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));
    const updatedObj = {...obj, [params[0]]: params[1]};
    yield put({
      type: 'FORGOT_PASSWORD_OBJ',
      value: updatedObj,
    });
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
  }
}

export function* submitFn({email}) {
  let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));
  try {
    yield auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        toastr.showToast('Email sent sucessfully!', 'danger', 2000);
      })
      .catch(function (error) {
        handleFirebaseAuthError(error);
        console.log(error.message);
      });
  } catch (error) {
    handleFirebaseAuthError(error);
    console.log(error.message);
  }
}
