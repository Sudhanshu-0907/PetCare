const initialState = {
  obj: {
    email: '',
    isEmailValid: null,
    emailCaption: 'Enter your email',
    password: '',
    isPasswordValid: null,
    passwordCaption: 'Password must be greater than or equal to 8 digits',
    loader: false,
    isEmailVerified: false,
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_RESET':
      return initialState;
    case 'LOGIN_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
