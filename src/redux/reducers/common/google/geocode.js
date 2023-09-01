import Actions from 'actions';

export const getDefaultState = () => null;

const geocode = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.FETCH_GOOGLE_PLACE_GEOCODE_SUCCESS:
      return action.data;
    case Actions.FETCH_GOOGLE_PLACE_GEOCODE_FAIL:
      return getDefaultState();
    default:
      return state;
  }
};

export default geocode;
