import moment from 'moment';

const initialState = {
  obj: {
    dateOfWeight: moment(),
    showDatePicker: false,
    weightKg: 0,
    weightGrams: 0,
    notes: '',
    errors: {},
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_WEIGHT_RESET':
      return initialState;
    case 'ADD_WEIGHT_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
