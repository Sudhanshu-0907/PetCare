const initialState = {
  obj: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WEIGHTS_RESET':
      return initialState;
    case 'WEIGHTS_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
