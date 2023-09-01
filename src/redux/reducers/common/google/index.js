import { combineReducers } from 'redux';
import autocomplete from './autocomplete';
import detail from './detail';
import geocode from './geocode';

export default combineReducers({
  autocomplete,
  detail,
  geocode,
});
