import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from 'themes/colors';
import { normalize, getScreenWidth } from 'utils/size';
import { Text } from 'components';
import { TemperatureControlOnIcon, TemperatureControlOffIcon } from 'images';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Selectors from 'selectors';
import Actions from 'actions';
import { formatTemperature } from 'utils/box';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
  },
  tooltipContainer: {
    backgroundColor: Colors.greyest,
    padding: normalize(20),
    marginHorizontal: 0,
    marginTop: 0,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: normalize(15),
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  icon: {
    resizeMode: 'contain',
    height: normalize(30),
    width: normalize(30),
  },
  spacer: {
    flex: 1,
  },
  toggleButton: {
    backgroundColor: `${Colors.dark}60`,
    borderWidth: 2,
    borderRadius: normalize(10),
    borderColor: Colors.greyest,
    alignItems: 'center',
    justifyContent: 'center',
    width: getScreenWidth() * 0.3,
    height: normalize(60),
  },
  buttonEnabled: {
    backgroundColor: Colors.greyest,
    borderColor: Colors.dark,
  },
  buttonLoading: {
    opacity: 0.4,
  },
});

const TemperatureControl = ({
  currentBox, style, isVisible,
}) => {
  if (!isVisible || !currentBox) return null;

  const dispatch = useDispatch();
  const tempControlState = useSelector(Selectors.getTempControlState);
  const toggleTempControl = () => {
    const { id: boxId } = currentBox;
    if (!tempControlState.isOn) {
      // It might be better to let the API check the power supply status instead of here.
      // currentBox might be outdated information
      if (!currentBox.powerSupplyOn) {
        dispatch(Actions.showNotification({
          text: 'Plug in to use temperature control',
          variant: 'error',
          icon: 'unplugged',
        }));
        return;
      }
    }
    dispatch(Actions.toggleTempControl(boxId));
  };


  return (
    <>
      <View style={[...style, styles.mainContainer]}>
        <View style={styles.textContainer}>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Image
                source={tempControlState.isOn
                  ? TemperatureControlOnIcon
                  : TemperatureControlOffIcon}
                style={styles.icon}
              />
              <Text
                centered
                weight="bold"
                size="small"
                color={tempControlState.isOn ? 'green' : 'red'}
              >
                {tempControlState.isOn ? 'ON' : 'OFF'}
              </Text>
            </View>
            <Text weight="bold" size="small">
              {`Temperature Control (${formatTemperature(currentBox.desiredTemperature)}°C)`}
            </Text>
          </View>
        </View>
        <View style={[styles.buttonContainer]}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              tempControlState.isOn && styles.buttonEnabled]}
            onPress={toggleTempControl}
          >

            <Text centered>
              <Text weight="bold" size="large">
                TURN
              </Text>
              <Text weight="bold" size="large" color={tempControlState.isOn ? 'red' : 'lightest'}>
                {tempControlState.isOn ? ' OFF' : ' ON'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

TemperatureControl.propTypes = {
  currentBox: PropTypes.object,
  style: PropTypes.array,
  isVisible: PropTypes.bool,
};

TemperatureControl.defaultProps = {
  currentBox: null,
  style: [],
  isVisible: true,
};

export default TemperatureControl;
