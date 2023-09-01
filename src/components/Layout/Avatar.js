import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { normalize } from 'utils/size';
import PropTypes from 'prop-types';
import { DefaultAvatar } from 'images';

const styles = StyleSheet.create({
  container: {
    width: normalize(100),
    height: normalize(100),
    overflow: 'hidden',
    borderRadius: normalize(50),
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
});

const Avatar = ({ source }) => (
  <View style={styles.container}>
    <Image source={source ? { uri: source } : DefaultAvatar} style={styles.image} resizeMode="contain" />
  </View>
);

Avatar.propTypes = {
  source: PropTypes.string,
};

Avatar.defaultProps = {
  source: null,
};

export default Avatar;
