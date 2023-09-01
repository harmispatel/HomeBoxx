import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { normalize, getHeaderHeight } from 'utils/size';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import {
  PairedIcon, UnlockedIcon, LockedIcon, SuccessIcon, ErrorIcon, PlugIcon,
} from 'images';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: getHeaderHeight() - normalize(16),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(8),
    borderRadius: normalize(100),
    zIndex: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  warning: {
    backgroundColor: Colors.yellow,
  },
  error: {
    backgroundColor: Colors.red,
  },
  success: {
    backgroundColor: Colors.green,
  },
  icon: {
    height: normalize(20),
    width: normalize(20),
    marginLeft: normalize(10),
  },
});

const variants = Object.freeze({
  warning: styles.warning,
  error: styles.error,
  success: styles.success,
});

const icons = Object.freeze({
  paired: PairedIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  unlocked: UnlockedIcon,
  locked: LockedIcon,
  unplugged: PlugIcon,
});

const Notification = ({ text, icon, variant }) => (
  <View style={[styles.container, variants[variant]]}>
    <Text size="small" weight="semibold">{text}</Text>
    <Image source={icons[icon]} style={styles.icon} resizeMode="contain" />
  </View>
);

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(['paired', 'success', 'error', 'unlocked', 'locked', 'unplugged']).isRequired,
  variant: PropTypes.oneOf(['warning', 'success', 'error']).isRequired,
};

export default Notification;
