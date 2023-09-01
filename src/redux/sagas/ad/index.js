import { all, fork } from 'redux-saga/effects';
import list from './list';

export default function* notification() {
  yield all([
    fork(list),
  ]);
}
