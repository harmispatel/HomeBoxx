import {
  takeLatest, all, fork, put, select, delay,
} from 'redux-saga/effects';
import Actions from 'actions';
import Selectors from 'selectors';

function* startTimer({ callback }) {
  yield put(Actions.tickDown(callback));
}

function* tickDown({ callback }) {
  const isTicking = yield (select(Selectors.isTicking));
  if (!isTicking) return;
  const seconds = yield select(Selectors.getCurrentSeconds);
  if (seconds > 0) {
    yield delay(1000);
    yield put(Actions.tickDown(callback));
  } else if (callback) {
    yield put(callback());
  }
}

function* watchTickDown() {
  yield takeLatest(Actions.TICK_DOWN, tickDown);
}

function* watchStartTimer() {
  yield takeLatest(Actions.START_TIMER, startTimer);
}


export default function* timer() {
  yield all([
    fork(watchTickDown),
    fork(watchStartTimer),
  ]);
}
