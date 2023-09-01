const NAME = 'BOX';

export const UNPAIR_BOX_REQUEST = `${NAME}/UNPAIR_BOX_REQUEST`;
export const UNPAIR_BOX_SUCCESS = `${NAME}/UNPAIR_BOX_SUCCESS`;
export const UNPAIR_BOX_FAIL = `${NAME}/UNPAIR_BOX_FAIL`;

export const unpairBox = (callback) => ({
  type: UNPAIR_BOX_REQUEST,
  callback,
});

export const unpairBoxSuccess = () => ({
  type: UNPAIR_BOX_SUCCESS,
});

export const unpairBoxFail = (error) => ({
  type: UNPAIR_BOX_FAIL,
  error,
});
