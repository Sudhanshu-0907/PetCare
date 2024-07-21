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

const appReducer = combineReducers({
  login,
  signUp,
  dashboard,
  forgotPassword,
});

const mainReducer = (state, action) => {
  return appReducer(state, action);
};

export default mainReducer;
