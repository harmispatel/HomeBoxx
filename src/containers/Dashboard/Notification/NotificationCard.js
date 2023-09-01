import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'components';
import Colors from 'themes/colors';
import { normalize } from 'utils/size';
import PropTypes from 'prop-types';
import { formatTime } from 'utils/time';
import { EventTypes } from 'utils/events';
import { formatTemperature } from 'utils/box';

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${Colors.dark}60`,
    borderWidth: 1,
    borderColor: Colors.greyest,
    borderRadius: normalize(5),
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  content: {
    padding: normalize(15),
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'flex-end',
  },
  label: {
    borderLeftWidth: normalize(8),
    borderTopLeftRadius: normalize(5),
    borderBottomLeftRadius: normalize(5),
    borderColor: Colors.red,
  },
});

const NotificationCard = ({
  content, box, createdAt, boxEvent,
}) => {
  const getEventState = () => {
    switch (boxEvent.type) {
      case EventTypes.lid:
        return {
          status: 'LEFT OPEN',
          color: 'yellow',
        };
      case EventTypes.power:
        return {
          status: boxEvent.payload.on ? 'ON' : 'OFF',
          color: boxEvent.payload.on ? 'green' : 'red',
        };
      case EventTypes.pinOpenedByOtp:
      case EventTypes.pinOpenedByOwner:
      case EventTypes.pinOpenedByOperator:
        return {
          status: 'UNLOCKED',
          color: 'green',
        };
      case EventTypes.temperature:
        return {
          status: `${formatTemperature(boxEvent.payload.celsius)}°C`,
          color: 'red',
        };
      case EventTypes.boxShared:
        return {
          status: 'SHARED',
          color: 'green',
        };
      case EventTypes.connectivity:
        return {
          status: 'DISCONNECTED',
          color: 'red',
        };
      case EventTypes.startup:
        return {
          status: 'CONNECTED',
          color: 'green',
        };
      default:
        return null;
    }
  };

  const { status, color } = getEventState();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={[styles.label, { borderColor: Colors[color] }]} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text weight="bold" size="large" flex numberOfLines={1}>{`Homeboxx ${box.name}`}</Text>
            {boxEvent?.type && getEventState() && <Text weight="bold" color={color}>{status}</Text>}
          </View>
          <Text size="small">{content}</Text>
          <View style={styles.footer}>
            <Text size="xsmall" color="lightest">{formatTime(createdAt)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

NotificationCard.propTypes = {
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  box: PropTypes.object.isRequired,
  boxEvent: PropTypes.object.isRequired,
};

export default NotificationCard;
