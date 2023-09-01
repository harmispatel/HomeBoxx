import Actions from 'actions';

export const getDefaultState = () => false;

const rehydrate = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.FINISH_REHYDRATE:
      return true;
    default:
      return state;
  }
};

export default rehydrate;
