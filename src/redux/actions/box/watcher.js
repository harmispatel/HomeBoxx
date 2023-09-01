const NAME = 'COMMON';

export const START_PAIRING_WATCHER = `${NAME}/START_PAIRING_WATCHER`;
export const STOP_PAIRING_WATCHER = `${NAME}/STOP_PAIRING_WATCHER`;

export const startPairingWatcher = (requestId) => ({
  type: START_PAIRING_WATCHER,
  requestId,
});

export const stopPairingWatcher = (data) => ({
  type: STOP_PAIRING_WATCHER,
  data,
});
