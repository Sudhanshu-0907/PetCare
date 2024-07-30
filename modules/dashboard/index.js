/**
 * plugins
 */
import {
  View,
  Text,
  Button,
  SafeAreaView,
  InteractionManager,
} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import * as RootNavigation from '../../utils/RootNavigation';
import {isCollectionEmpty} from '../../utils/common';

const Dashboard = props => {
  const load = async () => {
    if (await isCollectionEmpty('PetsCollection')) {
      RootNavigation.resetLevelOfStack('CreatePetProfile', 0); //rest to top level
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Anything in here is fired on component mount.
      const task = InteractionManager.runAfterInteractions(() => {
        load();
      });
      return () => {
        // Anything in here is fired on component unmount.
        task.cancel();
      };
    }, []),
  );

  return (
    <SafeAreaView>
      <Button title="Sign out" onPress={props.signoutFn} />
    </SafeAreaView>
  );
};

//getting state from reducer
const mapStateToProps = state => {
  return {
    obj: state.login.obj,
    signUpObj: state.signUp.obj,
    dashboardObj: state.dashboard.obj,
  };
};

//sending data to reducer or action
const mapDispatchToProps = dispatch => {
  return {
    resetFn: () => dispatch({type: 'DASHBOARD_RESET'}),
    signoutFn: () => dispatch({type: 'SIGNOUT'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
