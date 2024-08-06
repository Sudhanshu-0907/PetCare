import {Dimensions, StyleSheet} from 'react-native';
const SCREENWIDTH = Dimensions.get('screen').width;

const PetPhotos = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  petProfile: {
    width: SCREENWIDTH * 0.38,
    minHeight: 130,
    borderWidth: 2,
    borderColor: '#473695',
    margin: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthTag: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 10,
    zIndex: 999,
  },
  delete: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 10,
    zIndex: 999,
  },
});

export default PetPhotos;
