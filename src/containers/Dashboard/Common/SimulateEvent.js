import React from 'react';
import {
  Background, NavBar, Text, Button, Loading,
} from 'components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { normalize } from 'utils/size';
import moment from 'moment';
import Actions from 'actions';
import Selectors from 'selectors';
import { EventTypes } from 'utils/events';
import Colors from 'themes/colors';

const styles = StyleSheet.create({
  container: {
    padding: normalize(20),
  },
  row: {
    flexDirection: 'row',
    paddingVertical: normalize(10),
  },
  flex: {
    flex: 1,
  },
  divider: {
    paddingHorizontal: normalize(10),
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: `${Colors.darkest}60`,
  },
});

const SimulateEvent = ({ navigation }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.SIMULATE_EVENT_REQUEST,
  ]));

  const simulateEvent = (type, payload) => {
    const data = {
      time: moment().toISOString(),
      type,
      payload,
    };
    dispatch(Actions.simulateEvent(data));
  };

  return (
    <Background>
      <NavBar title="Simulate Events" onLeftIconPressed={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text weight="bold">Lid</Text>
        <View style={styles.row}>
          <Button
            style={styles.flex}
            onPress={() => simulateEvent(EventTypes.lid, { open: false })}
          >
            <Text color="darkest" weight="bold">CLOSE</Text>
          </Button>
          <View style={styles.divider} />
          <Button
            style={styles.flex}
            onPress={() => simulateEvent(EventTypes.lid, { open: true })}
          >
            <Text color="darkest" weight="bold">OPEN</Text>
          </Button>
        </View>
        <Text weight="bold">Temperature</Text>
        <View style={styles.row}>
          <Button
            style={styles.flex}
            onPress={() => simulateEvent(EventTypes.temperature, { celsius: -10 })}
          >
            <Text color="darkest" weight="bold">TOO COLD</Text>
          </Button>
          <View style={styles.divider} />
          <Button
            style={styles.flex}
            onPress={() => simulateEvent(EventTypes.temperature, { celsius: 10 })}
          >
            <Text color="darkest" weight="bold">TOO WARM</Text>
          </Button>
        </View>
        <Text weight="bold">PIN</Text>
        <View style={styles.row}>
          <Button
            style={styles.flex}
            onPress={() => simulateEvent(EventTypes.pin, { pinIndex: 3 })}
          >
            <Text color="darkest" weight="bold">OPERATOR</Text>
          </Button>
          <View style={styles.divider} />
          <Button
            style={styles.flex}
            onPress={() => simulateEvent(EventTypes.pin, { pinIndex: 1 })}
          >
            <Text color="darkest" weight="bold">OTP</Text>
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            style={styles.flex}
            onPress={() => simulateEvent(EventTypes.pin, { pinIndex: 2 })}
          >
            <Text color="darkest" weight="bold">OWNER</Text>
          </Button>
          <View style={styles.divider} />
          <Button
            style={styles.flex}
            onPress={() => simulateEvent(EventTypes.pin, { pinIndex: -1 })}
          >
            <Text color="darkest" weight="bold">INVALID</Text>
          </Button>
        </View>
        <Text weight="bold">Power</Text>
        <View style={styles.row}>
          <Button
            style={styles.flex}
            onPress={() => simulateEvent(EventTypes.power, { on: false })}
          >
            <Text color="darkest" weight="bold">OFF</Text>
          </Button>
          <View style={styles.divider} />
          <Button
            style={styles.flex}
            onPress={() => simulateEvent(EventTypes.power, { on: true })}
          >
            <Text color="darkest" weight="bold">ON</Text>
          </Button>
        </View>
        <Text weight="bold">Temperature Control</Text>
        <View style={styles.row}>
          <Button
            style={styles.flex}
            onPress={() => simulateEvent(EventTypes.tempControl, { on: false })}
          >
            <Text color="darkest" weight="bold">OFF</Text>
          </Button>
          <View style={styles.divider} />
          <Button
            style={styles.flex}
            onPress={() => simulateEvent(EventTypes.tempControl, { on: true })}
          >
            <Text color="darkest" weight="bold">ON</Text>
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            style={styles.flex}
            onPress={() => simulateEvent(EventTypes.startup, null)}
          >
            <Text color="darkest" weight="bold">STARTUP</Text>
          </Button>
        </View>
      </View>

      {isLoading && (
        <View style={styles.overlay}>
          <Loading />
        </View>
      )}
    </Background>
  );
};

SimulateEvent.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SimulateEvent;
