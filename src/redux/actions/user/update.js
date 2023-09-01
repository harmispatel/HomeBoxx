const NAME = 'USER';

export const UPDATE_USER_REQUEST = `${NAME}/UPDATE_USER_REQUEST`;
export const UPDATE_USER_SUCCESS = `${NAME}/UPDATE_USER_SUCCESS`;
export const UPDATE_USER_FAIL = `${NAME}/UPDATE_USER_FAIL`;

export const updateUser = (data, callbackSuccess, callbackFail) => ({
  type: UPDATE_USER_REQUEST,
  data,
  callbackSuccess,
  callbackFail,
});

export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
});

export const updateUserFail = (error) => ({
  type: UPDATE_USER_FAIL,
  error,
});
