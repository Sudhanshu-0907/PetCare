/**
 * plugin
 */
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-redux';

/**
 * css
 */
import signUp from '../../css/signUp';
import Layout from '../../css/layout';
import Common from '../../css/common';
import Spinner from 'react-native-loading-spinner-overlay';

const SignUp = props => {
  const disable = () => {
    return (
      props.obj.email === '' ||
      props.obj.password === '' ||
      props.obj.confirmPassword === ''
    );
  };

  return (
    <SafeAreaView style={[Layout.viewHeight, Common.bgWhite]}>
      <View style={signUp.container}>
        <Text style={signUp.label}>Email</Text>
        <TextInput
          style={signUp.input}
          value={props.obj.email}
          onChangeText={text => props.setFormfn('email', text)}
        />
        <Text style={signUp.label}>Password</Text>
        <TextInput
          style={signUp.input}
          // secureTextEntry
          value={props.obj.password}
          onChangeText={text => props.setFormfn('password', text)}
        />
        <Text style={signUp.label}>Confirm Password</Text>
        <TextInput
          style={signUp.input}
          secureTextEntry
          value={props.obj.confirmPassword}
          onChangeText={text => props.setFormfn('confirmPassword', text)}
        />
        <TouchableOpacity
          style={[disable() && {opacity: 0.5}]}
          disabled={disable()}
          onPress={props.submitFn}>
          <View
            style={[Common.p10, signUp.submit, Common.bold500, Common.fs15]}>
            <Text style={{color: '#fff'}}>Sign Up!</Text>
          </View>
        </TouchableOpacity>

        <Spinner
          visible={props.obj.loader}
          textContent={'Loading...'}
          textStyle={{color: '#fff'}}
        />
      </View>
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
