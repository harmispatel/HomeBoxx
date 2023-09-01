import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { withFormikControl } from 'react-native-formik';
import Colors from 'themes/colors';
import { normalize, getScreenWidth } from 'utils/size';
import PropTypes from 'prop-types';
import Text from '../Text';

const CELL_COUNT = 6;

const styles = StyleSheet.create({
  codeFiledRoot: {
    marginTop: 20,
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
});

const CodeInput = ({ value, setFieldValue }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: setFieldValue,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setFieldValue}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFiledRoot}
      keyboardType="number-pad"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          <Text
            weight="bold"
            size="large"
            centered
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </View>
      )}
    />
  );
};


CodeInput.propTypes = {
  value: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default withFormikControl(CodeInput);
