import Actions from 'actions';

export const getDefaultState = () => ({
  isVisible: false,
  text: null,
  varient: null,
  icon: null,
});

const notification = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.SHOW_NOTIFICATION:
      return {
        isVisible: true,
        ...action,
      };
    case Actions.HIDE_NOTIFICATION:
      return {
        isVisible: false,
        ...action,
      };
    default:
      return state;
  }
};

export default notification;
