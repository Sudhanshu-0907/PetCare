import moment from 'moment';

const initialState = {
  obj: {
    name: '',
    gender: 'male',
    breed: '',
    color: '',
    isIndoor: true,
    dob: moment(),
    showDatePicker: false,
    selected: null,
    isEmptyPetCollection: false,
    petSpecies: [
      {
        id: 0,
        name: 'Dog',
      },
      {
        id: 1,
        name: 'Cat',
      },
      {
        id: 2,
        name: 'Horse',
      },
      {
        id: 3,
        name: 'Rat',
      },
      {
        id: 4,
        name: 'Hamster',
      },
      {
        id: 5,
        name: 'Rabbit',
      },
      {
        id: 6,
        name: 'Dragon',
      },
      {
        id: 7,
        name: 'Fish',
      },
      {
        id: 8,
        name: 'Pig',
      },
    ],
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_PET_PROFILE_RESET':
      return initialState;
    case 'CREATE_PET_PROFILE_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
