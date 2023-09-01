const NAME = 'BOX';

export const SIMULATE_PAIRING_REQUEST = `${NAME}/SIMULATE_PAIRING_REQUEST`;
export const SIMULATE_PAIRING_SUCCESS = `${NAME}/SIMULATE_PAIRING_SUCCESS`;
export const SIMULATE_PAIRING_FAIL = `${NAME}/SIMULATE_PAIRING_FAIL`;

export const SIMULATE_EVENT_REQUEST = `${NAME}/SIMULATE_EVENT_REQUEST`;
export const SIMULATE_EVENT_SUCCESS = `${NAME}/SIMULATE_EVENT_SUCCESS`;
export const SIMULATE_EVENT_FAIL = `${NAME}/SIMULATE_EVENT_FAIL`;

export const simulatePairing = (code) => ({
  type: SIMULATE_PAIRING_REQUEST,
  code,
});

export const simulatePairingSuccess = () => ({
  type: SIMULATE_PAIRING_SUCCESS,
});

export const simulatePairingFail = (error) => ({
  type: SIMULATE_PAIRING_FAIL,
  error,
});

export const simulateEvent = (data) => ({
  type: SIMULATE_EVENT_REQUEST,
  data,
});

export const simulateEventSuccess = () => ({
  type: SIMULATE_EVENT_SUCCESS,
});

export const simulateEventFail = (error) => ({
  type: SIMULATE_EVENT_FAIL,
  error,
});
