import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import { PermissionsAndroid, Platform } from 'react-native';

function* requestPermission({ permissionType, popUpText, callback }) {
  try {
    if (Platform.OS !== 'android' || !permissionType) {
      callback();
      return;
    }
    if (yield call(PermissionsAndroid.check, permissionType)) {
      callback();
      return;
    }
    const result = yield call(PermissionsAndroid.request, permissionType, popUpText);
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      callback();
      return;
    }
    yield put(Actions.showNotification({ text: 'Access denied', variant: 'error', icon: 'error' }));
  } catch (error) {
    yield put(Actions.showNotification({ text: 'Error requesting access', variant: 'error', icon: 'error' }));
  }
}

function* watchRequestPermission() {
  yield takeLatest(Actions.REQUEST_PERMISSION, requestPermission);
}

export default function* permission() {
  yield all([
    fork(watchRequestPermission),
  ]);
}
