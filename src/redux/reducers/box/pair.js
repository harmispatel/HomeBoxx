import Actions from 'actions';

export const getDefaultState = () => ({});

const pair = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.REQUEST_PAIR_REQUEST:
    case Actions.REQUEST_PAIR_FAIL:
      return getDefaultState();
    case Actions.REQUEST_PAIR_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

export default pair;
