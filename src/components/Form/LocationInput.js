import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { withFormikControl } from 'react-native-formik';
import Colors from 'themes/colors';
import { normalize } from 'utils/size';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(10),
  },
  input: {
    height: normalize(28),
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  active: {
    borderBottomColor: Colors.light,
  },
  errored: {
    borderBottomColor: Colors.red,
  },
  error: {
    fontSize: normalize(12),
    paddingTop: normalize(5),
    alignSelf: 'flex-end',
  },
});

const LocationInput = ({
  error, value, label, onPress,
}) => (
  <>
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {value !== '' && <Text color="grey" size="xsmall">{label}</Text>}
      <View
        style={[
          styles.input,
          value !== '' && styles.active,
          error !== null && styles.errored,
        ]}
      >
        {value === '' && <Text color={error !== null ? 'red' : 'grey'} size="small">{label}</Text>}
        {value !== '' && <Text color="light" size="small" numberOfLines={1}>{value}</Text>}
      </View>
    </TouchableOpacity>
    <Text color="red" style={styles.error}>{error}</Text>
  </>
);

LocationInput.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.any,
  label: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

LocationInput.defaultProps = {
  error: null,
  label: null,
};

export default withFormikControl(LocationInput);
