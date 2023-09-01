const NAME = 'AD';

export const LIST_ADS_REQUEST = `${NAME}/LIST_ADS_REQUEST`;
export const LIST_ADS_SUCCESS = `${NAME}/LIST_ADS_SUCCESS`;
export const LIST_ADS_FAIL = `${NAME}/LIST_ADS_FAIL`;

export const listAds = () => ({
  type: LIST_ADS_REQUEST,
});

export const listAdsSuccess = (data) => ({
  type: LIST_ADS_SUCCESS,
  data,
});

export const listAdsFail = (error) => ({
  type: LIST_ADS_FAIL,
  error,
});
