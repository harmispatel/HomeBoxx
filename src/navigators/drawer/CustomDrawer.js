import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  StyleSheet, TouchableOpacity, View, Image, Linking,
} from 'react-native';
import { normalize } from 'utils/size';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from 'themes/colors';
import { Text, Button, Avatar } from 'components';
import { PhoneDarkIcon, EditIcon, LogoutIcon } from 'images';
import PropTypes from 'prop-types';
import { PRIVACY_POLICY } from 'utils/about';
import MenuItem from './MenuItem';

const styles = StyleSheet.create({
  header: {
    padding: normalize(20),
  },
  back: {
    height: normalize(30),
    width: normalize(30),
  },
  flex: {
    flex: 1,
  },
  buttonContainer: {
    padding: normalize(20),
  },
  menu: {
    flex: 1,
    padding: normalize(20),
  },
  phoneNumber: {
    marginBottom: normalize(30),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
    borderRadius: normalize(5),
    padding: normalize(20),
  },
  others: {
    marginTop: normalize(20),
    marginBottom: normalize(10),
  },
  editContainer: {
    position: 'absolute',
    right: 0,
  },
  edit: {
    width: normalize(20),
    height: normalize(20),
  },
  profile: {
    alignItems: 'center',
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(20),
  },
  number: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: normalize(20),
  },
  phone: {
    width: normalize(25),
    height: normalize(25),
    marginRight: normalize(10),
  },
  logout: {
    position: 'absolute',
    right: 0,
    width: normalize(20),
    height: normalize(20),
  },
});

const CustomDrawer = ({
  signOut, user, navigation, ...props
}) => {
  const onLogout = () => {
    navigation.closeDrawer();
    signOut();
  };

  const closeDrawer = () => {
    navigation.closeDrawer();
  };

  const { phone_number: phoneNumber } = user;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={closeDrawer}>
          <Icon name="arrow-left" color={Colors.darkest} size={normalize(30)} />
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        <View>
          <View style={styles.profile}>
            <Avatar source={null} />
            <View style={styles.name}>
              <Text color="dark" weight="bold" size="xlarge" centered flex>{user?.name}</Text>
              <TouchableOpacity
                style={styles.editContainer}
                onPress={() => navigation.jumpTo('ProfileStack')}
              >
                <Image
                  source={EditIcon}
                  style={styles.edit}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.phoneNumber}>
            <Text color="dark" weight="bold" size="large">Mobile Phone</Text>
            <View style={styles.number}>
              <Image source={PhoneDarkIcon} style={styles.phone} resizeMode="contain" />
              <Text color="darker" weight="bold">{phoneNumber || '-'}</Text>
            </View>
          </View>
        </View>
        <MenuItem
          label="Add New Homeboxx"
          icon="add"
          borderTop
          onPress={() => {
            closeDrawer();
            navigation.navigate('Pair');
          }}
        />
        <MenuItem
          label="Change PIN"
          icon="pin"
          onPress={() => {
            closeDrawer();
            navigation.navigate('EditPIN');
          }}
        />
        <Text weight="bold" color="dark" size="large" style={styles.others}>Others</Text>
        <MenuItem
          label="Terms & Policies"
          icon="terms"
          borderTop
          onPress={() => {
            closeDrawer();
            Linking.openURL(PRIVACY_POLICY);
          }}
        />
        <MenuItem
          label="About Us"
          icon="about"
          onPress={() => {
            closeDrawer();
            navigation.navigate('AboutUs');
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button variant="border" bg="white" onPress={onLogout}>
          <View flexDirection="row">
            <Text color="dark" weight="bold" flex centered>Logout</Text>
            <Image
              source={LogoutIcon}
              resizeMode="contain"
              style={styles.logout}
            />
          </View>
        </Button>
      </View>
    </DrawerContentScrollView>
  );
};

CustomDrawer.propTypes = {
  signOut: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object,
};

CustomDrawer.defaultProps = {
  user: {},
};

export default CustomDrawer;
