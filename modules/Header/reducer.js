const initialState = {
  obj: {
    showLogoutButton: ['Dashboard'],
    notShowBackIcon: ['Dashboard', 'Login'],
    showPlusIcon: {
      Dashboard: 'CreatePetProfile',
      Weights: 'AddWeight',
      Vaccines: 'AddVaccine',
    },
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEADER_RESET':
      return initialState;
    case 'HEADER_OBJ':
      return {
        ...state,
        obj: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
