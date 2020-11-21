import {
  CHAT_SECTION_ADD_MESSAGE, CHAT_SECTION_SET_MESSAGES,
} from './actions';

const initialState = {
  messages: [],
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

export default (state = initialState, action) => {
  switch (action.type) {
    case CHAT_SECTION_ADD_MESSAGE:
      return actionAddMessage(state, action);

    case CHAT_SECTION_SET_MESSAGES:
      return actionSetMessages(state, action);

    default:
      return state;
  }
};
