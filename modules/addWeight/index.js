/**
 * plugin
 */
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  InteractionManager,
  addWeightheet,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, Text} from 'react-native-paper';

/**
 * modules
 */
import Header from '../Header';

/**
 * css
 */
import addWeight from '../../src/css/addWeight';
import Layout from '../../src/css/layout';
import Common from '../../src/css/common';

/**
 * utils
 */
import * as RootNavigation from '../../utils/RootNavigation';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddWeight = props => {
  const route = useRoute();

  const handleDateChange = selectedDate => {
    const currentDate = selectedDate || props.obj.dateOfWeight;
    props.setWeightForm('showDatePicker', false);
    props.setWeightForm('dateOfWeight', currentDate);
  };

  const load = () => {
    props.setWeightForm('dateOfWeight', moment().toDate());
  };

  useFocusEffect(
    React.useCallback(() => {
      // Anything in here is fired on component mount.
      const task = InteractionManager.runAfterInteractions(() => {
        load();
      });
      return () => {
        // Anything in here is fired on component unmount.
        props.resetFn();
        task.cancel();
      };
    }, []),
  );

  return (
    <SafeAreaView style={[Layout.viewHeight, Common.bgWhite]}>
      <View style={[Layout.viewHeight, {paddingHorizontal: 10}]}>
        <KeyboardAwareScrollView>
          <Header />
          <View style={addWeight.container}>
            {/* Buttons for selecting options */}
            <View style={[addWeight.button, Common.mb20]}>
              <View style={[Common.alignCenter, Common.spaceAround]}>
                <Image
                  resizeMode="contain"
                  style={{width: 150, height: 150}}
                  source={require('../../src/assets/puppy.gif')}
                />
              </View>
            </View>

            {/* TextInput for weight input */}
            <View
              style={[
                Common.dFlex,
                Common.mb10,
                Layout.row,
                Common.spaceBetween,
                Common.mb10,
              ]}>
              <View>
                <Text>Weight in Kg</Text>
                <TextInput
                  label="Weight (kg)"
                  value={props.obj.weightKg}
                  onChangeText={text => props.setWeightForm('weightKg', text)}
                  keyboardType="numeric"
                  selectTextOnFocus={true}
                  style={[addWeight.textInputWeight]}
                  error={!!props.obj.errors.weightKg}
                  placeholder="1.2"
                />
                {props.obj.errors.weightKg && (
                  <Text style={addWeight.errorText}>
                    {props.obj.errors.weightKg}
                  </Text>
                )}
              </View>
              <View>
                <Text>Weight in gm</Text>
                <TextInput
                  label="Weight (grams)"
                  value={props.obj.weightGrams}
                  onChangeText={text =>
                    props.setWeightForm('weightGrams', text)
                  }
                  keyboardType="numeric"
                  style={[addWeight.textInputWeight]}
                  error={!!props.obj.errors.weightGrams}
                  placeholder="90"
                />
                {props.obj.errors.weightGrams && (
                  <Text style={addWeight.errorText}>
                    {props.obj.errors.weightGrams}
                  </Text>
                )}
              </View>
            </View>

            {/* Display weight */}
            <View style={addWeight.displayContainer}>
              <Text style={addWeight.displayText}>Pet Weight is</Text>
              <Text style={addWeight.displayText}>
                {`${props.obj.weightKg} kg ${
                  props.obj.weightGrams > 0
                    ? props.obj.weightGrams.toString() + 'grams'
                    : ''
                }`}
              </Text>
            </View>

            {/* Date of measurement */}
            <View style={[Layout.row]}>
              <Button
                style={[Layout.viewHeight, Common.mb25, Common.justifyCenter]}
                onPress={() => props.setWeightForm('showDatePicker', true)}
                mode="outlined">
                {moment(props.obj.dateOfWeight).format('DD MMM YYYY h:mm a')}
              </Button>
            </View>

            {/* {props.obj.showDatePicker && ( */}
            <DatePicker
              modal
              open={props.obj.showDatePicker}
              date={moment(props.obj.dateOfWeight).toDate()}
              onConfirm={date => {
                handleDateChange(date);
              }}
              onCancel={() => {
                //  setOpen(false)
                props.setWeightForm('showDatePicker', false);
              }}
            />
            {/* )} */}

            {/* Notes input */}
            <View>
              <TextInput
                label="Notes"
                value={props.obj.notes}
                onChangeText={text => props.setWeightForm('notes', text)}
                multiline
                // numberOfLines={2}
                style={addWeight.notesInput}
              />
            </View>

            {/* Submit button */}
            <Button
              mode="contained"
              onPress={props.handleWeightSubmit.bind(this, route.params?.petId)}
              style={addWeight.submitButton}>
              Add
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};
//getting state from reducer
const mapStateToProps = state => {
  return {
    obj: state.addWeight.obj,
  };
};

//sending data to reducer or action
const mapDispatchToProps = dispatch => {
  return {
    resetFn: () => dispatch({type: 'ADD_WEIGHT_RESET'}),
    setWeightForm: (...params) =>
      dispatch({type: 'ADD_WEIGHT_FORM', ...params}),
    handleWeightSubmit: petId => dispatch({type: 'ADD_WEIGHT_SUBMIT', petId}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddWeight);
