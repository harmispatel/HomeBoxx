import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from 'themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator color={Colors.lightest} />
  </View>
);

export default Loading;
