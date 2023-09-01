import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';

function* lockBox({ boxId, callback }) {
  try {
    const response = yield call(api.lockBox, boxId);
    if (response?.status === 200) {
      yield put(Actions.showNotification({ text: 'LOCKED', variant: 'success', icon: 'locked' }));
      yield put(Actions.updateBox(boxId, { locked: true }));
      yield put(Actions.lockBoxSuccess());
    } else {
      throw new Error('Unable to get a response');
    }
  } catch (error) {
    yield put(Actions.showNotification({ text: 'Locking failed', variant: 'error', icon: 'unlocked' }));
    if (callback) yield call(callback);
    yield put(Actions.lockBoxFail(error));
  }
}

function* unlockBox({ boxId, callback }) {
  try {
    const response = yield call(api.unlockBox, boxId);
    if (response?.status === 200) {
      yield put(Actions.showNotification({ text: 'UNLOCKED', variant: 'warning', icon: 'unlocked' }));
      yield put(Actions.updateBox(boxId, { locked: false }));
      yield put(Actions.unlockBoxSuccess());
    } else {
      throw new Error('Unable to get a response');
    }
  } catch (error) {
    yield put(Actions.showNotification({ text: 'Unlocking failed', variant: 'error', icon: 'locked' }));
    if (callback) yield call(callback);
    yield put(Actions.unlockBoxFail(error));
  }
}

function* watchLockBox() {
  yield takeLatest(Actions.LOCK_BOX_REQUEST, lockBox);
}

function* watchUnlockBox() {
  yield takeLatest(Actions.UNLOCK_BOX_REQUEST, unlockBox);
}

export default function* pair() {
  yield all([
    fork(watchLockBox),
    fork(watchUnlockBox),
  ]);
}
