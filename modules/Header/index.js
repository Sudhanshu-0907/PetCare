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
import AntDesign from 'react-native-vector-icons/AntDesign';

/**
 * css
 */
import login from '../../css/login';
import Common from '../../css/common';
import Layout from '../../css/layout';
import Header from '../../css/header';
/**
 * utils
 */
import * as RootNavigation from '../../utils/RootNavigation';

const HeaderScreen = props => {
  const route = useRoute();
  return (
    <View style={[Common.bgWhite, Common.pt10, Common.pb10, Common.pl10]}>
      <View>
        {props.obj.showBackIcon.indexOf(route.name) > -1 && (
          <TouchableOpacity
            style={[Header.backButton]}
            onPress={() => {
              RootNavigation.goBack();
            }}>
            <AntDesign name="arrowleft" size={25} color="#3F4DA8" />
          </TouchableOpacity>
        )}
      </View>
    </View>
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
