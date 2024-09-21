import {Dimensions, StyleSheet} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const ForgotPassword = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
  },

  button: {
    marginHorizontal: 5,
    borderRadius: 15,
  },

  textInputWeight: {
    width: SCREEN_WIDTH - 70,
    height: 40,
    borderWidth: 1,
    borderColor: '#7AAEDB',
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 5,
  },
  notesInput: {
    // width: 150,
    // height: 43,
    borderWidth: 1,
    borderColor: '#7AAEDB',
    borderRadius: 10,
    padding: 10,
  },
  displayContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  displayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default ForgotPassword;
