export const USER_SET_NAME = 'USER_SET_NAME';
export const USER_SET_DESCRIPTION = 'USER_SET_DESCRIPTION';

export const actionUserSetName = (name = '') => ({
  type: USER_SET_NAME,
  name,
});

export const actionUserSetDescription = (description = '') => ({
  type: USER_SET_DESCRIPTION,
  description,
});
