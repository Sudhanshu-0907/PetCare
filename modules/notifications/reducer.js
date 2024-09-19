const initialState = {
  obj: {
    list: [],
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_RESET':
      return initialState;
    case 'NOTIFICATIONS_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
