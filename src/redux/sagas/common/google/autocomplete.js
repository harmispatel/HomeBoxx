import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';
import CONFIG from 'react-native-config';

function* googleAutocomplete({ input }) {
  try {
    const params = {
      key: CONFIG.GOOGLE_MAPS_API_KEY,
      types: 'address',
      input,
    };
    const response = yield call(api.googleAutocomplete, params);
    const json = response && response.data;
    if (json) {
      const { predictions } = json;
      const data = predictions.map((prediction) => ({
        id: prediction.place_id,
        title: prediction.structured_formatting.main_text,
        subtitle: prediction.structured_formatting.secondary_text,
        description: prediction.description,
      }));
      yield put(Actions.googleAutocompleteSuccess(data));
    }
  } catch (error) {
    yield put(Actions.googleAutocompleteFail(error));
  }
}

function* watchGoogleAutocomplete() {
  yield takeLatest(Actions.GOOGLE_AUTOCOMPLETE_REQUEST, googleAutocomplete);
}

export default function* google() {
  yield all([
    fork(watchGoogleAutocomplete),
  ]);
}
