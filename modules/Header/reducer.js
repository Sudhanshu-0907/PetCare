const initialState = {
  obj: {
    showBackIcon: ['ForgotPassword', 'SignUp', 'CreatePetProfile'],
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEADER_RESET':
      return initialState;
    case 'HEADER_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
