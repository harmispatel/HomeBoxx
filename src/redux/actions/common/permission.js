const NAME = 'COMMON';

export const REQUEST_PERMISSION = `${NAME}/REQUEST_PERMISSION`;

export const requestPermission = (permissionType, popUpText, callback) => ({
  type: REQUEST_PERMISSION,
  permissionType,
  popUpText,
  callback,
});
