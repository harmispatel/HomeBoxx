import Actions from 'actions';

const getDefaultState = () => ({});

const fetch = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.FETCH_USER_SUCCESS:
      return action.data;
    case Actions.SIGN_OUT:
      return getDefaultState();
    default:
      return state;
  }
};

export default fetch;
