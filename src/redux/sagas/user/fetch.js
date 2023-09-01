import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';

function* fetchUser() {
  try {
    const response = yield call(api.fetchUser);
    if (response?.data) {
      yield put(Actions.fetchUserSuccess(response.data));
    }
  } catch (error) {
    yield put(Actions.fetchUserFail(error));
  }
}

function* watchFetchUser() {
  yield takeLatest(Actions.FETCH_USER_REQUEST, fetchUser);
}

export default function* fetch() {
  yield all([
    fork(watchFetchUser),
  ]);
}
