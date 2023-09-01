import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from 'containers/Dashboard';
import Pair from 'containers/Dashboard/Pair';
import PairRequest from 'containers/Dashboard/Pair/Request';
import Paired from 'containers/Dashboard/Pair/Paired';
import SearchAddress from 'containers/Dashboard/Common/SearchAddress';
import EditBox from 'containers/Dashboard/Edit';
import EditPIN from 'containers/Dashboard/Edit/EditPIN';
import AboutUs from 'containers/Dashboard/Common/AboutUs';
import AllActivity from 'containers/Dashboard/Box/AllActivity';
import Notification from 'containers/Dashboard/Notification';
import ActivityFilters from 'containers/Dashboard/Box/ActivityFilters';
import SimulateEvent from 'containers/Dashboard/Common/SimulateEvent';
import ShareSecureCode from 'containers/Dashboard/Box/ShareSecureCode';
import ShareBox from 'containers/Dashboard/Box/ShareBox';

const Stack = createStackNavigator();

const DashStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Dashboard">
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Pair" component={Pair} />
    <Stack.Screen name="PairRequest" component={PairRequest} />
    <Stack.Screen name="Paired" component={Paired} />
    <Stack.Screen name="SearchAddress" component={SearchAddress} />
    <Stack.Screen name="EditBox" component={EditBox} />
    <Stack.Screen name="EditPIN" component={EditPIN} />
    <Stack.Screen name="AboutUs" component={AboutUs} />
    <Stack.Screen name="AllActivity" component={AllActivity} />
    <Stack.Screen name="ActivityFilters" component={ActivityFilters} />
    <Stack.Screen name="Notification" component={Notification} />
    <Stack.Screen name="SimulateEvent" component={SimulateEvent} />
    <Stack.Screen name="ShareSecureCode" component={ShareSecureCode} />
    <Stack.Screen name="ShareBox" component={ShareBox} />
  </Stack.Navigator>
);

export default DashStack;
