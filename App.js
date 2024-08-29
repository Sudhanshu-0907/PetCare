import {View, Text, StatusBar} from 'react-native';
import React from 'react';
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

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, ReduxPromise, navigationDebouncer(600)),
);

sagaMiddleware.run(watch);

const App = () => {
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
