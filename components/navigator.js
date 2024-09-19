/**
 * Plugins
 */
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';

/**
 * modules
 */
import LoginScreen from '../modules/login';
import Dashboard from '../modules/dashboard';
import SignUp from '../modules/signUp';
import ForgotPassword from '../modules/forgotPassword';
import CreatePetProfile from '../modules/createPetProfile';
import PetPhotos from '../modules/petPhotos';
import Weights from '../modules/weights';
import AddWeight from '../modules/addWeight';
import Vaccines from '../modules/vaccines';
import AddVaccine from '../modules/addVaccine';
import Notifications from '../modules/notifications';

const Stack = createNativeStackNavigator();

const Navigator = props => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      if (user) {
        await user.reload(); // Reload the user data to get the latest email verification status
        if (user.emailVerified) {
          setUser(user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {(user && user.emailVerified) || props.loginObj.isEmailVerified ? (
        <>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="CreatePetProfile" component={CreatePetProfile} />
          <Stack.Screen name="PetPhotos" component={PetPhotos} />
          <Stack.Screen name="Weights" component={Weights} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="AddWeight" component={AddWeight} />
          <Stack.Screen name="Vaccines" component={Vaccines} />
          <Stack.Screen name="AddVaccine" component={AddVaccine} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      )}
    </Stack.Navigator>
  );
};
//getting state from reducer
const mapStateToProps = state => {
  return {
    loginObj: state.login.obj,
  };
};

//sending data to reducer or action
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
