import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';

function* requestFindUser({ params }) {
  try {
    const response = yield call(api.fetchOtherUser, params);
    if (response?.status === 200) {
      const { data } = response;
      const [userData] = data;
      if (typeof userData !== 'undefined') {
        yield put(Actions.showNotification({ text: 'Homeboxx User Found', variant: 'success', icon: 'success' }));
      } else {
        yield put(Actions.showNotification({ text: 'Homeboxx User Not Found', variant: 'error', icon: 'error' }));
      }
      yield put(Actions.findUserSuccess(userData));
    } else {
      throw new Error('Failed to get a response');
    }
  } catch (error) {
    yield put(Actions.showNotification({ text: 'Failed to validate user.', variant: 'error', icon: 'error' }));
    yield put(Actions.findUserFail());
  }
}

function* watchRequestFindUser() {
  yield takeLatest(Actions.FIND_USER_REQUEST, requestFindUser);
}

export default function* findUser() {
  yield all([
    fork(watchRequestFindUser),
  ]);
}
