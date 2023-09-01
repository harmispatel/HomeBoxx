const NAME = 'BOX';

export const REQUEST_PAIR_REQUEST = `${NAME}/REQUEST_PAIR_REQUEST`;
export const REQUEST_PAIR_SUCCESS = `${NAME}/REQUEST_PAIR_SUCCESS`;
export const REQUEST_PAIR_FAIL = `${NAME}/REQUEST_PAIR_FAIL`;

export const requestPair = () => ({
  type: REQUEST_PAIR_REQUEST,
});

export const requestPairSuccess = (data) => ({
  type: REQUEST_PAIR_SUCCESS,
  data,
});

export const requestPairFail = (error) => ({
  type: REQUEST_PAIR_FAIL,
  error,
});
