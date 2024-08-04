import {StyleSheet} from 'react-native';

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
    width: '85%',
    height: 300,
    borderWidth: 1,
    borderColor: '#1F78CF',
    backgroundColor: '#E9F1FA',
    alignSelf: 'center',
    margin: 20,
    borderRadius: 30,
    overflow: 'hidden',
  },
});

export default Dashboard;
