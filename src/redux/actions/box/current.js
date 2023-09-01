const NAME = 'BOX';

export const SET_CURRENT_BOX = `${NAME}/SET_CURRENT_BOX`;

export const setCurrentBox = (box) => ({
  type: SET_CURRENT_BOX,
  box,
});
