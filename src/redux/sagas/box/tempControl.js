import {
  takeLatest, all, fork, put, select,
} from 'redux-saga/effects';
import Actions from 'actions';
import Selectors from 'selectors';
import api from 'api';

function* toggleTempControl({ boxId }) {
  try {
    const tempControlState = yield select(Selectors.getTempControlState);
    const isOn = !tempControlState.isOn;
    if (tempControlState.isOn) {
      yield fork(api.disableTempControl, boxId);
      yield put(Actions.showNotification({ text: 'Temperature Control Turned Off', variant: 'error', icon: 'success' }));
    } else {
      yield fork(api.enableTempControl, boxId);
      yield put(Actions.showNotification({ text: 'Temperature Control Turned On', variant: 'success', icon: 'success' }));
    }
    yield put(Actions.toggleTempControlSuccess(isOn));
  } catch (error) {
    yield put(Actions.showNotification({ text: 'Failed to Toggle Temperature Control', variant: 'error', icon: 'error' }));
    yield put(Actions.toggleTempControlFail(error));
  }
}

function* watchToggleTempControl() {
  yield takeLatest(Actions.TOGGLE_TEMP_CONTROL_REQUEST, toggleTempControl);
}

export default function* pair() {
  yield all([
    fork(watchToggleTempControl),
  ]);
}
