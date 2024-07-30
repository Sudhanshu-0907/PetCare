import {Platform, ToastAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore';

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
      .collection(collectionName)
      .limit(1) // Limit to 1 document to check if there is at least one document
      .get();

    if (collectionSnapshot.empty) {
      console.log(`${collectionName} collection is empty.`);

      return true;
    } else {
      console.log(`${collectionName} collection is not empty.`);
      return false;
    }
  } catch (error) {
    console.error('Error checking collection:', error);
    return false;
  }
};

export const addPetDetails = async (userId, petDetails) => {
  try {
    await firestore()
      .collection('PetsCollection')
      .add({
        userId,
        ...petDetails,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('User added!');
      });
  } catch (error) {
    console.error('Error adding pet details: ', error);
  }
};
