const NAME = 'COMMON';

export const SHOW_NOTIFICATION = `${NAME}/SHOW_NOTIFICATION`;
export const HIDE_NOTIFICATION = `${NAME}/HIDE_NOTIFICATION`;

export const showNotification = ({ text, variant, icon }) => ({
  type: SHOW_NOTIFICATION,
  text,
  variant,
  icon,
});

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});
