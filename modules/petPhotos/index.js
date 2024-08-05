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
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import moment from 'moment';

/**
 * modules
 */
import Header from '../Header';
import List from './components/list';

/**
 * css
 */
import Layout from '../../src/css/layout';
import Common from '../../src/css/common';
import PetPhotos from '../../src/css/petPhotos';

/**
 * utils
 */
import * as RootNavigation from '../../utils/RootNavigation';

const PetProfile = props => {
  const NUMBEROFMONTHS = moment().diff(moment('01-01', 'DD-MM'), 'months') + 1;

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

  return (
    <SafeAreaView style={[Layout.viewHeight, Common.bgWhite]}>
      <View style={[Layout.viewHeight, Common.bgWhite]}>
        <Header />
        <Text
          style={[
            Common.textCenter,
            Common.fs18,
            Common.textColorList,
            {fontWeight: 700},
          ]}>
          {moment().format('YYYY')}
        </Text>
        <ScrollView>
          <View style={[PetPhotos.container, Layout.row]}>
            {Array(NUMBEROFMONTHS)
              .fill(1)
              .map((_, index) => (
                <List key={index} index={index} />
              ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
//getting state from reducer
const mapStateToProps = state => {
  return {
    obj: state.petPhotos.obj,
  };
};

//sending data to reducer or action
const mapDispatchToProps = dispatch => {
  return {
    resetFn: () => dispatch({type: 'PET_PHOTOS_RESET'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PetProfile);
