import {
  takeLatest, all, fork, put, call, select, take,
} from 'redux-saga/effects';
import Actions from 'actions';
import Selectors from 'selectors';
import api from 'api';
import AppNavigationService from 'navigators/app/AppNavigationService';

function* updateUser({ data, callbackSuccess, callbackFail }) {
  try {
    const user = yield select(Selectors.getUser);
    const response = yield call(api.updateUser, data);
    if (response?.status === 204) {
      yield put(Actions.updateUserSuccess());
      yield put(Actions.showNotification({ text: 'User Updated', variant: 'success', icon: 'success' }));
      if (typeof data.phoneNumber !== 'undefined' && user.phone_number !== data.phoneNumber) {
        yield put(Actions.smsPasswordless(data.phoneNumber));
        const { error } = yield take([
          Actions.SMS_PASSWORDLESS_SUCCESS,
          Actions.SMS_PASSWORDLESS_FAIL,
        ]);
        if (!error) {
          yield take([Actions.SMS_LOGIN_SUCCESS, Actions.SMS_LOGIN_FAIL]);
          yield call(AppNavigationService.navigate, 'Profile');
          yield put(Actions.showNotification({ text: 'Phone Number Verified', variant: 'success', icon: 'success' }));
        }
      }
      if (callbackSuccess) {
        yield call(callbackSuccess);
      }
      yield put(Actions.fetchUser());
    }
  } catch (error) {
    if (callbackFail) {
      yield call(callbackFail);
    }
    yield put(Actions.showNotification({ text: 'Update Failed', variant: 'error', icon: 'error' }));
    yield put(Actions.updateUserFail(error));
  }
}

function* watchUpdateUser() {
  yield takeLatest(Actions.UPDATE_USER_REQUEST, updateUser);
}

export default function* update() {
  yield all([
    fork(watchUpdateUser),
  ]);
}
