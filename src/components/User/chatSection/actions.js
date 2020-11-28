export const CHAT_SECTION_ADD_MESSAGE = 'CHAT_SECTION_ADD_MESSAGE';
export const CHAT_SECTION_SET_MESSAGES = 'CHAT_SECTION_SET_MESSAGES';
export const CHAT_SECTION_SET_MESSAGE_TO_SEND = 'CHAT_SECTION_SET_MESSAGE_TO_SEND';

export const actionAddMessage = (message) => ({ type: CHAT_SECTION_ADD_MESSAGE, message });

export const actionSetMessages = (messages) => ({
  type: CHAT_SECTION_SET_MESSAGES,
  messages
});

export const actionSetMessageToSend = (messageToSend) => ({
  type: CHAT_SECTION_SET_MESSAGE_TO_SEND,
  messageToSend,
});
