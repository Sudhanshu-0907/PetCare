/**
 * plugin
 */
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  InteractionManager,
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
import addVaccine from '../../src/css/addVaccine';
import Layout from '../../src/css/layout';
import Common from '../../src/css/common';

/**
 * utils
 */
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddVaccine = props => {
  const route = useRoute();

  const handleDateChange = (selectedDate, flag, param) => {
    const currentDate = selectedDate || props.obj.vaccineApplicationDate;
    props.setVaccineForm(flag, false);
    props.setVaccineForm(param, currentDate);
  };

  const load = () => {
    props.setVaccineForm('vaccineApplicationDate', moment().toDate());
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
          <View style={addVaccine.container}>
            {/* Buttons for selecting options */}
            <View style={[addVaccine.button, Common.mb20]}>
              <View style={[Common.alignCenter, Common.spaceAround]}>
                <Image
                  resizeMode="contain"
                  style={{width: 150, height: 150}}
                  source={require('../../src/assets/syringe.gif')}
                />
              </View>
            </View>

            {/* TextInput for weight input */}
            <View
              style={[
                Common.dFlex,
                Common.mb20,
                Layout.row,
                Common.spaceBetween,
              ]}>
              <View>
                <Text>Whats the Vaccine</Text>
                <TextInput
                  label=""
                  value={props.obj.vaccineName}
                  onChangeText={text =>
                    props.setVaccineForm('vaccineName', text)
                  }
                  keyboardType="default"
                  selectTextOnFocus={true}
                  style={[addVaccine.textInputWeight]}
                  error={!!props.obj.errors.vaccineName}
                  placeholder="Rabbies"
                />
                {props.obj.errors.vaccineName && (
                  <Text style={addVaccine.errorText}>
                    {props.obj.errors.vaccineName}
                  </Text>
                )}
              </View>
            </View>

            {/* Date of Vaccine Application */}
            <View style={[Common.mb20]}>
              <Text>Vaccine Application Date</Text>
              <Button
                style={[
                  Layout.viewHeight,
                  Common.justifyCenter,
                  {borderRadius: 10, borderWidth: 1, borderColor: '#7AAEDB'},
                ]}
                labelStyle={{color: '#111'}}
                onPress={() =>
                  props.setVaccineForm('showApplicationDatePicker', true)
                }
                mode="outlined">
                {moment(props.obj.vaccineApplicationDate).format(
                  'DD MMM YYYY h:mm a',
                )}
              </Button>

              {props.obj.showApplicationDatePicker && (
                <DatePicker
                  modal
                  open={props.obj.showApplicationDatePicker}
                  date={moment(props.obj.vaccineApplicationDate).toDate()}
                  onConfirm={date => {
                    handleDateChange(
                      date,
                      'showApplicationDatePicker',
                      'vaccineApplicationDate',
                    );
                  }}
                  onCancel={() => {
                    //  setOpen(false)
                    props.setVaccineForm('showApplicationDatePicker', false);
                  }}
                />
              )}
            </View>

            {/* Date of Vaccine Expiration */}
            <View style={[Common.mb20]}>
              <Text>Vaccine Expiration Date</Text>
              <Button
                style={[
                  Layout.viewHeight,
                  Common.justifyCenter,
                  {borderRadius: 10, borderWidth: 1, borderColor: '#7AAEDB'},
                ]}
                labelStyle={{color: '#111'}}
                onPress={() =>
                  props.setVaccineForm('showExpirationDatePicker', true)
                }
                mode="outlined">
                {props.obj.vaccineExpirationDate !== ''
                  ? moment(props.obj.vaccineExpirationDate).format(
                      'DD MMM YYYY h:mm a',
                    )
                  : 'Optional'}
              </Button>

              {props.obj.showExpirationDatePicker && (
                <DatePicker
                  modal
                  open={props.obj.showExpirationDatePicker}
                  date={moment().toDate()}
                  onConfirm={date => {
                    handleDateChange(
                      date,
                      'showExpirationDatePicker',
                      'vaccineExpirationDate',
                    );
                  }}
                  onCancel={() => {
                    props.setVaccineForm('showExpirationDatePicker', false);
                  }}
                />
              )}
            </View>

            {/* Notes input */}
            <View>
              <Text>Add a Notes</Text>
              <TextInput
                label="Notes"
                value={props.obj.notes}
                onChangeText={text => props.setVaccineForm('notes', text)}
                multiline
                // numberOfLines={2}
                style={addVaccine.notesInput}
              />
            </View>

            {/* Submit button */}
            <Button
              mode="contained"
              onPress={() => {
                props.handleVaccineSubmit(route.params?.petId);
              }}
              style={addVaccine.submitButton}>
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
    obj: state.addVaccine.obj,
  };
};

//sending data to reducer or action
const mapDispatchToProps = dispatch => {
  return {
    resetFn: () => dispatch({type: 'ADD_VACCINE_RESET'}),
    setVaccineForm: (...params) =>
      dispatch({type: 'ADD_VACCINE_FORM', ...params}),
    handleVaccineSubmit: petId => dispatch({type: 'ADD_VACCINE_SUBMIT', petId}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVaccine);
