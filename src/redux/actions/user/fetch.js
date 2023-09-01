const NAME = 'USER';

export const FETCH_USER_REQUEST = `${NAME}/FETCH_USER_REQUEST`;
export const FETCH_USER_SUCCESS = `${NAME}/FETCH_USER_SUCCESS`;
export const FETCH_USER_FAIL = `${NAME}/FETCH_USER_FAIL`;

export const fetchUser = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (data) => ({
  type: FETCH_USER_SUCCESS,
  data,
});

export const fetchUserFail = (error) => ({
  type: FETCH_USER_FAIL,
  error,
});
