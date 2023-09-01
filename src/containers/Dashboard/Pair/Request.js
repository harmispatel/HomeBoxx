/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import {
  View, StyleSheet, Image, ActivityIndicator, SafeAreaView,
} from 'react-native';
import {
  Text, NavBar, Background, Button,
} from 'components';
import { normalize } from 'utils/size';
import { useDispatch, useSelector } from 'react-redux';
import Actions from 'actions';
import Selectors from 'selectors';
import PropTypes from 'prop-types';
import { TimerIcon } from 'images';
import Colors from 'themes/colors';
import CONFIG from 'react-native-config';

const styles = StyleSheet.create({
  header: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(20),
  },
  content: {
    flex: 0.7,
    alignItems: 'center',
  },
  icon: {
    height: normalize(20),
    width: normalize(20),
    marginRight: normalize(10),
  },
  subtitle: {
    paddingVertical: normalize(10),
  },
  code: {
    paddingBottom: normalize(20),
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: normalize(20),
  },
  text: {
    marginBottom: normalize(20),
  },
});

const PairRequest = ({ navigation }) => {
  const dispatch = useDispatch();
  const pairRequest = useSelector(Selectors.getPairRequest);
  const currentSeconds = useSelector(Selectors.getCurrentSeconds);
  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.REQUEST_PAIR_REQUEST,
  ]));

  const isSimulating = useSelector(Selectors.createLoadingSelector([
    Actions.SIMULATE_PAIRING_REQUEST,
  ]));

  const requestPair = () => dispatch(Actions.requestPair());

  const simulatePairing = () => dispatch(Actions.simulatePairing(pairRequest.pairingCode));

  useEffect(() => {
    requestPair();
  }, []);

  useEffect(() => {
    if (currentSeconds <= 0) {
      requestPair();
    }
  }, [currentSeconds]);

  const onBack = () => {
    navigation.goBack();
    dispatch(Actions.stopTimer());
    dispatch(Actions.stopPairingWatcher());
  };

  return (
    <Background>
      <NavBar onLeftIconPressed={onBack} title="Pair Homeboxx" />
      <View style={styles.header}>
        <Text centered size="xlarge" weight="xbold">Enter Code</Text>
        <Text centered style={styles.subtitle}>
          Key in this code to your Homeboxx to pair with your device.
        </Text>
      </View>
      <View style={styles.content}>
        {isLoading && <ActivityIndicator color={Colors.white} />}
        {!isLoading && (
          <>
            <Text size="xxxlarge" weight="xbold" color="green" style={styles.code}>{pairRequest?.pairingCode}</Text>
            <View style={styles.timer}>
              <Image source={TimerIcon} resizeMode="contain" style={styles.icon} />
              <Text>{`${currentSeconds} seconds`}</Text>
            </View>
          </>
        )}
      </View>
      {(__DEV__ || CONFIG.ENVIRONMENT === 'staging') && (
        <SafeAreaView style={styles.buttonContainer}>
          <Text centered color="light" size="small" style={styles.text}>
            This button will only be shown on testing environment to simulate pairing.
          </Text>
          <Button bg="yellow" onPress={simulatePairing} isLoading={isSimulating}>
            <Text weight="bold">SIMULATE PAIRING</Text>
          </Button>
        </SafeAreaView>
      )}
    </Background>
  );
};

PairRequest.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PairRequest;
