import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';

function* listAds() {
  try {
    const response = yield call(api.listAds);
    if (response?.data) {
      yield put(Actions.listAdsSuccess(response.data));
    }
  } catch (error) {
    yield put(Actions.listAdsFail(error));
  }
}

function* watchListAds() {
  yield takeLatest(Actions.LIST_ADS_REQUEST, listAds);
}

export default function* list() {
  yield all([
    fork(watchListAds),
  ]);
}
