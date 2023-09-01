const NAME = 'BOX';

export const SHARE_SECURE_CODE_REQUEST = `${NAME}/SHARE_SECURE_CODE_REQUEST`;
export const SHARE_SECURE_CODE_SUCCESS = `${NAME}/SHARE_SECURE_CODE_SUCCESS`;
export const SHARE_SECURE_CODE_FAIL = `${NAME}/SHARE_SECURE_CODE_FAIL`;

export const shareSecureCode = (boxId, phoneNumber, secureCodeType) => ({
  type: SHARE_SECURE_CODE_REQUEST,
  boxId,
  phoneNumber,
  secureCodeType,
});

export const shareSecureCodeSuccess = () => ({
  type: SHARE_SECURE_CODE_SUCCESS,
});

export const shareSecureCodeFail = (error) => ({
  type: SHARE_SECURE_CODE_FAIL,
  error,
});
