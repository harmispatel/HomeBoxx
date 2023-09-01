import React from 'react';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import { LockAnimation, TempControlAnimation } from 'animations';

const types = Object.freeze({
  lock: LockAnimation,
  tempControl: TempControlAnimation,
});

const typeColorFilters = Object.freeze({
  lock: [{
    keypath: 'Layer 2',
    color: '#FFFFFF',
  }],
  tempControl: null,
});

const Animation = ({ type }) => (
  <LottieView
    source={types[type]}
    colorFilters={typeColorFilters[type]}
    autoPlay
    loop
  />
);

Animation.propTypes = {
  type: PropTypes.oneOf(['lock', 'tempControl']).isRequired,
};


export default Animation;
