const initialState = {
  obj: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DASHBOARD_RESET':
      return initialState;
    case 'DASHBOARD_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
