const initialState = {
  obj: {
    email: '',
    password: '',
    loader: '',
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
