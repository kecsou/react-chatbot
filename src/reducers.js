import { combineReducers } from 'redux';
import botList from './components/botList/reducer';
import chat from './components/chatSection/reducer';

const reducers = combineReducers({
  botList,
  chat,
});

export default reducers;
