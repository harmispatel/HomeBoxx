import Actions from 'actions';
import { findIndex } from 'lodash';

const getDefaultState = () => [];

const updateBox = (list, boxId, changes) => {
  const index = findIndex(list, (box) => box.id === boxId);
  const updatedList = [...list];
  if (index >= 0) {
    updatedList[index] = { ...list[index], ...changes };
  }
  return updatedList;
};

const list = (state = getDefaultState(), action) => {
  switch (action.type) {
    case Actions.LIST_BOXES_SUCCESS:
      return action.data;
    case Actions.UPDATE_BOX:
      return updateBox(state, action.boxId, action.changes);
    default:
      return state;
  }
};

export default list;
