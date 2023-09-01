import { combineReducers } from 'redux';
import pair from './pair';
import list from './list';
import current from './current';
import secureCode from './secureCode';
import dailyCode from './dailyCode';
import lock from './lock';
import fetch from './fetch';
import events from './events';
import tempControl from './tempControl';

export default combineReducers({
  pair,
  list,
  current,
  secureCode,
  dailyCode,
  lock,
  fetch,
  events,
  tempControl,
});
