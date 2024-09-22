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
import {
  handleFirebaseAuthError,
  isCollectionEmpty,
  toastr,
} from '../../utils/common';

/**
 * Common
 */

/**
 * Siblings
 */
import * as selector from './selector';
import moment from 'moment';

export function* signoutFn() {
  try {
    let loginObj = JSON.parse(JSON.stringify(yield select(selector.loginObj)));

    loginObj.isEmailVerified = false;
    yield put({
      type: 'LOGIN_OBJ',
      value: loginObj,
    });

    yield auth().signOut();
  } catch (error) {
    handleFirebaseAuthError(error);
    console.log(error.message);
  }
}

export function* fetchPetsData() {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));

    if (yield isCollectionEmpty('PetsCollections')) {
      RootNavigation.resetLevelOfStack('CreatePetProfile', 0); //rest to top level
    } else {
      const petsSnapshot = yield firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .collection('PetsCollections')
        .get();
      const pets = petsSnapshot.docs.map(doc => ({
        id: doc.id, // Get the document ID
        ...doc.data(), // Get the document data
      }));
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

export function* updatePetsData({index}) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj))),
      createPetProfileObj = JSON.parse(
        JSON.stringify(yield select(selector.createPetProfileObj)),
      );

    const selectedIndex = createPetProfileObj.petSpecies.findIndex(
      pet => pet.name === obj.list[index].species,
    );

    createPetProfileObj = {
      ...createPetProfileObj,
      ...obj.list[index],
      dob: moment(obj.list[index].dob, 'DD MMM YYYY'),
      selected: selectedIndex,
    };
    yield put({
      type: 'CREATE_PET_PROFILE_OBJ',
      value: createPetProfileObj,
    });
    RootNavigation.navigate('CreatePetProfile', {
      isUpdate: true,
      petid: obj.list[index].id,
    });

    // yield firestore()
    //   .collection('Users')
    //   .doc(auth().currentUser.uid)
    //   .collection('PetsCollections')
    //   .doc(obj.list[index].id) // Use the provided petId
    //   .update({
    //     name: 'Updated Dog', // Update the fields as needed
    //     age: 5, // Add or modify other fields as required
    //   });
    //
  } catch (error) {
    handleFirebaseAuthError(error);
    if (__DEV__) console.log(error.message);
  }
}
