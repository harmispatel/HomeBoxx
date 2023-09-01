import React, { useEffect } from 'react';
import AppNavigator from 'navigators/app';
import { LogBox } from 'react-native';
import SplashScreen from 'containers/SplashScreen';
import { useDispatch, useSelector } from 'react-redux';
import Selectors from 'selectors';
import Actions from 'actions';
import { Notification } from 'components';
import CONFIG from 'react-native-config';
import NetInfo from '@react-native-community/netinfo';
import { OneSignal } from 'react-native-onesignal';

// TODO: Warning caused by Label and react-native-formik
// Remove this after resolving the warnings.
LogBox.ignoreAllLogs([
  'Warning: componentWillReceiveProps',
  'Warning: React.createFactory()',
  'FlatList: Calling `getNode()`',
  'Non-serializable values',
  'ReactNative.NativeModules',
  'Remote debugger',
]);

const App = () => {
  const dispatch = useDispatch();
  const isSplashed = useSelector(Selectors.isSplashed);
  const isRehydrated = useSelector(Selectors.isStoreRehydrated);
  const isNotificationVisible = useSelector(Selectors.isNotificationVisible);
  const notificationData = useSelector(Selectors.getNotificationData);
  const isConnected = useSelector(Selectors.isNetworkConnected);

  const onIds = (data) => dispatch(Actions.setPlayerId(data.userId));
  const onReceived = () => dispatch(Actions.setNotification());
  const onOpened = () => dispatch(Actions.setNotification());

  useEffect(() => {

    if (isSplashed) {
        OneSignal.initialize(CONFIG.ONESIGNAL_APP_ID);
      }

    OneSignal.Debug.setLogLevel(2);
    OneSignal.Notifications.addEventListener('received', onReceived);
    OneSignal.Notifications.addEventListener('opened', onOpened);
    OneSignal.Notifications.addEventListener('ids', onIds);
    return () => {
      OneSignal.Notifications.removeEventListener('received', onReceived);
      OneSignal.Notifications.removeEventListener('opened', onOpened);
      OneSignal.Notifications.removeEventListener('ids', onIds);
    };
  }, [isSplashed]);

  useEffect(() => {
    const toggleNetworkState = (state) => {
      if (state.isInternetReachable) {
        dispatch(Actions.toggleNetworkConnected());
      } else {
        dispatch(Actions.toggleNetworkDisconnected());
      }
    };
    NetInfo.addEventListener(toggleNetworkState);
    return () => {
      NetInfo.removeEventListener(toggleNetworkState);
    };
  }, []);

  return (
    <>
      {isRehydrated && !isSplashed && <SplashScreen />}
      {isRehydrated && isSplashed && <AppNavigator />}
      {isConnected && isNotificationVisible && <Notification {...notificationData} />}
      {isRehydrated && isSplashed && !isConnected && (
        <Notification
          text="No internet connection"
          
          icon="error"
          variant="error"
        />
      )}
    </>
  );
};

export default App;
