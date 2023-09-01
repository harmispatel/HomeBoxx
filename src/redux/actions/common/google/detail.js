const NAME = 'COMMON';

export const FETCH_GOOGLE_PLACE_DETAIL_REQUEST = `${NAME}/FETCH_GOOGLE_PLACE_DETAIL_REQUEST`;
export const FETCH_GOOGLE_PLACE_DETAIL_SUCCESS = `${NAME}/FETCH_GOOGLE_PLACE_DETAIL_SUCCESS`;
export const FETCH_GOOGLE_PLACE_DETAIL_FAIL = `${NAME}/FETCH_GOOGLE_PLACE_DETAIL_FAIL`;

export const fetchGooglePlaceDetail = (data, callback) => ({
  type: FETCH_GOOGLE_PLACE_DETAIL_REQUEST,
  data,
  callback,
});

export const fetchGooglePlaceDetailSuccess = (data) => ({
  type: FETCH_GOOGLE_PLACE_DETAIL_SUCCESS,
  data,
});

export const fetchGooglePlaceDetailFail = (error) => ({
  type: FETCH_GOOGLE_PLACE_DETAIL_FAIL,
  error,
});
