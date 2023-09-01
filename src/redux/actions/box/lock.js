const NAME = 'BOX';

export const LOCK_BOX_REQUEST = `${NAME}/LOCK_BOX_REQUEST`;
export const LOCK_BOX_SUCCESS = `${NAME}/LOCK_BOX_SUCCESS`;
export const LOCK_BOX_FAIL = `${NAME}/LOCK_BOX_FAIL`;

export const UNLOCK_BOX_REQUEST = `${NAME}/UNLOCK_BOX_REQUEST`;
export const UNLOCK_BOX_SUCCESS = `${NAME}/UNLOCK_BOX_SUCCESS`;
export const UNLOCK_BOX_FAIL = `${NAME}/UNLOCK_BOX_FAIL`;

export const lockBox = (boxId, callback) => ({
  type: LOCK_BOX_REQUEST,
  boxId,
  callback,
});

export const lockBoxSuccess = () => ({
  type: LOCK_BOX_SUCCESS,
});

export const lockBoxFail = (error) => ({
  type: LOCK_BOX_FAIL,
  error,
});

export const unlockBox = (boxId, callback) => ({
  type: UNLOCK_BOX_REQUEST,
  boxId,
  callback,
});

export const unlockBoxSuccess = () => ({
  type: UNLOCK_BOX_SUCCESS,
});

export const unlockBoxFail = (error) => ({
  type: UNLOCK_BOX_FAIL,
  error,
});
