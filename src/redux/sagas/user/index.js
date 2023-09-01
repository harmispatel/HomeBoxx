import { all, fork } from 'redux-saga/effects';
import fetch from './fetch';
import update from './update';

export default function* user() {
  yield all([
    fork(fetch),
    fork(update),
  ]);
}
