import {
  CHAT_SECTION_ADD_MESSAGE,
} from './actions';

const initialState = {
  messages: [],
  botResponses: [
    {
      botId: '1',
      response: 'Je suis ton père',
      reactOn: [
        'Qui es-tu ?',
        'Vous êtes qui',
        'On se connait ?',
        'Who are you',
      ],
    },
    {
      botId: '1',
      response: 'La force est avec moi',
      reactOn: [
        'Je suis le plus fort',
        'Tu es nul',
        'Je te prend quand tu veux',
      ],
    },
  ],
};

/**
 *
 * @param {*} state
 * @param {*} content
 */
const getMessagesBot = (state, content = '') => {
  const pattern = new RegExp(content.trimLeft().trimRight(), 'i');
  const responses = state.botResponses.filter((r) => r.reactOn.some((m) => pattern.test(m)));

  return responses.map(({ botId, response }) => ({
    botId,
    content: response,
    fromBot: true,
    date: new Date(Date.now()),
  }));
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
const actionAddMessage = (state, action) => {
  const { content } = action.message;
  const botMessages = getMessagesBot(state, content);
  const messages = [...state.messages, action.message, ...botMessages];

  return { ...state, messages };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHAT_SECTION_ADD_MESSAGE:
      return actionAddMessage(state, action);

    default:
      return state;
  }
};
