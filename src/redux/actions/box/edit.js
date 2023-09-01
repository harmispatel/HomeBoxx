const NAME = 'BOX';

export const EDIT_BOX_REQUEST = `${NAME}/EDIT_BOX_REQUEST`;
export const EDIT_BOX_SUCCESS = `${NAME}/EDIT_BOX_SUCCESS`;
export const EDIT_BOX_FAIL = `${NAME}/EDIT_BOX_FAIL`;

export const editBox = (id, data) => ({
  type: EDIT_BOX_REQUEST,
  id,
  data,
});

export const editBoxSuccess = () => ({
  type: EDIT_BOX_SUCCESS,
});

export const editBoxFail = (error) => ({
  type: EDIT_BOX_FAIL,
  error,
});
