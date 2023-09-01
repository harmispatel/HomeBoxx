import { all, fork } from 'redux-saga/effects';
import rehydrate from './rehydrate';
import notification from './notification';
import timer from './timer';
import google from './google';
import splash from './splash';
import permission from './permission';
import findUser from './findUser';

export default function* auth() {
  yield all([
    fork(rehydrate),
    fork(notification),
    fork(timer),
    fork(google),
    fork(splash),
    fork(permission),
    fork(findUser),
  ]);
}
