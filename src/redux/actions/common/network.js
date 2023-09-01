const NAME = 'COMMON';

export const TOGGLE_NETWORK_CONNECTED = `${NAME}/TOGGLE_NETWORK_CONNECTED`;
export const TOGGLE_NETWORK_DISCONNECTED = `${NAME}/TOGGLE_NETWORK_DISCONNECTED`;

export const toggleNetworkConnected = () => ({
  type: TOGGLE_NETWORK_CONNECTED,
});

export const toggleNetworkDisconnected = () => ({
  type: TOGGLE_NETWORK_DISCONNECTED,
});
