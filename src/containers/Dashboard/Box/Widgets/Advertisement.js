import React from 'react';
import {
  TouchableOpacity, Image, StyleSheet, Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { normalize } from 'utils/size';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginBottom: normalize(20),
  },
  image: {
    aspectRatio: 3 / 2,
  },
});

const Advertisement = ({ ads, isVisible }) => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  if (!isVisible) return null;

  return (
    <>
      {ads.map((ad) => (
        <TouchableOpacity style={styles.container} key={ad.id} onPress={() => openLink(ad.url)}>
          <Image source={{ uri: ad.imageUrl }} style={styles.image} resizeMode="cover" />
        </TouchableOpacity>
      ))}
    </>
  );
};

Advertisement.propTypes = {
  ads: PropTypes.array.isRequired,
  isVisible: PropTypes.bool,
};

Advertisement.defaultProps = {
  isVisible: false,
};

export default Advertisement;
