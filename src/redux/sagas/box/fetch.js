import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';

function* fetchBox({ id }) {
  try {
    const response = yield call(api.fetchBox, id);
    if (response?.data) {
      yield put(Actions.fetchBoxSuccess(response.data));
    }
  } catch (error) {
    yield put(Actions.fetchBoxFail(error));
  }
}

function* watchFetchBox() {
  yield takeLatest(Actions.FETCH_BOX_REQUEST, fetchBox);
}

export default function* fetch() {
  yield all([
    fork(watchFetchBox),
  ]);
}
