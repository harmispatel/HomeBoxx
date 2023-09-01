import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';
import moment from 'moment';

function* fetchSecureCode({ boxId }) {
  try {
    const response = yield call(api.fetchSecureCode, boxId);
    if (response?.data) {
      const { data: { validTo } } = response;
      yield put(Actions.fetchSecureCodeSuccess(response.data));
      const now = moment();
      const expiresAtInSeconds = moment.duration(moment(validTo).diff(now)).asSeconds();
      yield put(Actions.startTimer(Math.round(expiresAtInSeconds),
        () => Actions.fetchSecureCode(boxId)));
    }
  } catch (error) {
    yield put(Actions.stopTimer());
    yield put(Actions.fetchSecureCodeFail(error));
    // TODO: Add a way for users to retry
  }
}

function* watchFetchSecureCode() {
  yield takeLatest(Actions.FETCH_SECURE_CODE_REQUEST, fetchSecureCode);
}

export default function* secureCode() {
  yield all([
    fork(watchFetchSecureCode),
  ]);
}
