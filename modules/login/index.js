import {View, Text, TextInput, Button, SafeAreaView} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import login from '../../css/login';
import {connect} from 'react-redux';

const LoginScreen = props => {
  const disable = () => {
    return props.obj.email === '' || props.obj.password === '';
  };
  return (
    <SafeAreaView style={login.container}>
      <Text style={login.label}>email</Text>
      <TextInput
        style={login.input}
        value={props.obj.email}
        onChangeText={text => props.setLoginForm('email', text)}
      />
      <Text style={login.label}>Password</Text>
      <TextInput
        style={login.input}
        secureTextEntry
        value={props.obj.password}
        onChangeText={text => props.setLoginForm('password', text)}
      />
      <Button disabled={disable()} title="Login" onPress={props.submitLogin} />
      <Button
        title="Forgot Password ?"
        onPress={() => {
          props.navigation.navigate('ForgotPassword');
        }}
      />
      <Button
        title="Don't have an account?"
        onPress={() => {
          props.navigation.navigate('SignUp');
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
    obj: state.login.obj,
    dashboardObj: state.dashboard.obj,
  };
};

//sending data to reducer or action
const mapDispatchToProps = dispatch => {
  return {
    resetFn: () => dispatch({type: 'LOGIN_RESET'}),
    submitLogin: () => dispatch({type: 'LOGIN_SUBMIT'}),
    setLoginForm: (...params) => dispatch({type: 'LOGIN_FORM', ...params}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
