/**
 * plugin
 */
import {
  View,
  Text,
  TextInput,
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
import login from '../../src/css/login';
import Common from '../../src/css/common';
import Layout from '../../src/css/layout';
import Header from '../../src/css/header';
/**
 * utils
 */
import * as RootNavigation from '../../utils/RootNavigation';
import {Button} from 'react-native-paper';

const HeaderScreen = props => {
  const route = useRoute();

  return (
    <View style={[Common.bgWhite, Common.pb10, Layout.row]}>
      <View style={[Layout.col10, Layout.row]}>
        {props.obj.showLogoutButton.indexOf(route.name) !== -1 && (
          <Button onPress={props.signoutFn} icon="lock" mode="contained">
            Sign Out
          </Button>
        )}

        {props.obj.notShowBackIcon.indexOf(route.name) === -1 && (
          <View style={[Layout.col5, Common.pl10]}>
            <TouchableOpacity
              style={[Header.backButton]}
              onPress={() => {
                RootNavigation.goBack();
              }}>
              <Icon name="arrowleft" size={20} color="#3F4DA8" />
            </TouchableOpacity>
          </View>
        )}
        {props.obj.showPlusIcon.hasOwnProperty(route.name) && (
          <View style={[Layout.col5, Layout.rrow]}>
            <TouchableOpacity
              style={[Header.backButton, Header.plusIcon]}
              onPress={() => {
                RootNavigation.navigate(props.obj.showPlusIcon[route.name], {
                  petId: route.params?.petId,
                });
              }}>
              <Icon name="plus" size={20} color="#3F4DA8" />
            </TouchableOpacity>
          </View>
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
