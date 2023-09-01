import { all, fork } from 'redux-saga/effects';
import pair from './pair';
import watcher from './watcher';
import list from './list';
import edit from './edit';
import secureCode from './secureCode';
import dailyCode from './dailyCode';
import unpair from './unpair';
import lock from './lock';
import simulate from './simulate';
import fetch from './fetch';
import events from './events';
import tempControl from './tempControl';
import shareCode from './shareCode';
import share from './share';

export default function* box() {
  yield all([
    fork(pair),
    fork(watcher),
    fork(list),
    fork(edit),
    fork(secureCode),
    fork(dailyCode),
    fork(unpair),
    fork(lock),
    fork(simulate),
    fork(fetch),
    fork(events),
    fork(tempControl),
    fork(shareCode),
    fork(share),
  ]);
}
