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

const appReducer = combineReducers({
  login,
  signUp,
  dashboard,
  forgotPassword,
  header,
});

const mainReducer = (state, action) => {
  return appReducer(state, action);
};

export default mainReducer;
