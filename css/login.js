import {StyleSheet} from 'react-native';

const Login = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    color: '#545454',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#DFEDF8',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: '#F1F6FA',
  },
  submit: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#6773BA',
    borderRadius: 7,
  },
});

export default Login;
