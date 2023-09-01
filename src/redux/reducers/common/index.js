import { combineReducers } from 'redux';
import rehydrate from './rehydrate';
import loading from './loading';
import splash from './splash';
import notification from './notification';
import timer from './timer';
import google from './google';
import network from './network';
import findUser from './findUser';

export default combineReducers({
  rehydrate,
  loading,
  splash,
  notification,
  timer,
  google,
  network,
  findUser,
});
