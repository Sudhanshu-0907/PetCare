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
import React from 'react';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
/**
 * css
 */
import login from '../../css/login';
import Common from '../../css/common';
import Layout from '../../css/layout';

const LoginScreen = props => {
  const disable = () => {
    return props.obj.email === '' || props.obj.password === '';
  };
  return (
    <SafeAreaView style={[Layout.viewHeight, Common.bgWhite]}>
      <View style={login.container}>
        <Text style={login.label}>Email</Text>
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

        <TouchableOpacity
          style={[Common.mb20]}
          onPress={() => {
            props.navigation.navigate('ForgotPassword');
          }}>
          <Text style={[Common.bold500, Common.fs15, Common.textColorBlack]}>
            Forgot your Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Common.mb20]}
          onPress={() => {
            props.navigation.navigate('SignUp');
          }}>
          <Text style={[Common.bold500, Common.fs15, Common.textColorBlack]}>
            Don't have an account?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Common.mb20, disable() && {opacity: 0.5}]}
          disabled={disable()}
          onPress={props.submitLogin}>
          <View style={[Common.p10, login.submit, Common.bold500, Common.fs15]}>
            <Text style={{color: '#fff'}}>Sign In</Text>
          </View>
        </TouchableOpacity>
      </View>

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
