import {
  CHAT_SECTION_ADD_MESSAGE,
  CHAT_SECTION_SET_MESSAGES,
  CHAT_SECTION_SET_MESSAGE_TO_SEND,
} from './actions';

const initialState = {
  messages: [],
  messageToSend: '',
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
const actionAddMessage = (state, action) => {
  const messages = [...state.messages, action.message];
  return { ...state, messages };
};

/**
 *
 * @param {*} state 
 * @param {*} action 
 */
const actionSetMessages = (state, action) => {
  return { ...state, messages: action.messages };
};

const actionSetMessageToSend = (state, action) => ({
  ...state,
  messageToSend: action.messageToSend
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CHAT_SECTION_ADD_MESSAGE:
      return actionAddMessage(state, action);

    case CHAT_SECTION_SET_MESSAGES:
      return actionSetMessages(state, action);

    case CHAT_SECTION_SET_MESSAGE_TO_SEND:
      return actionSetMessageToSend(state, action);

    default:
      return state;
  }
};
