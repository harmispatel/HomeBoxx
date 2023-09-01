import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Image,
} from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { withFormikControl } from 'react-native-formik';
import Colors from 'themes/colors';
import { normalize, getScreenWidth, getScreenHeight } from 'utils/size';
import {
  BackspaceIcon,
} from 'images';
import PropTypes from 'prop-types';
import Text from '../Text';

const CELL_COUNT = 6;
const BUTTON_SIZE = (getScreenHeight() / 10);

const styles = StyleSheet.create({
  codeFiledRoot: {
    marginTop: normalize(20),
  },
  cell: {
    width: (getScreenWidth() / 6) - normalize(20),
    height: (getScreenWidth() / 6) - normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
  },
  focusCell: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.light,
  },
  numpadContainer: {
    marginVertical: normalize(20),
    flex: 1,
  },
  icon: {
    width: normalize(BUTTON_SIZE),
    height: normalize(BUTTON_SIZE),
    justifyContent: 'center',
    resizeMode: 'contain',
    margin: normalize(10),
  },
  numpadCell: {
    justifyContent: 'center',
    backgroundColor: `${Colors.lightest}20`,
    borderColor: Colors.white,
    borderWidth: normalize(2),
    borderRadius: normalize(BUTTON_SIZE / 2),
    width: normalize(BUTTON_SIZE),
    height: normalize(BUTTON_SIZE),
    margin: normalize(10),
  },
  numpadRow: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    margin: normalize(10),
  },
});

const numberPad = (onPress, onBackspace, disabled) => {
  const cell = (symbol) => (
    <TouchableOpacity
      style={styles.numpadCell}
      key={symbol}
      accessibilityLabel={symbol.toString()}
      onPress={() => { onPress(symbol.toString()); }}
      disabled={disabled}
    >
      <Text centered size="xlarge" color={Colors.white}>{symbol}</Text>
    </TouchableOpacity>
  );

  const row = (numbersArray) => {
    const cells = numbersArray.map((val) => cell(val));
    return (
      <View style={styles.numpadRow}>
        {cells}
      </View>
    );
  };

  return (
    <View style={[styles.numpadContainer, disabled && { opacity: 0.3 }]}>
      {row([1, 2, 3])}
      {row([4, 5, 6])}
      {row([7, 8, 9])}
      <View style={styles.numpadRow}>
        <View style={[styles.numpadCell, { borderWidth: 0, backgroundColor: null }]} />
        {cell(0)}
        <TouchableOpacity
          accessibilityLabel="backspace"
          onPress={onBackspace}
          disabled={disabled}
        >
          <Image source={BackspaceIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PINInput = ({
  value, setFieldValue, onFilled, disabled,
}) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: setFieldValue,
  });

  const onPress = (val) => {
    if (value.length < CELL_COUNT) {
      setFieldValue(value + val);
    }
    if (value.length === CELL_COUNT - 1 && onFilled) {
      setTimeout(onFilled, 0);
    }
  };

  const onBackspace = () => {
    setFieldValue(value.toString().slice(0, -1));
  };

  return (
    <>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        editable={false}
        renderCell={({ index, symbol }) => (
          <View
            key={index}
            style={[styles.cell, symbol && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text weight="xbold" size="xlarge" centered>
              {symbol && '•'}
            </Text>
          </View>
        )}
      />
      {numberPad(onPress, onBackspace, disabled)}
    </>
  );
};

PINInput.propTypes = {
  value: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  onFilled: PropTypes.func,
  disabled: PropTypes.bool,
};

PINInput.defaultProps = {
  onFilled: null,
  disabled: false,
};

export default withFormikControl(PINInput);
