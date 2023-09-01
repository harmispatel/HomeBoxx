import Actions from 'actions';

const getDefaultState = () => [];

const list = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.LIST_ADS_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

export default list;
