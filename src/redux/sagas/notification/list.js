import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

function* listNotifications({ callback }) {
  try {
    const params = {
      before: moment().toISOString(),
      last: 10,
    };
    const response = yield call(api.listNotifications, params);
    if (response?.data) {
      yield put(Actions.listNotificationsSuccess(response.data));
      if (!isEmpty(response.data)) {
        yield call(callback);
      }
    }
  } catch (error) {
    yield put(Actions.listNotificationsFail(error));
  }
}

function* paginateNotifications({ last, callback }) {
  try {
    const params = {
      before: last.createdAt,
      last: 10,
    };
    const response = yield call(api.listNotifications, params);
    if (response?.data) {
      yield put(Actions.paginateNotificationsSuccess(response.data));
      if (isEmpty(response.data)) {
        yield call(callback);
      }
    }
  } catch (error) {
    yield put(Actions.paginateNotificationsFail(error));
  }
}

function* watchListNotifications() {
  yield takeLatest(Actions.LIST_NOTIFICATIONS_REQUEST, listNotifications);
}

function* watchPaginateNotifications() {
  yield takeLatest(Actions.PAGINATE_NOTIFICATIONS_REQUEST, paginateNotifications);
}

export default function* list() {
  yield all([
    fork(watchListNotifications),
    fork(watchPaginateNotifications),
  ]);
}
