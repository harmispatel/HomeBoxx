import {takeLatest, all, fork, call} from 'redux-saga/effects';
import Actions from 'actions';
// import OneSignal from 'react-native-onesignal';

function* finishSplash() {
  try {
    // yield {
    //   appId: 'd60b4641-99b2-4355-9672-6134214b9ce6'
    // };
    
    console.log('OneSignal operation completed successfully');
  } catch (error) {
    console.error('An error occurred during OneSignal operation:', error);
  }
}

function* watchFinishSplash() {
  yield takeLatest(Actions.FINISH_SPLASH, finishSplash);
}

export default function* splash() {
  yield all([
    fork(watchFinishSplash),
  ]);
}
