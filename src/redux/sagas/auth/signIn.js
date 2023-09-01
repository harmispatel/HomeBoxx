import { takeLatest, all, fork, put, call, select } from 'redux-saga/effects';
import Actions from 'actions';
import Selectors from 'selectors';
import auth from 'utils/auth';
import AppNavigationService from 'navigators/app/AppNavigationService';
import { Alert } from 'react-native';
import moment from 'moment';

function* webAuth() {
  try {
    const response = yield call(auth.authorize);
    if (response?.accessToken) {
      const { accessToken, refreshToken, expiresIn } = response;
      const issuedTime = moment().format();
      yield put(Actions.webAuthSuccess({
        accessToken, refreshToken, expiresIn, issuedTime,
      }));
      const playerId = yield select(Selectors.getPlayerId);
      if (playerId) {
        yield put(Actions.updateUser({
          userMetadata: {
            player_id: playerId,
          },
        }));
      }
    }
  } catch (error) {
    yield put(Actions.webAuthFail(error));
  }
}

function* smsPasswordless({ phoneNumber }) {
  try {
    const response = yield call(auth.passwordlessWithSms, phoneNumber);
    if (response) {
      yield put(Actions.smsPasswordlessSuccess());
      yield call(AppNavigationService.navigate, 'EnterCode', { phoneNumber });
    }
  } catch (error) {
    if (error?.message) {
      yield call(Alert.alert, '', error.message);
    }
    yield put(Actions.smsPasswordlessFail(error));
  }
}

function* smsLogin({ phoneNumber, code }) {
  try {
    const response = yield call(auth.loginWithSms, phoneNumber, code);
    if (response?.accessToken) {
      const { accessToken, refreshToken, expiresIn } = response;
      const issuedTime = moment().format();
      yield put(Actions.smsLoginSuccess({
        accessToken, refreshToken, expiresIn, issuedTime,
      }));
      const playerId = yield select(Selectors.getPlayerId);
      if (playerId) {
        yield put(Actions.updateUser({
          userMetadata: {
            player_id: playerId,
          },
        }));
      }
    }
  } catch (error) {
    if (error?.message) {
      yield call(Alert.alert, '', error.message);
    }
    yield put(Actions.smsLoginFail(error));
  }
}

function* watchWebAuth() {
  yield takeLatest(Actions.WEB_AUTH_REQUEST, webAuth);
}

function* watchPasswordless() {
  yield takeLatest(Actions.SMS_PASSWORDLESS_REQUEST, smsPasswordless);
}

function* watchSmsLogin() {
  yield takeLatest(Actions.SMS_LOGIN_REQUEST, smsLogin);
}

export default function* signIn() {
  yield all([
    fork(watchWebAuth),
    fork(watchPasswordless),
    fork(watchSmsLogin),
  ]);
}
