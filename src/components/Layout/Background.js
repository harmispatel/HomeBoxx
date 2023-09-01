import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Background as Bg } from 'images';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Background = ({ children }) => (
  <ImageBackground source={Bg} style={styles.container}>
    {children}
  </ImageBackground>
);

Background.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Background;
