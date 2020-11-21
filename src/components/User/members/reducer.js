import {
  SET_BOT_LIST,
  SET_USER_LIST,
} from './action';

const initialState = {
  botList: [],
  userList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOT_LIST:
      return { ...state, botList: action.botList };

    case SET_USER_LIST:
      return { ...state, userList: action.userList };

    default:
      return state;
  }
};
