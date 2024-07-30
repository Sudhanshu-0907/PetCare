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
import {
  addPetDetails,
  handleFirebaseAuthError,
  isCollectionEmpty,
  toastr,
} from '../../utils/common';

/**
 * Siblings
 */
import * as selector from './selector';

export function* addPetsFn() {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));

    const userId = auth().currentUser.uid;
    const petDetails = {
      userId,
      name: 'tota',
      gender: 'female',
      breed: 'parrot',
      colour: 'green',
      dob: '',
      isIndoorPet: false,
      isSterialisedPet: false,
    };

    yield addPetDetails(userId, petDetails);
    if (obj.isEmptyPetCollection) {
      RootNavigation.resetLevelOfStack('Dashboard', 0); //reset to top level
    }
  } catch (error) {
    handleFirebaseAuthError(error);
    console.log(error.message);
  }
}
export function* isEmptyFn() {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));
    const isEmpty = yield isCollectionEmpty('PetsCollection');
    obj.isEmptyPetCollection = isEmpty;
    yield put({
      type: 'CREATE_PET_PROFILE_OBJ',
      value: obj,
    });
  } catch (error) {
    handleFirebaseAuthError(error);
    console.log(error.message);
  }
}
