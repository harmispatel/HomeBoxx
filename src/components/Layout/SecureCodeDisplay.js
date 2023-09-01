import React from 'react';
import {
  View, StyleSheet, Image, ActivityIndicator,
} from 'react-native';
import { normalize } from 'utils/size';
import { useSelector } from 'react-redux';
import Actions from 'actions';
import Selectors from 'selectors';
import { TimerIcon } from 'images';
import Colors from 'themes/colors';
import { fontSizes } from 'themes/fonts';
import PropTypes from 'prop-types';
import { SecureCodeTypes } from 'utils/secureCode';
import moment from 'moment';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
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
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(10),
  },
});

const SecureCodeDisplay = ({
  codeFontSize, errorFontSize, style, type,
}) => {
  let secureCode;
  let loadingAction;
  if (type === SecureCodeTypes.fiveMinutes) {
    secureCode = useSelector(Selectors.getSecureCode);
    loadingAction = Actions.FETCH_SECURE_CODE_REQUEST;
  } else {
    secureCode = useSelector(Selectors.getDailyCode);
    loadingAction = Actions.FETCH_DAILY_CODE_REQUEST;
  }
  const currentSeconds = useSelector(Selectors.getCurrentSeconds);
  const isLoading = useSelector(Selectors.createLoadingSelector([
    loadingAction,
  ]));
  const code = secureCode?.otp;
  const fontSize = code ? codeFontSize : errorFontSize;

  let subtext = '-';
  let color = 'red';
  if (code) {
    if (type === SecureCodeTypes.fiveMinutes) {
      subtext = `${currentSeconds} seconds`;
      color = 'green';
    }
    if (type === SecureCodeTypes.fullDay) {
      const now = moment();
      const expiration = moment(secureCode.validTo);
      if (expiration.isBefore(now)) {
        subtext = 'Code has expired. Refresh to get a new one.';
      } else {
        subtext = `Expires: ${expiration.format('HH:mm DD/MM/YYYY')}`;
        color = 'white';
      }
    }
  }


  return (
    <View style={[styles.container, style && style]}>
      {isLoading
    && (
    <ActivityIndicator
      color={Colors.white}
      style={{ paddingVertical: fontSizes[fontSize] / 2 }}
    />
    )}
      {!isLoading && (
        <Text
          size={fontSize}
          weight="bold"
          centered
          color={color}
        >
          {code || 'Failed to get code'}
        </Text>
      )}
      <View style={styles.timer}>
        <Image source={TimerIcon} resizeMode="contain" style={styles.timerIcon} />
        <Text size="small" weight="regular">{subtext}</Text>
      </View>
    </View>
  );
};

SecureCodeDisplay.propTypes = {
  codeFontSize: PropTypes.oneOf(Object.keys(fontSizes)),
  errorFontSize: PropTypes.oneOf(Object.keys(fontSizes)),
  style: PropTypes.object,
  type: PropTypes.oneOf(Object.values(SecureCodeTypes)),
};

SecureCodeDisplay.defaultProps = {
  codeFontSize: 'xxlarge',
  errorFontSize: 'xlarge',
  style: null,
  type: SecureCodeTypes.fiveMinutes,
};

export default SecureCodeDisplay;
