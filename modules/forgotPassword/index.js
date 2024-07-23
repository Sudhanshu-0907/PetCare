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
import React, {useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';

/**
 * modules
 */
import Header from '../Header';

/**
 * css
 */
import forgotPassword from '../../css/forgotPassword';
import Layout from '../../css/layout';
import Common from '../../css/common';

/**
 * utils
 */
import * as RootNavigation from '../../utils/RootNavigation';

const ForgotPassword = props => {
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
    return props.obj.email === '';
  };
  return (
    <SafeAreaView style={[Layout.viewHeight, Common.bgWhite]}>
      <Header />
      <View style={forgotPassword.container}>
        <Text style={forgotPassword.label}>Email</Text>
        <TextInput
          style={forgotPassword.input}
          value={props.obj.email}
          onChangeText={text => props.setFormFn('email', text)}
        />
        <TouchableOpacity
          style={[Common.mb20, disable() && {opacity: 0.5}]}
          disabled={disable()}
          onPress={() => {
            props.submitFn(props.obj.email);
            RootNavigation.goBack();
          }}>
          <View
            style={[
              Common.p10,
              forgotPassword.submit,
              Common.bold500,
              Common.fs15,
            ]}>
            <Text style={[Common.textColorWhite]}>Submit</Text>
          </View>
        </TouchableOpacity>
        <Spinner
          visible={props.obj.loader}
          textContent={'Loading...'}
          textStyle={[Common.textColorWhite]}
        />
      </View>
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
