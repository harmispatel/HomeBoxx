const NAME = 'BOX';

export const FETCH_DAILY_CODE_REQUEST = `${NAME}/FETCH_DAILY_CODE_REQUEST`;
export const FETCH_DAILY_CODE_SUCCESS = `${NAME}/FETCH_DAILY_CODE_SUCCESS`;
export const FETCH_DAILY_CODE_FAIL = `${NAME}/FETCH_DAILY_CODE_FAIL`;

export const fetchDailyCode = (boxId) => ({
  type: FETCH_DAILY_CODE_REQUEST,
  boxId,
});

export const fetchDailyCodeSuccess = (data) => ({
  type: FETCH_DAILY_CODE_SUCCESS,
  data,
});

export const fetchDailyCodeFail = (error) => ({
  type: FETCH_DAILY_CODE_FAIL,
  error,
});
