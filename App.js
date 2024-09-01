import {
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import StackNavigator from './components/navigator';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from './store/reducer/rootReducer';
import navigationDebouncer from 'react-navigation-redux-debouncer';
import {watch} from './store/action/rootAction';
import {Provider} from 'react-redux';
import {navigationRef} from './utils/RootNavigation';
import {PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, ReduxPromise, navigationDebouncer(600)),
);

sagaMiddleware.run(watch);

const App = () => {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      onDisplayNotification();
    });

    return unsubscribe;
  }, []);

  // Permisions for notification
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Post Notifications permission granted');
            // await messaging().registerDeviceForRemoteMessages();
          } else {
            console.log('Post Notifications permission denied');
          }
        } else {
          const authStatus = await messaging().requestPermission();
          if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            console.log('User has notification permissions enabled.');
          } else if (
            authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
          ) {
            console.log('User has provisional notification permissions.');
          } else {
            console.log('User has notification permissions disabled');
          }
        }
      } catch (err) {
        console.warn('Error handling permissions:', err);
      }
    };

    requestPermissions();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <GestureHandlerRootView style={{flex: 1}}>
              <StatusBar
                hidden={false}
                barStyle="dark-content"
                backgroundColor={'#fff'}
              />
              <StackNavigator />
            </GestureHandlerRootView>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
