import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';
import CONFIG from 'react-native-config';

function* fetchGooglePlaceGeocode({ data }) {
  try {
    const params = {
      key: CONFIG.GOOGLE_MAPS_API_KEY,
      latlng: `${data.lat},${data.lng}`,
    };
    const response = yield call(api.fetchGooglePlaceGeocode, params);
    const json = response && response.data;
    if (json) {
      const { results } = json;
      const postcodes = results.map((result) => {
        const { address_components: addressComponents } = result;
        const postcode = addressComponents.find((component) => component.types.includes('postal_code'));
        if (typeof postcode === 'undefined') {
          return '';
        }
        return postcode;
      });
      const postcode = postcodes.filter((item) => item);
      if (postcode[0]) {
        yield put(Actions.fetchGooglePlaceGeocodeSuccess(postcode[0]));
      } else {
        yield put(Actions.fetchGooglePlaceGeocodeFail());
      }
    }
  } catch (error) {
    yield put(Actions.fetchGooglePlaceGeocodeFail(error));
    yield put(Actions.fetchSourceCodeFail(error));
  }
}

function* watchFetchGooglePlaceGeocode() {
  yield takeLatest(Actions.FETCH_GOOGLE_PLACE_GEOCODE_REQUEST, fetchGooglePlaceGeocode);
}

export default function* detail() {
  yield all([
    fork(watchFetchGooglePlaceGeocode),
  ]);
}
