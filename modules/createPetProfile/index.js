/**
 * plugins
 */
import {View, Text, Button, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {addPetDetails} from '../../utils/common';
import firestore from '@react-native-firebase/firestore';

const CreatePetProfile = props => {
  const addButton = async () => {
    const userId = auth().currentUser.uid;
    const petDetails = {
      userId,
      name: 'tota',
      gender: 'female',
      breed: 'parrot',
      colour: 'green',
      dob: '',
      isIndoorPet: false,
      isSterialisedPet: false,
    };
    await addPetDetails(userId, petDetails);
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={addButton}>
        <Text>Click to add!</Text>
      </TouchableOpacity>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePetProfile);
