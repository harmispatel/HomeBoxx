const NAME = 'BOX';

export const FETCH_BOX_REQUEST = `${NAME}/FETCH_BOX_REQUEST`;
export const FETCH_BOX_SUCCESS = `${NAME}/FETCH_BOX_SUCCESS`;
export const FETCH_BOX_FAIL = `${NAME}/FETCH_BOX_FAIL`;

export const fetchBox = (id) => ({
  type: FETCH_BOX_REQUEST,
  id,
});

export const fetchBoxSuccess = (data) => ({
  type: FETCH_BOX_SUCCESS,
  data,
});

export const fetchBoxFail = (error) => ({
  type: FETCH_BOX_FAIL,
  error,
});
