import CONFIG from 'react-native-config';

export const DEFAULT_COUNTRY_CODE = '+47';
export const ALLOWED_COUNTRIES = CONFIG.ENVIRONMENT === 'staging' ? ['MY', 'NO', 'SE'] : ['NO', 'SE'];
