import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';
import { SecureCodeTypes } from 'utils/secureCode';

function* requestShareSecureCode({ boxId, phoneNumber, secureCodeType }) {
  try {
    const data = {
      number: phoneNumber,
    };
    let endpoint = api.shareSecureCode;
    let notificationText = 'One Time Passcode Shared';
    if (secureCodeType === SecureCodeTypes.fullDay) {
      endpoint = api.shareDailyCode;
      notificationText = '24H One Time Passcode Shared';
    }
    const response = yield call(endpoint, boxId, data);
    if (response?.status === 204) {
      yield put(Actions.showNotification({ text: notificationText, variant: 'success', icon: 'success' }));
      yield put(Actions.shareSecureCodeSuccess());
    } else {
      throw new Error('Failed to get a response');
    }
  } catch (error) {
    yield put(Actions.showNotification({ text: 'Failed to Share', variant: 'error', icon: 'error' }));
    yield put(Actions.shareSecureCodeFail());
  }
}

function* watchShareSecureCode() {
  yield takeLatest(Actions.SHARE_SECURE_CODE_REQUEST, requestShareSecureCode);
}

export default function* shareCode() {
  yield all([
    fork(watchShareSecureCode),
  ]);
}
