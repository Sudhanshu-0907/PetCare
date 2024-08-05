/**
 * Plugins
 */
import {combineReducers} from 'redux';

/**
 * Modules
 */
import login from '../../modules/login/reducer';
import signUp from '../../modules/signUp/reducer';
import dashboard from '../../modules/dashboard/reducer';
import forgotPassword from '../../modules/forgotPassword/reducer';
import header from '../../modules/Header/reducer';
import createPetProfile from '../../modules/createPetProfile/reducer';
import petPhotos from '../../modules/petPhotos/reducer';

const appReducer = combineReducers({
  login,
  signUp,
  dashboard,
  forgotPassword,
  header,
  createPetProfile,
  petPhotos,
});

const mainReducer = (state, action) => {
  return appReducer(state, action);
};

export default mainReducer;
