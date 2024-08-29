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
  Image,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
/**
 * css
 */
import login from '../../src/css/login';
import Common from '../../src/css/common';
import Layout from '../../src/css/layout';
import Header from '../Header';

const LoginScreen = props => {
  const disable = () => {
    return (
      props.obj.isEmailValid !== true || props.obj.isPasswordValid !== true
    );
  };
  return (
    <SafeAreaView style={[Layout.viewHeight, Common.bgWhite]}>
      <Header />
      <View style={login.container}>
        <Image
          style={{alignSelf: 'center'}}
          source={require('../../src/assets/Dog.gif')}
          width={100}
          height={100}
        />
        <Text
          style={[
            login.label,
            Common.fs15,
            Common.textColorgray,
            {fontWeight: 700},
          ]}>
          Email
        </Text>
        <TextInput
          style={login.input}
          value={props.obj.email}
          onChangeText={text => props.setLoginForm('email', text)}
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
            login.label,
            Common.fs15,
            Common.textColorgray,
            {fontWeight: 700},
          ]}>
          Password
        </Text>
        <TextInput
          style={login.input}
          secureTextEntry
          value={props.obj.password}
          onChangeText={text => props.setLoginForm('password', text)}
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

        <View style={[Common.alignCenter]}>
          <TouchableOpacity
            style={[Common.mb20]}
            onPress={() => {
              props.navigation.navigate('ForgotPassword');
            }}>
            <Text style={[Common.bold500, Common.fs15, Common.textColorBlack]}>
              Forgot your Password?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[Common.mb20, disable() && {opacity: 0.5}]}
          disabled={disable()}
          onPress={props.submitLogin}>
          <View
            style={[
              Common.p10,
              login.submit,
              Common.bold500,
              Common.fs15,
              Common.alignCenter,
            ]}>
            <Text style={[Common.textColorWhite, Common.fs14]}>Sign In</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Common.mb20]}
          onPress={() => {
            props.navigation.navigate('SignUp');
          }}>
          <View
            style={[
              Common.p10,
              login.signUp,
              Common.bold500,
              Common.fs15,
              Common.alignCenter,
            ]}>
            <Text style={[Common.bold500, Common.fs15, Common.textColorList]}>
              Don't have an account?
            </Text>
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
