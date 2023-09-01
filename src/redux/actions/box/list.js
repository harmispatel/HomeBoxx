const NAME = 'BOX';

export const LIST_BOXES_REQUEST = `${NAME}/LIST_BOXES_REQUEST`;
export const LIST_BOXES_SUCCESS = `${NAME}/LIST_BOXES_SUCCESS`;
export const LIST_BOXES_FAIL = `${NAME}/LIST_BOXES_FAIL`;

export const UPDATE_BOX = `${NAME}/UPDATE_BOX`;

export const listBoxes = () => ({
  type: LIST_BOXES_REQUEST,
});

export const listBoxesSuccess = (data) => ({
  type: LIST_BOXES_SUCCESS,
  data,
});

export const listBoxesFail = (error) => ({
  type: LIST_BOXES_FAIL,
  error,
});

export const updateBox = (boxId, changes) => ({
  type: UPDATE_BOX,
  boxId,
  changes,
});
