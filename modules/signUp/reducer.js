const initialState = {
  obj: {
    loader: '',
    email: '',
    isEmailValid: null,
    emailCaption: 'Enter your email',
    password: '',
    isPasswordValid: null,
    passwordCaption: 'Password must be greater than or equal to 8 digits',
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
