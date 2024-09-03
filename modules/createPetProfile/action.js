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
  addSubcollectionToDocument,
} from '../../utils/common';

/**
 * Siblings
 */
import * as selector from './selector';
import moment from 'moment';

export function* addPetsFn() {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));

    const userId = auth().currentUser.uid;
    const petDetails = {
      userId,
      species: obj.petSpecies[obj.selected].name,
      name: obj.name,
      gender: obj.gender,
      breed: obj.breed,
      color: obj.color,
      dob: moment(obj.dob).format('DD MMM YYYY'),
      isIndoor: obj.isIndoor,
      weights: [],
      vaccines: [],
    };

    yield addPetDetails(userId, petDetails);

    if (obj.isEmptyPetCollection) {
      RootNavigation.resetLevelOfStack('Dashboard', 0); //reset to top level
    } else RootNavigation.navigate('Dashboard');
  } catch (error) {
    handleFirebaseAuthError(error);
    console.log(error.message);
  }
}
export function* isEmptyFn() {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));
    const isEmpty = yield isCollectionEmpty('PetsCollections');
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

export function* setLoginForm(params) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));
    const updatedObj = {...obj, [params[0]]: params[1]};

    yield put({
      type: 'CREATE_PET_PROFILE_OBJ',
      value: updatedObj,
    });
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
  }
}
