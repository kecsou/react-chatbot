export const SET_BOT_LIST = 'SET_BOT_LIST';
export const SET_USER_LIST = 'SET_USER_LIST';

export const actionSetBotList = (botList = []) => ({
  type: SET_BOT_LIST,
  botList,
});

export const actionSetUserList = (userList = []) => ({
  type: SET_USER_LIST,
  userList,
});
