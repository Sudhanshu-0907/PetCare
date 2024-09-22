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
import * as petPhotos from '../../modules/petPhotos/action';
import * as addWeight from '../../modules/addWeight/action';
import * as weights from '../../modules/weights/action';
import * as vaccines from '../../modules/vaccines/action';
import * as addVaccine from '../../modules/addVaccine/action';
import * as notifications from '../../modules/notifications/action';

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
    yield takeLatest('UPDATE_DATA', dashboard.updatePetsData);

    //createPetProfile
    yield takeLatest('ADD_PROFILE_PET', createPetProfile.addPetsFn);
    yield takeLatest('IS_PETS_EMPTY', createPetProfile.isEmptyFn);
    yield takeLatest('CREATE_PET_PROFILE_FORM', createPetProfile.setLoginForm);
    yield takeLatest('DELETE_PET', createPetProfile.deletePetFn);

    //petPhoto
    yield takeLatest('UPLOAD_PHOTO', petPhotos.photoUpload);

    //addPet
    yield takeLatest('ADD_WEIGHT_FORM', addWeight.addWeightForm);
    yield takeLatest('ADD_WEIGHT_SUBMIT', addWeight.handleWeightSubmit);

    //weights
    yield takeLatest('WEIGHTS_LIST_FN', weights.fetchWeightsData);

    // notifications
    yield takeLatest(
      'NOTIFICATIONS_LIST_FN',
      notifications.fetchNotificationsData,
    );
    yield takeLatest('NOTIFICATIONS_UPDATE', notifications.updateNotification);

    //vaccines
    yield takeLatest('VACCINES_LIST_FN', vaccines.fetchVaccinesDataFn);

    //addVaccine
    yield takeLatest('ADD_VACCINE_FORM', addVaccine.addVaccineForm);
    yield takeLatest('ADD_VACCINE_SUBMIT', addVaccine.handleVaccineSubmit);
  } catch (e) {
    console.log(e);
  }
}
