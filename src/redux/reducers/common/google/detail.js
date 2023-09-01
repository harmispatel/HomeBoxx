import Actions from 'actions';

export const getDefaultState = () => null;

const detail = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.FETCH_GOOGLE_PLACE_DETAIL_SUCCESS:
      return action.data;
    case Actions.FETCH_GOOGLE_PLACE_DETAIL_FAIL:
      return getDefaultState();
    default:
      return state;
  }
};

export default detail;
