import Actions from 'actions';

const getDefaultState = () => ({
  isOn: false,
});

const tempControl = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.TOGGLE_TEMP_CONTROL_SUCCESS:
      return {
        isOn: action.isOn,
      };
    case Actions.TOGGLE_TEMP_CONTROL_FAIL:
      return {
        ...state,
      };
    case Actions.SET_CURRENT_BOX:
      if (!action.box) return getDefaultState();
      return {
        isOn: !!action.box.temperatureControlOn,
      };
    default:
      return state;
  }
};

export default tempControl;
