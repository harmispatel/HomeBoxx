import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';
import isEmpty from 'lodash/isEmpty';

function* listBoxes() {
  try {
    const response = yield call(api.listBoxes);
    if (response?.data) {
      const boxes = response.data;
      if (!isEmpty(boxes)) {
        yield put(Actions.setCurrentBox(boxes[0]));
      } else {
        yield put(Actions.setCurrentBox(null));
        yield put(Actions.stopTimer());
      }
      yield put(Actions.listBoxesSuccess(boxes));
    }
  } catch (error) {
    yield put(Actions.listBoxesFail(error));
  }
}

function* watchListBoxes() {
  yield takeLatest(Actions.LIST_BOXES_REQUEST, listBoxes);
}

export default function* list() {
  yield all([
    fork(watchListBoxes),
  ]);
}
