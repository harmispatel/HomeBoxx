import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'components';
import { normalize } from 'utils/size';
import Colors from 'themes/colors';
import {
  AddBoxIcon, ChangePinIcon, TermsIcon, AboutUsIcon, NextIcon,
} from 'images';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(10),
  },
  icon: {
    width: normalize(25),
    height: normalize(25),
  },
  label: {
    paddingHorizontal: normalize(20),
  },
  borderTop: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

const icons = Object.freeze({
  add: AddBoxIcon,
  pin: ChangePinIcon,
  terms: TermsIcon,
  about: AboutUsIcon,
});

const MenuItem = ({
  icon, label, borderTop, onPress,
}) => (
  <TouchableOpacity style={[styles.container, borderTop && styles.borderTop]} onPress={onPress}>
    <Image source={icons[icon]} style={styles.icon} resizeMode="contain" />
    <Text color="darkest" flex style={styles.label}>{label}</Text>
    <Image source={NextIcon} style={styles.icon} resizeMode="contain" />
  </TouchableOpacity>
);

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(['add', 'pin', 'terms', 'about']).isRequired,
  borderTop: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

MenuItem.defaultProps = {
  borderTop: false,
};

export default MenuItem;
