import Actions from 'actions';

const getDefaultState = () => [];

const list = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.LIST_NOTIFICATIONS_SUCCESS:
      return action.data;
    case Actions.PAGINATE_NOTIFICATIONS_SUCCESS:
      return [...state, ...action.data];
    default:
      return state;
  }
};

export default list;
