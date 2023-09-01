import Actions from 'actions';

const getDefaultState = () => ({});

const fetch = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.FETCH_BOX_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

export default fetch;
