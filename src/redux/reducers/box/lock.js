import Actions from 'actions';

const getDefaultState = () => ({
  isLoading: true,
  isLocked: false,
});

const lock = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.LOCK_BOX_SUCCESS:
    case Actions.UNLOCK_BOX_FAIL:
      return {
        isLoading: false,
        isLocked: true,
      };
    case Actions.UNLOCK_BOX_SUCCESS:
    case Actions.LOCK_BOX_FAIL:
      return {
        isLoading: false,
        isLocked: false,
      };
    case Actions.LOCK_BOX_REQUEST:
    case Actions.UNLOCK_BOX_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.SET_CURRENT_BOX:
      if (!action.box) return getDefaultState();
      return {
        isLoading: false,
        isLocked: !!action.box.locked,
      };
    default:
      return state;
  }
};

export default lock;
