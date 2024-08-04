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
import Icon from 'react-native-vector-icons/AntDesign';

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
    <View style={[Common.bgWhite, Common.pt10, Common.pb10]}>
      <View style={[Layout.row]}>
        {props.obj.showBackIcon.indexOf(route.name) > -1 && (
          <TouchableOpacity
            style={[Header.backButton]}
            onPress={() => {
              RootNavigation.goBack();
            }}>
            <Icon name="arrowleft" size={20} color="#3F4DA8" />
          </TouchableOpacity>
        )}
        {props.obj.showPlusIcon.indexOf(route.name) > -1 && (
          <TouchableOpacity
            style={[Header.backButton, Header.plusIcon]}
            onPress={() => {
              RootNavigation.navigate('CreatePetProfile');
            }}>
            <Icon name="plus" size={20} color="#3F4DA8" />
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
