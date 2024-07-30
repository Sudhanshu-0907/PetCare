const initialState = {
  obj: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_PET_PROFILE_RESET':
      return initialState;
    case 'CREATE_PET_PROFILE_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
