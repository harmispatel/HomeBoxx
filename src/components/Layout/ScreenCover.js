import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from 'themes/colors';
import { PropTypes } from 'prop-types';

const styles = StyleSheet.create({
  screenCover: {
    backgroundColor: `${Colors.darkest}`,
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.75,
  },
});

const ScreenCover = ({ children, visible, coverSlider }) => {
  if (!visible) return null;
  return (
    <View style={[styles.screenCover, { zIndex: coverSlider ? 10 : 2 }]}>
      {children && children}
    </View>
  );
};

ScreenCover.propTypes = {
  children: PropTypes.object,
  visible: PropTypes.bool,
  coverSlider: PropTypes.bool,
};

ScreenCover.defaultProps = {
  children: null,
  visible: true,
  coverSlider: false,
};

export default ScreenCover;
