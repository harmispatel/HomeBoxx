const NAME = 'COMMON';

export const isNotificationVisible = (store) => store[NAME].notification.isVisible;
export const getNotificationData = (store) => store[NAME].notification;
