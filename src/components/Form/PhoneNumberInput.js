import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CountryPicker from 'react-native-country-picker-modal';
import Colors from 'themes/colors';
import {
  fontSizes, fontWeights,
} from 'themes/fonts';
import { normalize } from 'utils/size';
import { ALLOWED_COUNTRIES } from 'utils/phone';
import TextInput from './TextInput';

const countryPickerTheme = {
  backgroundColor: Colors.darker,
  fontSize: fontSizes.regular,
  fontFamily: fontWeights.regular,
  onBackgroundTextColor: Colors.light,
  primaryColor: Colors.light,
  primaryColorVariant: Colors.light,
  itemHeight: normalize(50),
};

const PhoneNumberInput = ({
  phoneNumberFieldName, countryCodeFieldName, label, setFieldValue, values,
}) => {
  const [prefix, setPrefix] = useState(values[countryCodeFieldName]);
  const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);

  const setCountryCode = ({ callingCode }) => {
    const code = `+${callingCode[0]}`;
    setPrefix(code);
    setFieldValue(countryCodeFieldName, code);
  };

  return (
    <>
      <TextInput
        name={phoneNumberFieldName}
        label={label}
        keyboardType="phone-pad"
        prefix={prefix}
        prefixColor="light"
        prefixSize="small"
        onPrefixPress={() => { setIsCountryPickerVisible(true); }}
      />
      <CountryPicker
        withCallingCode
        countryCodes={ALLOWED_COUNTRIES}
        visible={isCountryPickerVisible}
        theme={countryPickerTheme}
        onClose={() => setIsCountryPickerVisible(false)}
        onSelect={setCountryCode}
        containerButtonStyle={{ display: 'none' }}
      />
    </>
  );
};

PhoneNumberInput.propTypes = {
  phoneNumberFieldName: PropTypes.string.isRequired,
  countryCodeFieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.object,
};

PhoneNumberInput.defaultProps = {
  values: null,
};

export default PhoneNumberInput;
