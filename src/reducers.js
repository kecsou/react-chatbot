import { combineReducers } from 'redux';
import members from './components/User/members/reducer';
import chat from './components/User/chatSection/reducer';

const reducers = combineReducers({
  chat,
  members,
});

export default reducers;
