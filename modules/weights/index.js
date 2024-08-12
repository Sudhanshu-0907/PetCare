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
  InteractionManager,
} from 'react-native';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';

/**
 * modules
 */
import Header from '../Header';

/**
 * css
 */
import weights from '../../src/css/weights';
import Layout from '../../src/css/layout';
import Common from '../../src/css/common';

/**
 * utils
 */
import * as RootNavigation from '../../utils/RootNavigation';
import {useRoute} from '@react-navigation/native';

const Weights = props => {
  const route = useRoute();
  useEffect(() => {
    // Anything in here is fired on component mount.
    const task = InteractionManager.runAfterInteractions(() => {
      // load();
    });
    return () => {
      // Anything in here is fired on component unmount.
      props.resetFn();
      // task.cancel();
    };
  }, []);

  return (
    <SafeAreaView style={[Layout.viewHeight, Common.bgWhite]}>
      <View style={[Layout.viewHeight, {paddingHorizontal: 10}]}>
        <Header />
        <View style={weights.container}>
          <Text>Weights</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
//getting state from reducer
const mapStateToProps = state => {
  return {
    obj: state.weights.obj,
  };
};

//sending data to reducer or action
const mapDispatchToProps = dispatch => {
  return {
    resetFn: () => dispatch({type: 'WEIGHTS_RESET'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Weights);
