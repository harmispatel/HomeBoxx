const NAME = 'BOX';

export const TOGGLE_TEMP_CONTROL_REQUEST = `${NAME}/TOGGLE_TEMP_CONTROL_REQUEST`;
export const TOGGLE_TEMP_CONTROL_SUCCESS = `${NAME}/TOGGLE_TEMP_CONTROL_SUCCESS`;
export const TOGGLE_TEMP_CONTROL_FAIL = `${NAME}/TOGGLE_TEMP_CONTROL_FAIL`;

export const toggleTempControl = (boxId) => ({
  type: TOGGLE_TEMP_CONTROL_REQUEST,
  boxId,
});

export const toggleTempControlSuccess = (isOn) => ({
  type: TOGGLE_TEMP_CONTROL_SUCCESS,
  isOn,
});

export const toggleTempControlFail = (error) => ({
  type: TOGGLE_TEMP_CONTROL_FAIL,
  error,
});
