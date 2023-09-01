import {
  takeLatest, all, fork, put, call, select,
} from 'redux-saga/effects';
import Actions from 'actions';
import Selectors from 'selectors';
import api from 'api';
import AppNavigationService from 'navigators/app/AppNavigationService';

function* unpairBox({ callback }) {
  try {
    const currentBox = yield select(Selectors.getCurrentBox);
    const response = yield call(api.unpairBox, currentBox.id);
    if (response?.status === 204) {
      yield put(Actions.unpairBoxSuccess());
      yield call(AppNavigationService.navigate, 'Dashboard');
      yield put(Actions.showNotification({ text: 'Homeboxx Removed', variant: 'success', icon: 'success' }));
      yield put(Actions.listBoxes());
      if (callback) {
        yield call(callback);
      }
    } else {
      yield put(Actions.showNotification({ text: 'Error Occured', variant: 'error', icon: 'error' }));
      yield put(Actions.unpairBoxFail());
    }
  } catch (error) {
    yield put(Actions.unpairBoxFail(error));
  }
}

function* watchUnpairBox() {
  yield takeLatest(Actions.UNPAIR_BOX_REQUEST, unpairBox);
}

export default function* unpair() {
  yield all([
    fork(watchUnpairBox),
  ]);
}
