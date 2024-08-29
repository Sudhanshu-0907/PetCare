const initialState = {
  obj: {
    list: [],
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VACCINES_RESET':
      return initialState;
    case 'VACCINES_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
