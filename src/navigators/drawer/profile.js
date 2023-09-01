import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from 'containers/Profile';
import EnterCode from 'containers/Auth/EnterCode';

const Stack = createStackNavigator();

const DashStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Profile">
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="EnterCode" component={EnterCode} />
  </Stack.Navigator>
);

export default DashStack;
