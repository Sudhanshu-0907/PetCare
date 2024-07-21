const initialState = {
  obj: {
    loader: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_RESET':
      return initialState;
    case 'SIGNUP_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
