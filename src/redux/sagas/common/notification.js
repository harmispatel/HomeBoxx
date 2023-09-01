import {
  takeLatest, all, fork, put, delay,
} from 'redux-saga/effects';
import Actions from 'actions';

function* showNotification() {
  yield delay(3000);
  yield put(Actions.hideNotification());
}

function* watchShowNotification() {
  yield takeLatest(Actions.SHOW_NOTIFICATION, showNotification);
}

export default function* notification() {
  yield all([
    fork(watchShowNotification),
  ]);
}
