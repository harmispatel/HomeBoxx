import isEmpty from 'lodash/isEmpty';

const NAME = 'PERSIST';

const getToken = (store) => {
  const { token } = store[NAME];
  return !isEmpty(token) ? token : null;
};

export const getAccessToken = (store) => {
  const token = getToken(store);
  return token && token.accessToken;
};

export const getRefreshToken = (store) => {
  const token = getToken(store);
  return token && token.refreshToken;
};

export const getTokenExpiry = (store) => {
  const token = getToken(store);
  return token && token.expiresIn;
};
export const getIssuedTime = (store) => {
  const token = getToken(store);
  return token && token.issuedTime;
};
