import { parsePhoneNumber, parseDigits } from 'libphonenumber-js';

export const removeCountryCode = (phoneNumberString) => {
  const phoneNumberObj = parsePhoneNumber(phoneNumberString);
  if (!phoneNumberObj) {
    // Number does not have a country code, truncate leading zeroes
    return (Number(parseDigits(phoneNumberString)).toString());
  }
  // Number has a country code, truncate the country code
  return (phoneNumberObj.nationalNumber);
};
