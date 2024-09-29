/**
 * plugins
 */
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  InteractionManager,
  StyleSheet,
  ScrollView,
  TouchableW,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {RadioButton, TextInput, Button, Chip} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

/**
 * utils
 */
import {addPetDetails} from '../../utils/common';

/**
 * modules
 */
import Header from '../Header';
import Common from '../../src/css/common';
import Layout from '../../src/css/layout';

const CreatePetProfile = ({
  obj,
  addPetsFn,
  resetFn,
  isEmptyFn,
  setLoginForm,
  deletePetsFn,
}) => {
  const route = useRoute();
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || obj.dob;
    setLoginForm('showDatePicker', false);
    setLoginForm('dob', currentDate);
  };

  const load = () => {
    isEmptyFn();
  };

  useFocusEffect(
    React.useCallback(() => {
      // Anything in here is fired on component mount.
      const task = InteractionManager.runAfterInteractions(() => {
        load();
      });
      return () => {
        // Anything in here is fired on component unmount.
        resetFn();
        task.cancel();
      };
    }, []),
  );

  return (
    <SafeAreaView style={[Layout.viewHeight, Common.bgWhite]}>
      <ScrollView
        style={[Layout.viewHeight]}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always">
        {!obj.isEmptyPetCollection && <Header />}

        <View
          style={[
            Layout.row,
            Common.mb20,
            Common.justifyCenter,
            {flexWrap: 'wrap'},
          ]}>
          {obj.petSpecies.map((list, index) => {
            return (
              <Chip
                key={index}
                mode="outlined"
                style={{margin: 5}}
                selected={list.id === obj.selected}
                showSelectedOverlay
                onPress={() => setLoginForm('selected', index)}>
                {list.name}
              </Chip>
            );
          })}
        </View>

        <TextInput
          style={[Common.mb20]}
          value={obj.name}
          onChangeText={text => setLoginForm('name', text)}
          placeholder="Enter pet's name"
          label="Name"
          mode="outlined"
          left={
            <TextInput.Icon
              icon={() => (
                <Icon
                  name="dog"
                  size={20}
                  {...Common.textColorBlack}
                  onPress={() => {
                    // changeIconColor('');
                  }}
                />
              )}
            />
          }
        />

        <TextInput
          style={[Common.mb20]}
          value={obj.breed}
          onChangeText={text => setLoginForm('breed', text)}
          placeholder="Enter pet's breed"
          label="Breed"
          mode="outlined"
          left={
            <TextInput.Icon
              icon={() => (
                <Icon
                  name="paw"
                  size={20}
                  {...Common.textColorBlack}
                  onPress={() => {
                    // changeIconColor('customIcon');
                  }}
                />
              )}
            />
          }
        />

        <TextInput
          value={obj.color}
          onChangeText={text => setLoginForm('color', text)}
          placeholder="Enter pet's color"
          label="Color"
          mode="outlined"
          left={
            <TextInput.Icon
              icon={() => (
                <Icon
                  name="paint-brush"
                  size={20}
                  {...Common.textColorBlack}
                  onPress={() => {
                    // changeIconColor('customIcon');
                  }}
                />
              )}
            />
          }
        />

        <Text style={styles.label}>Indoor/Outdoor</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="indoor"
            status={obj.isIndoor ? 'checked' : 'unchecked'}
            onPress={() => setLoginForm('isIndoor', true)}
          />
          <TouchableWithoutFeedback
            onPress={() => setLoginForm('isIndoor', true)}>
            <Text style={styles.radioLabel}>Indoor</Text>
          </TouchableWithoutFeedback>
          <RadioButton
            value="outdoor"
            status={!obj.isIndoor ? 'checked' : 'unchecked'}
            onPress={() => setLoginForm('isIndoor', false)}
          />
          <TouchableWithoutFeedback
            onPress={() => setLoginForm('isIndoor', false)}>
            <Text style={styles.radioLabel}>Outdoor</Text>
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="male"
            status={obj.gender === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setLoginForm('gender', 'male')}
          />
          <TouchableWithoutFeedback
            onPress={() => setLoginForm('gender', 'male')}>
            <Text style={styles.radioLabel}>Male</Text>
          </TouchableWithoutFeedback>
          <RadioButton
            value="female"
            status={obj.gender === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setLoginForm('gender', 'female')}
          />
          <TouchableWithoutFeedback
            onPress={() => setLoginForm('gender', 'female')}>
            <Text style={styles.radioLabel}>Female</Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={[Layout.col10, Layout.row]}>
          <View style={[Layout.col5]}>
            <Text style={styles.label}>Date of Birth</Text>
          </View>
          <Button
            style={[Common.mb25, Common.justifyCenter, Layout.col5]}
            onPress={() => setLoginForm('showDatePicker', true)}
            mode="outlined">
            <Icon name="birthday-cake" size={20} />
            {'   '}
            {moment(obj.dob).format('DD MMM YYYY')}
          </Button>
        </View>

        {obj.showDatePicker && (
          <DateTimePicker
            value={moment(obj.dob).toDate()}
            mode="date"
            display="inline"
            onChange={handleDateChange}
          />
        )}

        <Button
          style={[Common.mb20]}
          contentStyle={{flexDirection: 'row-reverse'}}
          title="Submit"
          onPress={() => addPetsFn(route.params?.isUpdate, route.params?.petid)}
          icon="send"
          mode="contained">
          {route.params?.isUpdate ? 'Update' : 'Create'}
        </Button>

        {route.params?.isUpdate && (
          <Button
            contentStyle={{flexDirection: 'row-reverse'}}
            title="Delete"
            onPress={() => deletePetsFn(route.params?.petid)}
            icon="delete"
            mode="outlined">
            Delete
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

//getting state from reducer
const mapStateToProps = state => {
  return {
    obj: state.createPetProfile.obj,
  };
};

//sending data to reducer or action
const mapDispatchToProps = dispatch => {
  return {
    resetFn: () => dispatch({type: 'CREATE_PET_PROFILE_RESET'}),
    addPetsFn: (isUpdate, petid) =>
      dispatch({type: 'ADD_PROFILE_PET', isUpdate, petid}),
    deletePetsFn: petid => dispatch({type: 'DELETE_PET', petid}),
    isEmptyFn: () => dispatch({type: 'IS_PETS_EMPTY'}),
    setLoginForm: (...params) =>
      dispatch({type: 'CREATE_PET_PROFILE_FORM', ...params}),
    // submitLogin: () => dispatch({type: 'CREATE_PET_PROFILE_SUBMIT'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePetProfile);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioLabel: {
    marginRight: 20,
    fontSize: 16,
  },
  dateContainer: {
    marginVertical: 20,
  },
  dateText: {
    fontSize: 16,
  },
});
