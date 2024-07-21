import {View, Text, TextInput, Button, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import login from '../../css/login';
import {toastr} from '../../utils/common';
import {connect} from 'react-redux';

const SignUp = props => {
  const disable = () => {
    return (
      props.obj.email === '' ||
      props.obj.password === '' ||
      props.obj.confirmPassword === ''
    );
  };

  return (
    <SafeAreaView style={login.container}>
      <Text style={login.label}>email</Text>
      <TextInput
        style={login.input}
        value={props.obj.email}
        onChangeText={text => props.setFormfn('email', text)}
      />
      <Text style={login.label}>Password</Text>
      <TextInput
        style={login.input}
        // secureTextEntry
        value={props.obj.password}
        onChangeText={text => props.setFormfn('password', text)}
      />
      <Text style={login.label}>Confirm Password</Text>
      <TextInput
        style={login.input}
        secureTextEntry
        value={props.obj.confirmPassword}
        onChangeText={text => props.setFormfn('confirmPassword', text)}
      />
      <Button disabled={disable()} title="Sign Up!" onPress={props.submitFn} />
    </SafeAreaView>
  );
};
//getting state from reducer
const mapStateToProps = state => {
  return {
    obj: state.signUp.obj,
  };
};

//sending data to reducer or action
const mapDispatchToProps = dispatch => {
  return {
    resetFn: () => dispatch({type: 'SIGNUP_RESET'}),
    submitFn: () => dispatch({type: 'SIGNUP_SUBMIT'}),
    setFormfn: (...params) => dispatch({type: 'SIGNUP_FORM', ...params}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
