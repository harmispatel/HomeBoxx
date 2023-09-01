import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';

function* fetchDailyCode({ boxId }) {
  try {
    const response = yield call(api.fetchDailyCode, boxId);
    if (response?.data) {
      const { data } = response;
      yield put(Actions.fetchDailyCodeSuccess(data));
    }
  } catch (error) {
    yield put(Actions.fetchDailyCodeFail(error));
  }
}

function* watchFetchDailyCode() {
  yield takeLatest(Actions.FETCH_DAILY_CODE_REQUEST, fetchDailyCode);
}

export default function* dailyCode() {
  yield all([
    fork(watchFetchDailyCode),
  ]);
}
