import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Selectors from 'selectors';
import Drawer from '../drawer';
import Auth from '../auth';
import { navigationRef } from './AppNavigationService';

const App = () => {
  const token = useSelector(Selectors.getAccessToken);
  const user = useSelector(Selectors.getUser);
  const { user_metadata: userMetadata } = user;
  return (
    <NavigationContainer ref={navigationRef}>
      {(!token || !(user?.name) || !(userMetadata?.pin))
        ? <Auth />
        : <Drawer />}
    </NavigationContainer>
  );
};

export default App;
