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
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
/**
 * modules
 */
import Header from '../Header';

/**
 * css
 */
import signUp from '../../src/css/signUp';
import Layout from '../../src/css/layout';
import Common from '../../src/css/common';
import Spinner from 'react-native-loading-spinner-overlay';

const SignUp = props => {
  useEffect(() => {
    // Anything in here is fired on component mount.
    // const task = InteractionManager.runAfterInteractions(() => {
    //     load();
    // });
    return () => {
      // Anything in here is fired on component unmount.
      props.resetFn();
      // task.cancel();
    };
  }, []);

  const disable = () => {
    return (
      props.obj.email === '' ||
      props.obj.password === '' ||
      props.obj.confirmPassword === ''
    );
  };

  return (
    <SafeAreaView style={[Layout.viewHeight, Common.bgWhite]}>
      <Header />
      <View style={signUp.container}>
        <Text
          style={[
            signUp.label,
            Common.fs15,
            Common.textColorgray,
            {fontWeight: 700},
          ]}>
          Email
        </Text>
        <TextInput
          style={signUp.input}
          value={props.obj.email}
          onChangeText={text => props.setFormfn('email', text)}
        />
        <View style={[Common.mb20]}>
          <Text
            style={[
              Common.fs12,
              props.obj.isEmailValid !== null
                ? props.obj.isEmailValid
                  ? Common.textColorGreen
                  : Common.textColorRed
                : Common.textColorgray,
            ]}>
            {props.obj.emailCaption}
          </Text>
        </View>

        <Text
          style={[
            signUp.label,
            Common.fs15,
            Common.textColorgray,
            {fontWeight: 700},
          ]}>
          Password
        </Text>
        <TextInput
          style={signUp.input}
          value={props.obj.password}
          onChangeText={text => props.setFormfn('password', text)}
        />
        <View style={[Common.mb20]}>
          <Text
            style={[
              Common.fs12,
              props.obj.isPasswordValid !== null
                ? props.obj.isPasswordValid
                  ? Common.textColorGreen
                  : Common.textColorRed
                : Common.textColorgray,
            ]}>
            {props.obj.passwordCaption}
          </Text>
        </View>

        <Text
          style={[
            signUp.label,
            Common.fs15,
            Common.textColorgray,
            {fontWeight: 700},
          ]}>
          Confirm Password
        </Text>
        <TextInput
          style={[signUp.input, Common.mb20]}
          secureTextEntry
          value={props.obj.confirmPassword}
          onChangeText={text => props.setFormfn('confirmPassword', text)}
        />
        <TouchableOpacity
          style={[disable() && {opacity: 0.5}]}
          disabled={disable()}
          onPress={props.submitFn}>
          <View
            style={[
              Common.p10,
              signUp.submit,
              Common.bold500,
              Common.fs15,
              Common.alignCenter,
            ]}>
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
