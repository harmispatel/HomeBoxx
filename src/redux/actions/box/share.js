const NAME = 'BOX';

export const SHARE_BOX_REQUEST = `${NAME}/SHARE_BOX_REQUEST`;
export const SHARE_BOX_SUCCESS = `${NAME}/SHARE_BOX_SUCCESS`;
export const SHARE_BOX_FAIL = `${NAME}/SHARE_BOX_FAIL`;

export const shareBox = (boxId, userId, callback) => ({
  type: SHARE_BOX_REQUEST,
  boxId,
  userId,
  callback,
});

export const shareBoxSuccess = () => ({
  type: SHARE_BOX_SUCCESS,
});

export const shareBoxFail = (error) => ({
  type: SHARE_BOX_FAIL,
  error,
});
