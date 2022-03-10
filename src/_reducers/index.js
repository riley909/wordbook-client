import { combineReducers } from 'redux';
import user from './user_reducer';
import dict from './dict_reducer';

const rootReducer = combineReducers({
  user,
  dict,
});

export default rootReducer;
