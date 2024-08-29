import moment from 'moment';

const initialState = {
  obj: {
    vaccineName: '',
    vaccineApplicationDate: moment(),
    showApplicationDatePicker: false,
    vaccineExpirationDate: '',
    showExpirationDatePicker: false,
    notes: '',
    errors: {},
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_VACCINE_RESET':
      return initialState;
    case 'ADD_VACCINE_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
