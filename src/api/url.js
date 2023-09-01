import CONFIG from 'react-native-config';

export const fullUrlFrom = (endpoint) => {
  if (endpoint.includes('http')) {
    return endpoint;
  }
  const baseUrl = CONFIG.SERVER_URL;
  const fullUrl = baseUrl + endpoint;
  return fullUrl;
};
