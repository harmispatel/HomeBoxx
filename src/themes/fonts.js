import { normalize } from 'utils/size';

export const fontSizes = {
  xxsmall: normalize(10),
  xsmall: normalize(12),
  small: normalize(14),
  regular: normalize(16),
  large: normalize(18),
  xlarge: normalize(24),
  xxlarge: normalize(36),
  xxxlarge: normalize(48),
};

export const fontWeights = {
  regular: 'Manrope-Regular',
  semibold: 'Manrope-Medium',
  bold: 'Manrope-Bold',
  xbold: 'Manrope-ExtraBold',
};

export const fontSizesProps = Object.keys(fontSizes).map((key) => key);
export const fontWeightsProps = Object.keys(fontWeights).map((key) => key);
