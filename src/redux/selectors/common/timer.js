const NAME = 'COMMON';

export const getCurrentSeconds = (store) => store[NAME].timer.seconds;
export const isTicking = (store) => store[NAME].timer.isTicking;
