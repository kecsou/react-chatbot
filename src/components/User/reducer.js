import {
  USER_SET_DESCRIPTION,
  USER_SET_NAME,
} from './action';

const initialState = {
  description: '',
  name: '',
};

/**
 * 
 * @param {*} state 
 * @param {*} action
 */
const actionUserSetName = (state, action) => {
  return {...state, name: action.name};
};

/**
 * 
 * @param {*} state 
 * @param {*} action
 */
const actionUserSetDescription = (state, action) => {
  return {...state, description: action.description};
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SET_NAME:
      return actionUserSetName(state, action);

    case USER_SET_DESCRIPTION:
      return actionUserSetDescription(state, action);

    default:
      return state;
  }
};
