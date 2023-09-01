import auth from './auth';
import common from './common';
import persist from './persist';
import box from './box';
import user from './user';
import notification from './notification';
import ad from './ad';

export default {
  ...auth,
  ...common,
  ...persist,
  ...box,
  ...user,
  ...notification,
  ...ad,
};
