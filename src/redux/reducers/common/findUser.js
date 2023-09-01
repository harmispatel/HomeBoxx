import Actions from 'actions';

export const getDefaultState = () => null;

const findUser = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.FIND_USER_REQUEST:
    case Actions.FIND_USER_FAIL:
    case Actions.CLEAR_FOUND_USER:
      return getDefaultState();
    case Actions.FIND_USER_SUCCESS:
      if (typeof action.data !== 'undefined') {
        return action.data;
      }
      return getDefaultState();
    default:
      return state;
  }
};

export default findUser;
