import { all, fork } from 'redux-saga/effects';
import autocomplete from './autocomplete';
import detail from './detail';
import geocode from './geocode';

export default function* google() {
  yield all([
    fork(autocomplete),
    fork(detail),
    fork(geocode),
  ]);
}
