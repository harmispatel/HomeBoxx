import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { normalize } from 'utils/size';
import { formatTime } from 'utils/time';
import { Text } from 'components';
import { ThermometerIcon } from 'images';
import PropTypes from 'prop-types';
import { EventTypes } from 'utils/events';
import { formatTemperature } from 'utils/box';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  col: {
    flexDirection: 'column',
  },
  icon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: normalize(30),
    width: normalize(25),
    marginHorizontal: normalize(20),
  },
  spacer: {
    flex: 1,
  },
  time: {
    alignSelf: 'flex-end',
  },
});

const ActivityCard = ({ event, currentBox }) => {
  if (!event || !currentBox) return null;
  if (event.isEndOfList) {
    return (<Text weight="regular" size="regular" centered>End of List</Text>);
  }

  const eventData = event.elem;
  const { payload } = eventData;
  const getCardDetails = (eventType) => {
    switch (eventType) {
      case EventTypes.lock:
        // Not included in design, used for testing only
        if (payload.open) {
          return {
            title: 'Lock',
            text: 'Homeboxx was Unlocked',
            status: 'UNLOCKED',
            statusColor: 'green',
          };
        }
        // Not included in design, used for testing only
        return {
          title: 'Lock',
          text: 'Homeboxx was Locked',
          status: 'LOCKED',
          statusColor: 'yellow',
        };
      case EventTypes.pinOpenedByOtp:
        return {
          title: 'Opened by OTP',
          text: 'Opened by ',
          boldText: 'one time passcode',
          status: payload.temp < 999 ? `${formatTemperature(payload.temp)} °` : 'N/A',
          statusIcon: ThermometerIcon,
        };
      case EventTypes.pinOpenedByOwner:
        return {
          title: 'Opened by Owner',
          text: 'Opened by ',
          boldText: payload.openedBy,
          status: payload.temp < 999 ? `${formatTemperature(payload.temp)} °` : 'N/A',
          statusIcon: ThermometerIcon,
        };
      case EventTypes.pinOpenedByOperator:
        return {
          title: 'Opened by Operator Code',
          text: 'Opened by ',
          boldText: payload.openedBy,
          status: payload.temp < 999 ? `${formatTemperature(payload.temp)} °` : 'N/A',
          statusIcon: ThermometerIcon,
        };
      case EventTypes.pinInvalid:
        return {
          title: 'Invalid Code Entered',
          text: 'Invalid code entered',
          titleColor: 'red',
        };
      case EventTypes.power:
        if (payload.on) {
          return {
            title: 'Main Power Supply on',
            text: 'Main power supply ON',
            status: 'ON',
            statusColor: 'green',
          };
        }
        return {
          title: 'Main Power Supply off',
          text: 'Main power supply OFF',
          status: 'OFF',
          statusColor: 'red',
        };
      case EventTypes.tempControl:
        if (payload.on) {
          return {
            title: 'Temperature Control on',
            text: 'Temperature control turned ON',
            status: 'ON',
            statusColor: 'green',
          };
        }
        return {
          title: 'Temperature Control on',
          text: 'Temperature control turned OFF',
          status: 'OFF',
          statusColor: 'red',
        };
      default:
        return null;
    }
  };
  const cardDetails = getCardDetails(eventData.type);
  if (!cardDetails) return null;

  return (
    <View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text textAlign="left" color={cardDetails.titleColor || 'lightest'} size="regular" weight="bold">
            {cardDetails.title}
          </Text>
          <Text color="lightest" size="small" weight="regular">{`Homeboxx ${currentBox.name}:`}</Text>
          <Text color="lightest" size="small" weight="regular">
            {cardDetails.text}
            {cardDetails.boldText && <Text weight="semibold">{cardDetails.boldText}</Text>}
          </Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.row}>
          {cardDetails.statusIcon
            && <Image style={styles.icon} source={cardDetails.statusIcon} />}
          {cardDetails.status
            && <Text color={cardDetails.statusColor || 'lightest'} size="xlarge" weight="bold">{cardDetails.status}</Text>}
        </View>
      </View>
      <Text style={styles.time} color="lightest" size="small" weight="regular">
        {formatTime(eventData.time)}
      </Text>
    </View>
  );
};

ActivityCard.propTypes = {
  event: PropTypes.object,
  currentBox: PropTypes.object,
};

ActivityCard.defaultProps = {
  event: null,
  currentBox: null,
};

export default ActivityCard;
