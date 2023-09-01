import {
  takeLatest, all, fork, call, take, race, delay, put,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';
import AppNavigationService from 'navigators/app/AppNavigationService';

function* pollRequest(requestId) {
  while (true) {
    try {
      yield delay(4000);
      const response = yield call(api.getPairingRequest, requestId);
      if (response?.data && response?.data?.successful === true) {
        yield call(AppNavigationService.navigate, 'Paired', { box: response.data });
        yield put(Actions.stopTimer());
        yield put(Actions.showNotification({ text: 'Homeboxx Paired', variant: 'success', icon: 'paired' }));
        yield put(Actions.stopPairingWatcher());
      }
    } catch (error) {
      yield put(Actions.stopTimer());
      yield call(AppNavigationService.navigate, 'Dashboard');
      yield put(Actions.showNotification({ text: 'Error Occured', variant: 'error', icon: 'error' }));
      yield put(Actions.stopPairingWatcher());
    }
  }
}

function* pairingRequest({ requestId }) {
  yield race([call(pollRequest, requestId), take(Actions.STOP_PAIRING_WATCHER)]);
}

function* watchPairingRequest() {
  yield takeLatest(Actions.START_PAIRING_WATCHER, pairingRequest);
}

export default function* pair() {
  yield all([
    fork(watchPairingRequest),
  ]);
}
