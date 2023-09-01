import React from 'react';
import {
  TouchableOpacity, StyleSheet, Image,
} from 'react-native';
import { Text } from 'components';
import PropTypes from 'prop-types';
import {
  ThermometerIcon, AddressIcon, TrashIcon, ShareIcon,
} from 'images';
import { normalize } from 'utils/size';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  icon: {
    height: normalize(30),
    width: normalize(30),
    marginRight: normalize(20),
  },
});

const icons = {
  thermometer: ThermometerIcon,
  address: AddressIcon,
  share: ShareIcon,
  remove: TrashIcon,
};

const Action = ({
  label, icon, onPress, accent,
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Image source={icons[icon]} style={styles.icon} resizeMode="contain" />
    <Text color={accent ? 'red' : 'lightest'}>{label}</Text>
  </TouchableOpacity>
);

Action.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(['thermometer', 'address', 'share', 'remove']).isRequired,
  onPress: PropTypes.func.isRequired,
  accent: PropTypes.bool,
};

Action.defaultProps = {
  accent: false,
};

export default Action;
