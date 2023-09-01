import Actions from 'actions';

const getDefaultState = () => (null);

export default (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.SET_CURRENT_BOX:
      return (action.box);
    default:
      return state;
  }
};
