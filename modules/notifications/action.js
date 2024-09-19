/**
 * Plugins
 */
import {put, select, call, race, delay} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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

export function* fetchNotificationsData({petId}) {
  try {
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));

    const docRef = yield firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection('PetsCollections')
      .doc(petId)
      .collection('Notifications')
      .get();
    let notifications = docRef.docs.map(doc => ({
      notificationsId: doc.id, // This is the notificationId (document ID)
      ...doc.data(), // This spreads the rest of the document data
    }));
    // if (docSnapshot.exists) {
    //   const data = docSnapshot.data();
    //   notifications = data || []; // Access the weights array, default to empty array if not found
    // } else {
    //   console.log('Document does not exist!');
    // }

    obj.list = notifications;
    yield put({
      type: 'NOTIFICATIONS_OBJ',
      value: obj,
    });
  } catch (error) {
    handleFirebaseAuthError(error);
    if (__DEV__) console.log(error.message);
  }
}

export function* updateNotification({petId, index, param}) {
  try {
    // Retrieve the 'obj' from the Redux store via 'select' and deep clone it
    let obj = JSON.parse(JSON.stringify(yield select(selector.obj)));

    // Access Firestore to update the notification field
    yield firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection('PetsCollections')
      .doc(petId)
      .collection('Notifications')
      .doc(obj.list[index].notificationsId) // Using the notificationId
      .update({
        ...param, // Update the 'enable' field with the provided 'param'
      });

    obj.list[index] = {...obj.list[index], ...param};

    yield put({
      type: 'NOTIFICATIONS_OBJ',
      value: obj,
    });

    // Log success message
    console.log('Notification field updated successfully');
  } catch (error) {
    // Handle Firebase authentication errors
    handleFirebaseAuthError(error);

    // Log the error message if in development mode
    if (__DEV__) {
      console.log(error.message);
    }
  }
}
