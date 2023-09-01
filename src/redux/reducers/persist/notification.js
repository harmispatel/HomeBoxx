import Actions from 'actions';

export const getDefaultState = () => false;

function notification(state = getDefaultState(), action) {
  switch (action.type) {
    case Actions.SET_NOTIFICATION:
      return true;
    case Actions.CLEAR_NOTIFICATION:
      return getDefaultState();
    default:
      return state;
  }
}

export default notification;
