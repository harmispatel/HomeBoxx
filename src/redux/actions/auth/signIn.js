export const NAME = 'AUTH';

export const WEB_AUTH_REQUEST = `${NAME}/WEB_AUTH_REQUEST`;
export const WEB_AUTH_SUCCESS = `${NAME}/WEB_AUTH_SUCCESS`;
export const WEB_AUTH_FAIL = `${NAME}/WEB_AUTH_FAIL`;

export const SMS_PASSWORDLESS_REQUEST = `${NAME}/SMS_PASSWORDLESS_REQUEST`;
export const SMS_PASSWORDLESS_SUCCESS = `${NAME}/SMS_PASSWORDLESS_SUCCESS`;
export const SMS_PASSWORDLESS_FAIL = `${NAME}/SMS_PASSWORDLESS_FAIL`;

export const SMS_LOGIN_REQUEST = `${NAME}/SMS_LOGIN_REQUEST`;
export const SMS_LOGIN_SUCCESS = `${NAME}/SMS_LOGIN_SUCCESS`;
export const SMS_LOGIN_FAIL = `${NAME}/SMS_LOGIN_FAIL`;

export const webAuth = () => ({
  type: WEB_AUTH_REQUEST,
});

export const webAuthSuccess = (data) => ({
  type: WEB_AUTH_SUCCESS,
  data,
});

export const webAuthFail = (error) => ({
  type: WEB_AUTH_FAIL,
  error,
});

export const smsPasswordless = (phoneNumber) => ({
  type: SMS_PASSWORDLESS_REQUEST,
  phoneNumber,
});

export const smsPasswordlessSuccess = () => ({
  type: SMS_PASSWORDLESS_SUCCESS,
});

export const smsPasswordlessFail = (error) => ({
  type: SMS_PASSWORDLESS_FAIL,
  error,
});

export const smsLogin = (phoneNumber, code) => ({
  type: SMS_LOGIN_REQUEST,
  phoneNumber,
  code,
});

export const smsLoginSuccess = (data) => ({
  type: SMS_LOGIN_SUCCESS,
  data,
});

export const smsLoginFail = (error) => ({
  type: SMS_LOGIN_FAIL,
  error,
});
