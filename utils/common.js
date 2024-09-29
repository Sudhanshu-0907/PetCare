import {Platform, ToastAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';
import firestore, {startAt} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
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

export const addPetDetails = async (userId, petDetails, dob, petName) => {
  try {
    const petCollectionRef = await firestore()
      .collection('Users')
      .doc(userId)
      .collection('PetsCollections')
      .add({
        ...petDetails,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    await firestore().collection('Users').doc(userId).set(
      {
        newField: 'newValue', // Adds or updates the specific field
      },
      {merge: true},
    );

    let scheduledTimeBirth = moment(dob)
      .year(moment().year()) // Set the year to the current year
      .set('hour', 10) // Set the hour to 10 AM
      .set('minute', 0) // Set minutes to 0
      .set('second', 0) // Set seconds to 0
      .set('millisecond', 0);

    // If the calculated date has already passed in the current year, use the next year
    if (scheduledTimeBirth.isBefore(moment())) {
      scheduledTimeBirth.add(1, 'years');
    }

    await petCollectionRef
      .collection('Notifications')
      .doc('defaultBirthDayNotification')
      .set({
        fcmToken: await messaging().getToken(),
        title: 'BirthDay Reminder',
        body: `Its ${petName}'s BirthDay today.`,
        // imageUrl: 'https://example.com/image.png',
        scheduledTime: scheduledTimeBirth.toDate().getTime(),
        sent: false,
        recurring: true, // Indicates whether this notification repeats
        repeatInterval: 'yearly', // Can be 'daily', 'weekly', 'monthly', etc.
        enable: true,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    await petCollectionRef.collection('Notifications').add({
      fcmToken: await messaging().getToken(),
      title: 'Weight',
      body: `Weight Reminder of ${petName}!`,
      // imageUrl: 'https://example.com/image.png',
      scheduledTime: getStartOfDay(), // The next scheduled time
      sent: false,
      recurring: true, // Indicates whether this notification repeats
      repeatInterval: 'monthly', // Can be 'daily', 'weekly', 'monthly', etc.
      enable: true,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    await petCollectionRef.collection('Notifications').add({
      fcmToken: await messaging().getToken(),
      title: 'Pictures ',
      body: `Add ${petName}'s photo of a month`,
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

export const updatePetDetails = async (userId, petDetails, dob, petid) => {
  try {
    const petCollectionRef = firestore()
      .collection('Users')
      .doc(userId)
      .collection('PetsCollections')
      .doc(petid);

    await petCollectionRef.update({...petDetails});

    const scheduledTime = moment(dob)
      .add(1, 'years')
      .set('hour', 10) // Set the hour to 10 AM
      .set('minute', 0) // Set minutes to 0
      .set('second', 0) // Set seconds to 0
      .set('millisecond', 0)
      .toDate()
      .getTime();

    await petCollectionRef
      .collection('Notifications')
      .doc('defaultBirthDayNotification')
      .set(
        {
          fcmToken: await messaging().getToken(),
          title: 'BirthDay',
          body: 'BirthDay coming soon!',
          scheduledTime,
          sent: false,
          recurring: true, // Indicates whether this notification repeats
          repeatInterval: 'yearly', // Can be 'daily', 'weekly', 'monthly', etc.
          enable: true,
          updatedAt: firestore.FieldValue.serverTimestamp(), // Timestamp when updated
        },
        {merge: true},
      );
  } catch (error) {
    console.error('Error adding pet details: ', error);
  }
};

export async function deleteCollection(petCollectionRef, collectionName) {
  try {
    const notificationsRef = petCollectionRef.collection(collectionName);

    // Fetch all documents from the collection
    const snapshot = await notificationsRef.get();

    // Loop through and delete each document
    const batch = firestore().batch(); // Using batch to delete multiple docs in one go

    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Commit the batch operation
    await batch.commit();

    console.log('All documents in the collection have been deleted');
  } catch (error) {
    console.log(error);
  }
}

export async function deletePetStorage(userId, petId) {
  const folderRef = storage().ref(`/users/${userId}/${petId}`);

  // List all files in the folder
  const result = await folderRef.listAll();

  // Iterate and delete each file
  const deletePromises = result.items.map(fileRef => fileRef.delete());

  // Wait for all delete operations to complete
  await Promise.all(deletePromises);

  console.log(`All files related to petId ${petId} have been deleted.`);
}
