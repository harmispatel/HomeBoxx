const NAME = 'PERSIST';

export const SET_TOKEN = `${NAME}/SET_TOKEN`;
export const CLEAR_TOKEN = `${NAME}/CLEAR_TOKEN`;

export const setToken = (data) => ({
  type: SET_TOKEN,
  data,
});

export const clearToken = () => ({
  type: CLEAR_TOKEN,
});
