const NAME = 'PERSIST';

export const SET_NOTIFICATION = `${NAME}/SET_NOTIFICATION`;
export const CLEAR_NOTIFICATION = `${NAME}/CLEAR_NOTIFICATION`;

export const setNotification = () => ({
  type: SET_NOTIFICATION,
});

export const clearNotification = () => ({
  type: CLEAR_NOTIFICATION,
});
