import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';
import moment from 'moment';

function* requestPair() {
  try {
    const response = yield call(api.requestPair);
    if (response?.data) {
      const { data: { expiresAt } } = response;
      yield put(Actions.requestPairSuccess(response.data));
      const now = moment();
      const expiresAtInSeconds = moment.duration(moment(expiresAt).diff(now)).asSeconds();
      yield put(Actions.startTimer(Math.round(expiresAtInSeconds),
        () => Actions.stopPairingWatcher()));
      yield put(Actions.startPairingWatcher(response.data.id));
    }
  } catch (error) {
    yield put(Actions.requestPairFail(error));
  }
}

function* watchRequestPair() {
  yield takeLatest(Actions.REQUEST_PAIR_REQUEST, requestPair);
}

export default function* pair() {
  yield all([
    fork(watchRequestPair),
  ]);
}
