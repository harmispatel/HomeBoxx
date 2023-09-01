import Actions from 'actions';

const getDefaultState = () => ({ error: null });

function signIn(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        error: null,
      };
    case Actions.SIGN_IN_SUCCESS:
      return {
        error: null,
      };
    case Actions.SIGN_IN_FAIL:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}

export default signIn;
