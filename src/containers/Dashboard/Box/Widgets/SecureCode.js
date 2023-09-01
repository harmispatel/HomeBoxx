import React, { useEffect } from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import { Text, Button, SecureCodeDisplay } from 'components';
import { normalize } from 'utils/size';
import { useDispatch } from 'react-redux';
import Actions from 'actions';
import PropTypes from 'prop-types';
import { ShareIcon, TruckIcon } from 'images';
import Colors from 'themes/colors';
import { SecureCodeTypes } from 'utils/secureCode';

const styles = StyleSheet.create({
  mainContainer: {
    padding: normalize(20),
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerIcon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: normalize(20),
    width: normalize(20),
    marginRight: normalize(10),
  },
  shareIcon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: normalize(25),
    width: normalize(25),
    marginRight: normalize(15),
    tintColor: Colors.dark,
  },
  headerIcon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: normalize(35),
    width: normalize(35),
    marginRight: normalize(15),
    tintColor: Colors.white,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(10),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(10),
    borderRadius: normalize(30),
    paddingHorizontal: normalize(30),
  },
});


const SecureCode = ({
  currentBox, style, isVisible, navigation, type,
}) => {
  if (!isVisible || !currentBox) return null;
  const dispatch = useDispatch();
  const fetchSecureCode = () => {
    if (type === SecureCodeTypes.fiveMinutes) {
      dispatch(Actions.fetchSecureCode(currentBox.id));
    } else {
      dispatch(Actions.fetchDailyCode(currentBox.id));
    }
  };
  useEffect(() => {
    fetchSecureCode();
  }, [currentBox]);

  let backgroundColor = Colors.dark;
  let headerText = 'ONE TIME PASSCODE';
  let subText = '';
  let headerIcon = null;
  if (type === SecureCodeTypes.fullDay) {
    backgroundColor = '';
    headerText = 'ONE TIME PASSCODE - 24H';
    subText = 'Valid until midnight';
    headerIcon = TruckIcon;
  }


  return (
    <View style={[...style, { backgroundColor }, styles.mainContainer]}>
      <View style={styles.row}>
        {!!headerIcon && <Image source={headerIcon} style={styles.headerIcon} />}
        <View style={styles.column}>
          <View style={styles.row}>
            <Text centered size="regular" weight="bold">{headerText}</Text>
          </View>
          {!!subText && (
          <View style={styles.row}>
            <Text flex size="small" weight="regular">{subText}</Text>
          </View>
          )}
        </View>
      </View>

      <SecureCodeDisplay type={type} />
      <Button style={styles.button} onPress={() => navigation.navigate('ShareSecureCode', { boxId: currentBox.id, type })}>
        <Image source={ShareIcon} style={styles.shareIcon} />
        <Text size="regular" weight="semibold" color="dark">
          Share Passcode
        </Text>
      </Button>
    </View>
  );
};

SecureCode.propTypes = {
  currentBox: PropTypes.object,
  style: PropTypes.array,
  isVisible: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  type: PropTypes.oneOf(Object.values(SecureCodeTypes)),
};

SecureCode.defaultProps = {
  currentBox: null,
  style: [],
  isVisible: true,
  type: SecureCodeTypes.fiveMinutes,
};

export default SecureCode;
