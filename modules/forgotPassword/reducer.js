const initialState = {
  obj: {
    email: '',
    loader: '',
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FORGOT_PASSWORD_RESET':
      return initialState;
    case 'FORGOT_PASSWORD_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
