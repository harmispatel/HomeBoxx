import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { normalize } from 'utils/size';
import { Text } from 'components';
import { LocationIcon } from 'images';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colContainer: {
    flexDirection: 'column',
    marginVertical: normalize(10),
  },
  icon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: normalize(10),
  },
  addressText: {
    marginHorizontal: normalize(20),
  },
});

const combineAddress = (address, postCode, city) => (
  `${address || ''},${postCode ? ' ' : ''}${postCode || ''} ${city || ''}`
);

const BoxAddress = ({
  navigation, currentBox, style, isVisible,
}) => {
  if (!isVisible) return null;
  if (!currentBox) {
    return (
      <View style={style}>
        <Image
          style={styles.icon}
          height={normalize(35)}
          width={normalize(35)}
          source={LocationIcon}
        />
        <Text size="small" weight="semibold" centered>Your Homeboxx address will appear here...</Text>
      </View>
    );
  }
  const { ownerAddress: address, ownerPostalCode: postCode, ownerCity: city } = currentBox;
  if (!address && !postCode && !city) {
    return (
      <TouchableOpacity style={style} onPress={() => { navigation.navigate('EditBox', { box: currentBox }); }}>
        <Image
          style={styles.icon}
          height={normalize(35)}
          width={normalize(35)}
          source={LocationIcon}
        />
        <Text size="small" weight="semibold" centered>{'Homeboxx address is not set.\nTap here to set'}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={style}>
      <View style={styles.rowContainer}>
        <Text size="large" weight="bold">Box Address</Text>
      </View>
      <View style={styles.rowContainer}>
        <Image
          style={styles.icon}
          height={normalize(30)}
          width={normalize(30)}
          source={LocationIcon}
        />
        <View style={styles.colContainer}>
          <Text size="regular" weight="bold" flex style={styles.addressText}>
            {currentBox.name}
          </Text>
          <Text size="small" weight="regular" flex style={styles.addressText}>
            {combineAddress(address, postCode, city)}
          </Text>
        </View>
      </View>
    </View>
  );
};

BoxAddress.propTypes = {
  navigation: PropTypes.object.isRequired,
  currentBox: PropTypes.object,
  style: PropTypes.array,
  isVisible: PropTypes.bool,
};

BoxAddress.defaultProps = {
  currentBox: null,
  style: [],
  isVisible: true,
};

export default BoxAddress;
