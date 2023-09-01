import {
  takeLatest, all, fork, put, call, take,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';
import CONFIG from 'react-native-config';

function* fetchGooglePlaceDetail({ data, callback }) {
  try {
    const params = {
      key: CONFIG.GOOGLE_MAPS_API_KEY,
      place_id: data.id,
    };
    const response = yield call(api.fetchGooglePlaceDetail, params);
    const json = response && response.data;
    if (json) {
      const { result } = json;
      yield put(Actions.fetchGooglePlaceGeocode(result.geometry.location));
      const { data: postcode } = yield take([
        Actions.FETCH_GOOGLE_PLACE_GEOCODE_SUCCESS,
        Actions.FETCH_GOOGLE_PLACE_GEOCODE_FAIL,
      ]);
      const formatted = {
        id: result.place_id,
        name: data.title,
        street: data.description,
        coordinates: result.geometry.location,
        postcode: postcode ? postcode.long_name : null,
      };
      yield put(Actions.fetchGooglePlaceDetailSuccess(formatted));
      yield put(Actions.clearGoogleAutocomplete());
      if (callback) {
        const city = result.address_components.find((component) => component.types.includes('locality'));
        yield call(callback, {
          ...formatted,
          city: typeof city !== 'undefined' ? city.long_name : '',
        });
      }
    }
  } catch (error) {
    yield put(Actions.fetchGooglePlaceDetailFail(error));
    yield put(Actions.fetchSourceCodeFail(error));
  }
}

function* watchFetchGooglePlaceDetail() {
  yield takeLatest(Actions.FETCH_GOOGLE_PLACE_DETAIL_REQUEST, fetchGooglePlaceDetail);
}

export default function* detail() {
  yield all([
    fork(watchFetchGooglePlaceDetail),
  ]);
}
