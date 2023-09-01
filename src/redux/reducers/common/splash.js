import Actions from 'actions';

export const getDefaultState = () => false;

const splash = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.FINISH_SPLASH:
      return true;
    default:
      return state;
  }
};

export default splash;
