import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import Colors from 'themes/colors';
import { normalize } from 'utils/size';
import { Text } from 'components';
import { ThermometerIcon } from 'images';
import PropTypes from 'prop-types';
import { formatTemperature } from 'utils/box';

const styles = StyleSheet.create({
  mainContainer: {
    padding: 0,
    paddingHorizontal: normalize(20),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: normalize(30),
    width: normalize(30),
    marginVertical: normalize(10),
  },
  text: {
    margin: normalize(10),
  },
  separator: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.greyest,
    height: '100%',
    marginHorizontal: normalize(30),
  },
});

const BoxTemperature = ({
  currentBox, style, isVisible,
}) => {
  if (!isVisible || !currentBox) return null;
  return (
    <View style={[...style, styles.mainContainer]}>
      <View style={styles.rowContainer}>
        <View style={styles.colContainer}>
          <Text weight="bold" size="regular" style={styles.text}>INSIDE BOX</Text>
          <View style={styles.rowContainer}>
            <Image
              style={styles.icon}
              source={ThermometerIcon}
            />
            <Text weight="bold" size="xlarge" style={styles.text}>
              {currentBox.lastTemperature ? `${formatTemperature(currentBox.lastTemperature)} °C` : 'N/A'}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.colContainer}>
          <Text weight="bold" size="regular" style={styles.text}>OUTSIDE</Text>
          <View style={styles.rowContainer}>
            <Image
              style={styles.icon}
              source={ThermometerIcon}
            />
            <Text weight="bold" size="xlarge" style={styles.text}>
              {currentBox.outsideTemperature?.celsius ? `${formatTemperature(currentBox.outsideTemperature.celsius)} °C` : 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

BoxTemperature.propTypes = {
  currentBox: PropTypes.object,
  style: PropTypes.array,
  isVisible: PropTypes.bool,
};

BoxTemperature.defaultProps = {
  currentBox: null,
  style: [],
  isVisible: true,
};

export default BoxTemperature;
