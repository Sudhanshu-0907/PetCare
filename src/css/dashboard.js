import {Dimensions, StyleSheet} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Dashboard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  petProfile: {
    width: SCREEN_WIDTH * 0.85,
    borderWidth: 1,
    borderColor: '#32409E',
    backgroundColor: '#E9F1FA',
    alignSelf: 'center',
    margin: 20,
    borderRadius: 20,
  },
});

export default Dashboard;
