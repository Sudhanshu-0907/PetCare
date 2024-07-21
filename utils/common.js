import {ToastAndroid} from 'react-native';

export const toastr = {
  showToast: (message, _type, duration = 500) => {
    Platform.OS === 'ios'
      ? ToastAndroid.show(message, {
          duration: duration,
          shadow: false,
          backgroundColor: '#777',
          textColor: '#fff',
          position: -50,
        })
      : ToastAndroid.show(message, duration);
  },
};
