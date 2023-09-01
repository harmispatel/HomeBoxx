const NAME = 'COMMON';

export const FIND_USER_REQUEST = `${NAME}/FIND_USER_REQUEST`;
export const FIND_USER_FAIL = `${NAME}/FIND_USER_FAIL`;
export const FIND_USER_SUCCESS = `${NAME}/FIND_USER_SUCCESS`;

export const CLEAR_FOUND_USER = `${NAME}/CLEAR_FOUND_USER`;

export const findUser = (params) => ({
  type: FIND_USER_REQUEST,
  params,
});

export const findUserSuccess = (data) => ({
  type: FIND_USER_SUCCESS,
  data,
});

export const findUserFail = (error) => ({
  type: FIND_USER_FAIL,
  error,
});

export const clearFoundUser = () => ({
  type: CLEAR_FOUND_USER,
});
