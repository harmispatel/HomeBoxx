import { combineReducers } from 'redux';
import token from './token';
import player from './player';
import notification from './notification';

export default combineReducers({
  token,
  player,
  notification,
});
