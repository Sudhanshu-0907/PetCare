const initialState = {
  obj: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PET_PHOTOS_RESET':
      return initialState;
    case 'PET_PHOTOS_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
