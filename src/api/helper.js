import toUpper from 'lodash/toUpper';
import axios from 'axios';
import { fullUrlFrom } from './url';

const fetchUrl = (method, endpoint, params = {}) => {
  if (toUpper(method) === 'GET') {
    return axios({
      method,
      params,
      url: fullUrlFrom(endpoint),
    });
  }
  return axios({
    method,
    data: params,
    url: fullUrlFrom(endpoint),
  });
};

const api = {
  get(endpoint, params) {
    return fetchUrl('get', endpoint, params);
  },
  post(endpoint, params) {
    return fetchUrl('post', endpoint, params);
  },
  put(endpoint, params) {
    return fetchUrl('put', endpoint, params);
  },
  patch(endpoint, params) {
    return fetchUrl('patch', endpoint, params);
  },
  delete(endpoint, params) {
    return fetchUrl('delete', endpoint, params);
  },
};

export default api;
