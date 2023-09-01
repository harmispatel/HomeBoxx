const NAME = 'BOX';

export const FETCH_SECURE_CODE_REQUEST = `${NAME}/FETCH_SECURE_CODE_REQUEST`;
export const FETCH_SECURE_CODE_SUCCESS = `${NAME}/FETCH_SECURE_CODE_SUCCESS`;
export const FETCH_SECURE_CODE_FAIL = `${NAME}/FETCH_SECURE_CODE_FAIL`;

export const fetchSecureCode = (boxId) => ({
  type: FETCH_SECURE_CODE_REQUEST,
  boxId,
});

export const fetchSecureCodeSuccess = (data) => ({
  type: FETCH_SECURE_CODE_SUCCESS,
  data,
});

export const fetchSecureCodeFail = (error) => ({
  type: FETCH_SECURE_CODE_FAIL,
  error,
});
