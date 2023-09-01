import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Colors, { colorsProps } from 'themes/colors';
import { normalize } from 'utils/size';

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(4),
    alignItems: 'center',
  },
  border: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  loading: {
    paddingVertical: normalize(2),
  },
});

const Button = ({
  children, isLoading, bg, onPress, variant, style,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={isLoading}
    style={[
      styles.container,
      { backgroundColor: Colors[bg] },
      variant === 'border' && styles.border,
      style,
    ]}
  >
    {!isLoading && children}
    {isLoading && (
      <ActivityIndicator
        style={styles.loading}
        color={bg !== 'light' ? Colors.light : Colors.dark}
      />
    )}
  </TouchableOpacity>
);

Button.propTypes = {
  children: PropTypes.element.isRequired,
  onPress: PropTypes.func.isRequired,
  bg: PropTypes.oneOf(colorsProps),
  isLoading: PropTypes.bool,
  variant: PropTypes.oneOf(['border', 'default']),
  style: PropTypes.any,
};

Button.defaultProps = {
  bg: 'light',
  isLoading: false,
  variant: 'default',
  style: {},
};

export default Button;
