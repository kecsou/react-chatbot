import { combineReducers } from 'redux';
import members from './components/User/members/reducer';
import chat from './components/User/chatSection/reducer';
import user from './components/User/reducer';

const reducers = combineReducers({
  chat,
  members,
  user
});

export default reducers;
