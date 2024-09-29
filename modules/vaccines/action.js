/**
 * Plugins
 */
import {put, select, call, race, delay} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
import {handleFirebaseAuthError, toastr} from '../../utils/common';
import moment from 'moment';

export function* fetchVaccinesDataFn({petId}) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));

    const docRef = yield firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection('PetsCollections')
      .doc(petId);
    const docSnapshot = yield docRef.get();
    let vaccines;
    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      vaccines = data.vaccines || []; // Access the vaccines array, default to empty array if not found
    } else {
      console.log('Document does not exist!');
    }

    obj.list = vaccines;
    yield put({
      type: 'VACCINES_OBJ',
      value: obj,
    });
  } catch (error) {
    handleFirebaseAuthError(error);
    if (__DEV__) console.log(error.message);
  }
}

export function* updateVaccineDataFn({index, petId}) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj))),
      addVaccineObj = JSON.parse(
        JSON.stringify(yield select(selector.addVaccineObj)),
      );

    addVaccineObj = {
      ...addVaccineObj,
      ...obj.list[index],
      vaccineApplicationDate: moment(obj.list[index].vaccineApplicationDate),
    };

    yield put({
      type: 'ADD_VACCINE_OBJ',
      value: addVaccineObj,
    });

    RootNavigation.navigate('AddVaccine', {
      isUpdated: true,
      petId,
      vaccineIndex: index,
    });
  } catch (error) {
    handleFirebaseAuthError(error);
    if (__DEV__) console.log(error.message);
  }
}
