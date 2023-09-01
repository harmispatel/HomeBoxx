import {
  takeLatest, all, fork, put, call, select,
} from 'redux-saga/effects';
import Actions from 'actions';
import Selectors from 'selectors';
import api from 'api';

function* simulatePairing({ code }) {
  try {
    const data = {
      pairingCode: code,
      boxId: Math.random().toString(36).replace('0.', ''),
    };
    const response = yield call(api.simulatePairing, data);
    if (response?.status === 204) {
      yield put(Actions.simulatePairingSuccess());
    }
  } catch (error) {
    yield put(Actions.simulatePairingFail(error));
  }
}

function* simulateEvent({ data }) {
  try {
    const box = yield select(Selectors.getCurrentBox);
    if (box) {
      const response = yield call(api.simulateEvent, box.id, data);
      if (response?.status === 204) {
        yield put(Actions.simulateEventSuccess());
        yield put(Actions.showNotification({ text: 'Event Simulated!', variant: 'success', icon: 'success' }));
        yield put(Actions.listBoxes());
      }
    }
  } catch (error) {
    yield put(Actions.simulateEventFail(error));
  }
}

function* watchSimulatePairing() {
  yield takeLatest(Actions.SIMULATE_PAIRING_REQUEST, simulatePairing);
}

function* watchSimulateEvent() {
  yield takeLatest(Actions.SIMULATE_EVENT_REQUEST, simulateEvent);
}

export default function* simulate() {
  yield all([
    fork(watchSimulatePairing),
    fork(watchSimulateEvent),
  ]);
}
