const NAME = 'COMMON';

export const START_TIMER = `${NAME}/START_TIMER`;
export const STOP_TIMER = `${NAME}/STOP_TIMER`;
export const TICK_DOWN = `${NAME}/TICK_DOWN`;

export const startTimer = (seconds, callback) => ({
  type: START_TIMER,
  seconds,
  callback,
});

export const stopTimer = () => ({
  type: STOP_TIMER,
});

export const tickDown = (callback) => ({
  type: TICK_DOWN,
  callback,
});
