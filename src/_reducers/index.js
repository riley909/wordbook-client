import { combineReducers } from 'redux';
import user from './user_reducer';
import dict from './dict_reducer';
import wordbook from './wordbook_reducer';

const rootReducer = combineReducers({
  user,
  dict,
  wordbook,
});

export default rootReducer;
