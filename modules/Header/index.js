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
import {connect} from 'react-redux';
import {useRoute} from '@react-navigation/native';

/**
 * css
 */
import login from '../../css/login';
import Common from '../../css/common';
import Layout from '../../css/layout';

const HeaderScreen = props => {
  const route = useRoute();
  console.log(route.name);
  return (
    <SafeAreaView
      style={[Common.bgWhite, Common.pt10, Common.pb10, Common.pl10]}>
      <View>
        {props.obj.showBackIcon.indexOf(route.name) > -1 && (
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#3F4DA8',
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[Common.textColorWhite]}>Back</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
//getting state from reducer
const mapStateToProps = state => {
  return {
    obj: state.header.obj,
  };
};

//sending data to reducer or action
const mapDispatchToProps = dispatch => {
  return {
    resetFn: () => dispatch({type: 'HEADER_RESET'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderScreen);
