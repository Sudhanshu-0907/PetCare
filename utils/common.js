import {Platform, ToastAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';
import firestore, {startAt} from '@react-native-firebase/firestore';
import * as RootNavigation from './RootNavigation';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';

export const toastr = {
  showToast: (message, _type, duration = 500) => {
    Platform.OS === 'ios'
      ? Toast.show(message, Toast.LONG, {
          tapToDismissEnabled: true,
          textColor: '#fff',
          backgroundColor: 'gray',
        })
      : ToastAndroid.show(message, duration);
  },
};

export function handleFirebaseAuthError(error) {
  toastr.showToast(error.message);
}

export function validateEmail(email) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

export const isCollectionEmpty = async collectionName => {
  try {
    const collectionSnapshot = await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection(collectionName)
      .limit(1) // Limit to 1 document to check if there is at least one document
      .get();

    if (collectionSnapshot.empty) {
      // console.log(`${collectionName} collection is empty.`);

      return true;
    } else {
      // console.log(`${collectionName} collection is not empty.`);
      return false;
    }
  } catch (error) {
    console.error('Error checking collection:', error);
    return false;
  }
};
const getStartOfDay = dateParam => {
  return moment(dateParam)
    .add(1, 'months')
    .startOf('month') // Get the start of the day (midnight)
    .set('hour', 10) // Set the hour to 10 AM
    .set('minute', 0) // Set minutes to 0
    .set('second', 0) // Set seconds to 0
    .set('millisecond', 0) // Set milliseconds to 0
    .toDate()
    .getTime();
};

export const addPetDetails = async (userId, petDetails, dob) => {
  try {
    const petCollectionRef = await firestore()
      .collection('Users')
      .doc(userId)
      .collection('PetsCollections')
      .add({
        ...petDetails,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    petCollectionRef.collection('Notifications').add({
      fcmToken: await messaging().getToken(),
      title: 'BirthDay',
      body: 'BirthDay Comming soon!.',
      // imageUrl: 'https://example.com/image.png',
      scheduledTime: moment(dob)
        .add(1, 'years')
        .set('hour', 10) // Set the hour to 10 AM
        .set('minute', 0) // Set minutes to 0
        .set('second', 0) // Set seconds to 0
        .set('millisecond', 0)
        .toDate()
        .getTime(), // The next scheduled time
      sent: false,
      recurring: true, // Indicates whether this notification repeats
      repeatInterval: 'yearly', // Can be 'daily', 'weekly', 'monthly', etc.
      enable: true,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    petCollectionRef.collection('Notifications').add({
      fcmToken: await messaging().getToken(),
      title: 'Weight',
      body: 'Weight Reminder!',
      // imageUrl: 'https://example.com/image.png',
      scheduledTime: getStartOfDay(), // The next scheduled time
      sent: false,
      recurring: true, // Indicates whether this notification repeats
      repeatInterval: 'monthly', // Can be 'daily', 'weekly', 'monthly', etc.
      enable: true,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    petCollectionRef.collection('Notifications').add({
      fcmToken: await messaging().getToken(),
      title: 'Pictures ',
      body: 'Add photo of a month',
      // imageUrl: 'https://example.com/image.png',
      scheduledTime: getStartOfDay(), // The next scheduled time
      sent: false,
      recurring: true, // Indicates whether this notification repeats
      repeatInterval: 'monthly', // Can be 'daily', 'weekly', 'monthly', etc.
      enable: true,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding pet details: ', error);
  }
};
