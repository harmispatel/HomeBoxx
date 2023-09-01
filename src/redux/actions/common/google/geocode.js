const NAME = 'COMMON';

export const FETCH_GOOGLE_PLACE_GEOCODE_REQUEST = `${NAME}/FETCH_GOOGLE_PLACE_GEOCODE_REQUEST`;
export const FETCH_GOOGLE_PLACE_GEOCODE_SUCCESS = `${NAME}/FETCH_GOOGLE_PLACE_GEOCODE_SUCCESS`;
export const FETCH_GOOGLE_PLACE_GEOCODE_FAIL = `${NAME}/FETCH_GOOGLE_PLACE_GEOCODE_FAIL`;

export const fetchGooglePlaceGeocode = (data) => ({
  type: FETCH_GOOGLE_PLACE_GEOCODE_REQUEST,
  data,
});

export const fetchGooglePlaceGeocodeSuccess = (data) => ({
  type: FETCH_GOOGLE_PLACE_GEOCODE_SUCCESS,
  data,
});

export const fetchGooglePlaceGeocodeFail = (error) => ({
  type: FETCH_GOOGLE_PLACE_GEOCODE_FAIL,
  error,
});
