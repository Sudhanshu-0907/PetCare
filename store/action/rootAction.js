/**
 * Plugins
 */
import {takeLatest} from 'redux-saga/effects';

/**
 * Modules
 */
import * as login from '../../modules/login/action';
import * as dashboard from '../../modules/dashboard/action';
import * as signUp from '../../modules/signUp/action';
import * as forgotPassword from '../../modules/forgotPassword/action';
import * as createPetProfile from '../../modules/createPetProfile/action';

export function* watch() {
  try {
    //login
    yield takeLatest('LOGIN_FORM', login.setLoginForm);
    yield takeLatest('LOGIN_SUBMIT', login.submitLogin);

    //signUp
    yield takeLatest('SIGNUP_FORM', signUp.setFormfn);
    yield takeLatest('SIGNUP_SUBMIT', signUp.submitFn);

    //forgotPassword
    yield takeLatest('FORGOT_PASSWORD_FORM', forgotPassword.setFormFn);
    yield takeLatest('FORGOT_PASSWORD_SUBMIT', forgotPassword.submitFn);

    //dashboard
    yield takeLatest('SIGNOUT', dashboard.signoutFn);
    yield takeLatest('FETCH_DATA', dashboard.fetchPetsData);

    //createPetProfile
    yield takeLatest('ADD_PROFILE_PET', createPetProfile.addPetsFn);
    yield takeLatest('IS_PETS_EMPTY', createPetProfile.isEmptyFn);
    yield takeLatest('CREATE_PET_PROFILE_FORM', createPetProfile.setLoginForm);
  } catch (e) {
    console.log(e);
  }
}
