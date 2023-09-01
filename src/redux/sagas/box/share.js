import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';

function* requestShareBox({ boxId, userId, callback }) {
  try {
    const data = {
      id: userId,
    };
    const response = yield call(api.shareBox, boxId, data);
    if (response?.status === 204) {
      yield put(Actions.showNotification({ text: 'Homeboxx Shared!', variant: 'success', icon: 'success' }));
      if (callback) callback();
      yield put(Actions.shareBoxSuccess());
    } else {
      throw new Error('Failed to get a response');
    }
  } catch (error) {
    yield put(Actions.showNotification({ text: 'Failed to Share Homeboxx', variant: 'error', icon: 'error' }));
    yield put(Actions.shareBoxFail());
  }
}

function* watchRequestShareBox() {
  yield takeLatest(Actions.SHARE_BOX_REQUEST, requestShareBox);
}

export default function* share() {
  yield all([
    fork(watchRequestShareBox),
  ]);
}
