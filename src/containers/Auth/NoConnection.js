import React from 'react';
import {
  Text, Background,
} from 'components';
import { StyleSheet, View } from 'react-native';
import { normalize } from 'utils/size';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(20),
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: normalize(20),
  },
});

const NoConnection = () => (
  <Background>
    <View style={styles.container}>
      <View style={styles.center}>
        <Text centered size="xxlarge" weight="bold">Connection Failed</Text>
        <Text centered>
          The app will refresh automatically when you are connected.
        </Text>
      </View>
    </View>
  </Background>
);

export default NoConnection;
