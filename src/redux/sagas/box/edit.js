import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';
import AppNavigationService from 'navigators/app/AppNavigationService';

function* editBox({ id, data }) {
  try {
    const response = yield call(api.editBox, id, data);
    if (response?.status === 204) {
      yield put(Actions.editBoxSuccess());
      yield put(Actions.listBoxes());
      yield call(AppNavigationService.navigate, 'Dashboard');
      yield put(Actions.showNotification({ text: 'Homeboxx Updated', variant: 'success', icon: 'success' }));
    } else {
      yield put(Actions.showNotification({ text: 'Error Occured', variant: 'error', icon: 'error' }));
      yield put(Actions.editBoxFail());
    }
  } catch (error) {
    yield put(Actions.showNotification({ text: 'Error Occured', variant: 'error', icon: 'error' }));
    yield put(Actions.editBoxFail(error));
  }
}

function* watchEditBox() {
  yield takeLatest(Actions.EDIT_BOX_REQUEST, editBox);
}

export default function* edit() {
  yield all([
    fork(watchEditBox),
  ]);
}
