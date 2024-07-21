import {View, Text, Button} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';

const Dashboard = props => {
  return (
    <View>
      <Button title="Sign out" onPress={props.signoutFn} />
    </View>
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
