import Actions from 'actions';

export const getDefaultState = () => true;

const network = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.TOGGLE_NETWORK_CONNECTED:
      return true;
    case Actions.TOGGLE_NETWORK_DISCONNECTED:
      return false;
    default:
      return state;
  }
};

export default network;
