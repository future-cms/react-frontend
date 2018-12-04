import { combineReducers } from 'redux';

import auth from './auth';
import pageContainer from './pageContainer';
import profile from './profile';

export default combineReducers({
  auth,
  pageContainer,
  profile
});
