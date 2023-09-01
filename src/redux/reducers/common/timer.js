import Actions from 'actions';

export const getDefaultState = () => ({ seconds: 0, isTicking: false });

const timer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.START_TIMER:
      return {
        seconds: action.seconds,
        isTicking: true,
      };
    case Actions.STOP_TIMER:
    case Actions.SIGN_OUT:
      return {
        seconds: 0,
        isTicking: false,
      };
    case Actions.TICK_DOWN:
      return {
        seconds: state.seconds - 1,
        isTicking: true,
      };
    default:
      return state;
  }
};

export default timer;
