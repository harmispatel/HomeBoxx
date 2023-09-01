import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { getScreenWidth } from 'utils/size';
import { useDispatch, useSelector } from 'react-redux';
import Actions from 'actions';
import Selectors from 'selectors';
import ProfileStack from './profile';
import DashStack from './dashboard';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  drawer: {
    width: getScreenWidth(),
  },
});

const DrawerStack = () => {
  const dispatch = useDispatch();
  const user = useSelector(Selectors.getUser);

  const signOut = () => dispatch(Actions.signOut());

  useEffect(() => {
    dispatch(Actions.fetchUser());
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="DashStack"
      drawerStyle={styles.drawer}
      drawerContent={(props) => <CustomDrawer signOut={signOut} user={user} {...props} />}
    >
      <Drawer.Screen name="DashStack" component={DashStack} />
      <Drawer.Screen name="ProfileStack" component={ProfileStack} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
