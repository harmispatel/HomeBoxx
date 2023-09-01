const NAME = 'PERSIST';

export const SET_PLAYER_ID = `${NAME}/SET_PLAYER_ID`;
export const CLEAR_PLAYER_ID = `${NAME}/CLEAR_PLAYER_ID`;

export const setPlayerId = (id) => ({
  type: SET_PLAYER_ID,
  id,
});

export const clearPlayerId = () => ({
  type: CLEAR_PLAYER_ID,
});
