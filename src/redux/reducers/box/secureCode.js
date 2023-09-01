import Actions from 'actions';

export const getDefaultState = () => ({});

const secureCode = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.FETCH_SECURE_CODE_REQUEST:
    case Actions.FETCH_SECURE_CODE_FAIL:
      return getDefaultState();
    case Actions.FETCH_SECURE_CODE_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

export default secureCode;
