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
} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import {RadioButton, TextInput, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';

/**
 * utils
 */
import {addPetDetails} from '../../utils/common';

/**
 * modules
 */
import Header from '../Header';
import Common from '../../css/common';
import Layout from '../../css/layout';

const CreatePetProfile = ({obj, addPetsFn, resetFn, isEmptyFn}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [isIndoor, setIsIndoor] = useState(true);
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
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

  const handleSubmit = () => {
    // Handle form submission logic
    console.log({
      name,
      gender,
      breed,
      color,
      isIndoor,
      dob,
    });
  };

  return (
    <SafeAreaView style={[Layout.viewHeight, Common.bgWhite]}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always">
        {!obj.isEmptyPetCollection && <Header />}

        <TextInput
          // style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter pet's name"
          label="Name"
          mode="outlined"
          left={
            <TextInput.Icon
              icon={() => (
                <Icon
                  name="dog"
                  size={20}
                  // color={customIcon}
                  onPress={() => {
                    // changeIconColor('customIcon');
                  }}
                />
              )}
            />
          }
        />
        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="male"
            status={gender === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('male')}
          />
          <TouchableOpacity onPress={() => setGender('male')}>
            <Text style={styles.radioLabel}>Male</Text>
          </TouchableOpacity>
          <RadioButton
            value="female"
            status={gender === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('female')}
          />
          <TouchableOpacity onPress={() => setGender('female')}>
            <Text style={styles.radioLabel}>Female</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={[Common.mb20]}
          value={breed}
          onChangeText={setBreed}
          placeholder="Enter pet's breed"
          label="Breed"
          mode="outlined"
          left={
            <TextInput.Icon
              icon={() => (
                <Icon
                  name="paw"
                  size={20}
                  // color={customIcon}
                  onPress={() => {
                    // changeIconColor('customIcon');
                  }}
                />
              )}
            />
          }
        />

        <TextInput
          value={color}
          onChangeText={setColor}
          placeholder="Enter pet's color"
          label="Color"
          mode="outlined"
        />

        <Text style={styles.label}>Indoor/Outdoor</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="indoor"
            status={isIndoor ? 'checked' : 'unchecked'}
            onPress={() => setIsIndoor(true)}
          />
          <TouchableOpacity onPress={() => setIsIndoor(true)}>
            <Text style={styles.radioLabel}>Indoor</Text>
          </TouchableOpacity>
          <RadioButton
            value="outdoor"
            status={!isIndoor ? 'checked' : 'unchecked'}
            onPress={() => setIsIndoor(false)}
          />
          <TouchableOpacity onPress={() => setIsIndoor(false)}>
            <Text style={styles.radioLabel}>Outdoor</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Date of Birth</Text>
        <Button
          contentStyle={{flexDirection: 'row-reverse'}}
          onPress={() => setShowDatePicker(true)}
          mode="contained">
          {dob.toDateString()}
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            Selected Date: {dob.toDateString()}
          </Text>
        </View>

        <Button
          contentStyle={{flexDirection: 'row-reverse'}}
          title="Submit"
          onPress={handleSubmit}
          icon="send"
          mode="contained">
          Send
        </Button>
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
    addPetsFn: () => dispatch({type: 'ADD_PROFILE_PET'}),
    isEmptyFn: () => dispatch({type: 'IS_PETS_EMPTY'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePetProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
