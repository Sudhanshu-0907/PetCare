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
import List from './components/list';

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
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

const Weights = props => {
  const route = useRoute();
  const load = async () => {
    props.fetchWeightsDataFn(route.params?.petId);
    // const url = await storage().ref('DefaultImage/Doggy.png').getDownloadURL();
    // console.log(url);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Anything in here is fired on component mount.
      const task = InteractionManager.runAfterInteractions(() => {
        load();
      });
      return () => {
        props.resetFn();
        // Anything in here is fired on component unmount.
        task.cancel();
      };
    }, []),
  );

  const renderItem = React.useCallback(({item, index}) => {
    return (
      <List
        item={item}
        key={item.dateOfWeight}
        petId={route.params?.id}
        index={index}
      />
    );
  }, []);

  return (
    <SafeAreaView style={[Layout.viewHeight, Common.bgWhite]}>
      <View style={[Layout.viewHeight, {paddingHorizontal: 10}]}>
        <Header />
        <FlashList
          data={props.obj.list}
          estimatedItemSize={300}
          windowSize={7}
          initialListSize={36}
          initialNumToRender={36}
          maxToRenderPerBatch={72}
          removeClippedSubviews={true}
          renderItem={renderItem}
          scrollEventThrottle={16}
          keyExtractor={item => item.dateOfWeight}
        />
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
    fetchWeightsDataFn: petId => dispatch({type: 'WEIGHTS_LIST_FN', petId}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Weights);
