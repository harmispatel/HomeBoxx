import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import common from './common';
import box from './box';
import user from './user';
import notification from './notification';
import ad from './ad';

export default function* root() {
  yield all([
    fork(auth),
    fork(common),
    fork(box),
    fork(user),
    fork(notification),
    fork(ad),
  ]);
}
