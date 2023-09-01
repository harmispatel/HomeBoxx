import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Selectors from 'selectors';
import PhoneNumber from 'containers/Auth/PhoneNumber';
import EnterCode from 'containers/Auth/EnterCode';
import EnterName from 'containers/Auth/Credentials/EnterName';
import EnterPIN from 'containers/Auth/Credentials/EnterPIN';
import NoConnection from 'containers/Auth/NoConnection';

const Stack = createStackNavigator();

const Auth = () => {
  const token = useSelector(Selectors.getAccessToken);
  const user = useSelector(Selectors.getUser);
  const isConnected = useSelector(Selectors.isNetworkConnected);
  const { user_metadata: userMetadata } = user;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isConnected && <Stack.Screen name="PhoneNumber" component={NoConnection} /> }
      {isConnected && !token && (
      <>
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        <Stack.Screen name="EnterCode" component={EnterCode} />
      </>
      )}
      {isConnected && !user?.name && <Stack.Screen name="EnterName" component={EnterName} />}
      {isConnected && !userMetadata?.pin && <Stack.Screen name="EnterPIN" component={EnterPIN} />}
    </Stack.Navigator>
  );
};

export default Auth;
