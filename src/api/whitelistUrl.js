import { fullUrlFrom } from './url';

export const getWhitelistURL = () => {
  const whitelistUrl = [

  ];
  return whitelistUrl.map((url) => fullUrlFrom(url));
};
