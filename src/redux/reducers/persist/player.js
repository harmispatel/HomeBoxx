import Actions from 'actions';

export const getDefaultState = () => null;

const player = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.SET_PLAYER_ID:
      return action.id;
    case Actions.CLEAR_PLAYER_ID:
      return getDefaultState();
    default:
      return state;
  }
};

export default player;
