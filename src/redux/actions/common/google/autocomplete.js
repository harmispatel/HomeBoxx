const NAME = 'COMMON';

export const GOOGLE_AUTOCOMPLETE_REQUEST = `${NAME}/GOOGLE_AUTOCOMPLETE_REQUEST`;
export const GOOGLE_AUTOCOMPLETE_SUCCESS = `${NAME}/GOOGLE_AUTOCOMPLETE_SUCCESS`;
export const GOOGLE_AUTOCOMPLETE_FAIL = `${NAME}/GOOGLE_AUTOCOMPLETE_FAIL`;
export const CLEAR_GOOGLE_AUTOCOMPLETE = `${NAME}/CLEAR_GOOGLE_AUTOCOMPLETE`;

export const googleAutocomplete = (input) => ({
  type: GOOGLE_AUTOCOMPLETE_REQUEST,
  input,
});

export const googleAutocompleteSuccess = (data) => ({
  type: GOOGLE_AUTOCOMPLETE_SUCCESS,
  data,
});

export const googleAutocompleteFail = (error) => ({
  type: GOOGLE_AUTOCOMPLETE_FAIL,
  error,
});

export const clearGoogleAutocomplete = () => ({
  type: CLEAR_GOOGLE_AUTOCOMPLETE,
});
