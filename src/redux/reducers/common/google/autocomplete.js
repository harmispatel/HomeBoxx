import Actions from 'actions';

export const getDefaultState = () => [];

const autocomplete = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.GOOGLE_AUTOCOMPLETE_SUCCESS:
      return action.data;
    case Actions.GOOGLE_AUTOCOMPLETE_FAIL:
    case Actions.CLEAR_GOOGLE_AUTOCOMPLETE:
      return getDefaultState();
    default:
      return state;
  }
};

export default autocomplete;
