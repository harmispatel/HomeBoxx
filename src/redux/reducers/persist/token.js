import Actions from 'actions';

export const getDefaultState = () => ({});

function token(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case Actions.WEB_AUTH_SUCCESS:
    case Actions.SMS_LOGIN_SUCCESS:
    case Actions.SET_TOKEN:
      return action.data;
    case Actions.SIGN_OUT:
      return getDefaultState();
    default:
      return state;
  }
}

export default token;
