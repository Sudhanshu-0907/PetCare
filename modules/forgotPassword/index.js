import {View, Text, TextInput, Button, SafeAreaView} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import login from '../../css/login';
import {connect} from 'react-redux';

const ForgotPassword = props => {
  const disable = () => {
    return props.obj.email === '';
  };
  return (
    <SafeAreaView style={login.container}>
      <Text style={login.label}>Email</Text>
      <TextInput
        style={login.input}
        value={props.obj.email}
        onChangeText={text => props.setFormFn('email', text)}
      />
      <Button
        title="Continue"
        disabled={disable()}
        onPress={() => {
          props.submitFn(props.obj.email);
          props.navigation.navigate('Login');
        }}
      />
      <Spinner
        visible={props.obj.loader}
        textContent={'Loading...'}
        textStyle={{color: '#fff'}}
      />
    </SafeAreaView>
  );
};
//getting state from reducer
const mapStateToProps = state => {
  return {
    obj: state.forgotPassword.obj,
  };
};

//sending data to reducer or action
const mapDispatchToProps = dispatch => {
  return {
    resetFn: () => dispatch({type: 'FORGOT_PASSWORD_RESET'}),
    submitFn: email => dispatch({type: 'FORGOT_PASSWORD_SUBMIT', email}),
    setFormFn: (...params) =>
      dispatch({type: 'FORGOT_PASSWORD_FORM', ...params}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
