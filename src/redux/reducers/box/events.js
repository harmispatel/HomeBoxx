import Actions from 'actions';

const getDefaultState = () => [];

const events = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.FETCH_EVENTS_SUCCESS:
      return action.data;
    case Actions.FETCH_ADDON_EVENTS_SUCCESS:
      return [...state, ...action.data];
    default:
      return state;
  }
};

export default events;
