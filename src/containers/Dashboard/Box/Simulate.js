import React from 'react';
import { Button, Text } from 'components';
import { View, StyleSheet } from 'react-native';
import { normalize } from 'utils/size';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    padding: normalize(20),
  },
});

const Simulate = ({ isVisible, navigation }) => {
  if (!isVisible) return null;
  return (
    <View style={styles.container}>
      <Button bg="yellow" onPress={() => navigation.navigate('SimulateEvent')}>
        <Text weight="bold">SIMULATE EVENTS</Text>
      </Button>
    </View>
  );
};

Simulate.propTypes = {
  isVisible: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
};

Simulate.defaultProps = {
  isVisible: false,
};

export default Simulate;
