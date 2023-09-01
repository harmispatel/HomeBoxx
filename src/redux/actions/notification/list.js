const NAME = 'NOTIFICATION';

export const LIST_NOTIFICATIONS_REQUEST = `${NAME}/LIST_NOTIFICATIONS_REQUEST`;
export const LIST_NOTIFICATIONS_SUCCESS = `${NAME}/LIST_NOTIFICATIONS_SUCCESS`;
export const LIST_NOTIFICATIONS_FAIL = `${NAME}/LIST_NOTIFICATIONS_FAIL`;

export const PAGINATE_NOTIFICATIONS_REQUEST = `${NAME}/PAGINATE_NOTIFICATIONS_REQUEST`;
export const PAGINATE_NOTIFICATIONS_SUCCESS = `${NAME}/PAGINATE_NOTIFICATIONS_SUCCESS`;
export const PAGINATE_NOTIFICATIONS_FAIL = `${NAME}/PAGINATE_NOTIFICATIONS_FAIL`;

export const listNotifications = (callback) => ({
  type: LIST_NOTIFICATIONS_REQUEST,
  callback,
});

export const listNotificationsSuccess = (data) => ({
  type: LIST_NOTIFICATIONS_SUCCESS,
  data,
});

export const listNotificationsFail = (error) => ({
  type: LIST_NOTIFICATIONS_FAIL,
  error,
});

export const paginateNotifications = (last, callback) => ({
  type: PAGINATE_NOTIFICATIONS_REQUEST,
  last,
  callback,
});

export const paginateNotificationsSuccess = (data) => ({
  type: PAGINATE_NOTIFICATIONS_SUCCESS,
  data,
});

export const paginateNotificationsFail = (error) => ({
  type: PAGINATE_NOTIFICATIONS_FAIL,
  error,
});
