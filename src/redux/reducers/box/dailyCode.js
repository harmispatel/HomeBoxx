import Actions from 'actions';

export const getDefaultState = () => ({});

const dailyCode = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.FETCH_DAILY_CODE_REQUEST:
    case Actions.FETCH_DAILY_CODE_FAIL:
      return getDefaultState();
    case Actions.FETCH_DAILY_CODE_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

export default dailyCode;
