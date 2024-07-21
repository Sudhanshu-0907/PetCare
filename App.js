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

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, ReduxPromise, navigationDebouncer(600)),
);

sagaMiddleware.run(watch);

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar
            hidden={false}
            barStyle="light-content"
            // backgroundColor={Common.bgBackGround.backgroundColor}
          />
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
