import {
  TextInput as RNTextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  handleTextInput,
} from 'react-native-formik';
import Colors from 'themes/colors';
import { normalize } from 'utils/size';
import Label from './parts/Label';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(10),
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    flex: 1,
    position: 'relative',
  },
  input: {
    height: normalize(34),
    fontSize: normalize(14),
    color: Colors.light,
    flex: 1,
    padding: 0,
  },
  error: {
    fontSize: normalize(12),
    paddingTop: normalize(5),
    alignSelf: 'flex-end',
  },
  inputContainerActive: {
    borderBottomColor: Colors.light,
  },
  inputContainerError: {
    borderBottomColor: Colors.red,
  },
  prefixContainer: {
    paddingHorizontal: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchablePrefixContainer: {
    marginRight: normalize(10),
    padding: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light,
  },
});

const TextInput = ({
  error, prefix, prefixColor, prefixSize, value, label, onPrefixPress, ...otherProps
}) => {
  const [isFocused, setFocus] = useState(false);
  const input = useRef(null);

  const onFocus = () => setFocus(true);

  const onBlur = () => setFocus(false);

  const focus = () => input.current.focus();

  const isActive = value !== null && value !== '';
  const labelProps = {
    isActive,
    isFocused,
    isError: error !== null,
    onPress: focus,
  };

  const Prefix = onPrefixPress ? TouchableOpacity : View;

  return (
    <>
      <View style={styles.container}>
        {prefix && (
          <Prefix
            style={onPrefixPress ? styles.touchablePrefixContainer : styles.prefixContainer}
            onPress={onPrefixPress}
          >
            <Text color={prefixColor} size={prefixSize}>{prefix}</Text>
          </Prefix>
        )}
        <View style={[
          styles.inputContainer,
          (isActive || isFocused) && styles.inputContainerActive,
          error !== null && styles.inputContainerError,
        ]}
        >
          <RNTextInput
            value={value}
            style={styles.input}
            autoCapitalize="none"
            onFocus={onFocus}
            onBlur={onBlur}
            ref={input}
            onEndEditing={onBlur} // onEndEditing will be triggered when input loses focus
            {...otherProps}
          />
          {label && <Label {...labelProps}>{label}</Label>}
        </View>
      </View>
      <Text color="red" style={styles.error}>{error}</Text>
    </>
  );
};

TextInput.propTypes = {
  value: PropTypes.string,
  error: PropTypes.any,
  label: PropTypes.string,
  prefix: PropTypes.string,
  prefixColor: PropTypes.string,
  prefixSize: PropTypes.string,
  onPrefixPress: PropTypes.func,
};

TextInput.defaultProps = {
  value: null,
  error: null,
  label: null,
  prefix: null,
  prefixColor: 'gray',
  prefixSize: 'regular',
  onPrefixPress: null,
};

export default handleTextInput(TextInput);
