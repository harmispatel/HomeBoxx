const NAME = 'BOX';

export const FETCH_EVENTS_REQUEST = `${NAME}/FETCH_EVENTS_REQUEST`;
export const FETCH_EVENTS_SUCCESS = `${NAME}/FETCH_EVENTS_SUCCESS`;
export const FETCH_EVENTS_FAIL = `${NAME}/FETCH_EVENTS_FAIL`;

export const FETCH_ADDON_EVENTS_REQUEST = `${NAME}/FETCH_ADDON_EVENTS_REQUEST`;
export const FETCH_ADDON_EVENTS_SUCCESS = `${NAME}/FETCH_ADDON_EVENTS_SUCCESS`;
export const FETCH_ADDON_EVENTS_FAIL = `${NAME}/FETCH_ADDON_EVENTS_FAIL`;


export const fetchEvents = (boxId, amount, dateFilter = null, eventFilter = null) => ({
  type: FETCH_EVENTS_REQUEST,
  boxId,
  amount,
  dateFilter,
  eventFilter,
});

export const fetchEventsSuccess = (data) => ({
  type: FETCH_EVENTS_SUCCESS,
  data,
});

export const fetchEventsFail = (error) => ({
  type: FETCH_EVENTS_FAIL,
  error,
});

export const fetchAddonEvents = (boxId, lastEvent, dateFilter = null, eventFilter = null) => ({
  type: FETCH_ADDON_EVENTS_REQUEST,
  boxId,
  lastEvent,
  dateFilter,
  eventFilter,
});

export const fetchAddonEventsSuccess = (data) => ({
  type: FETCH_ADDON_EVENTS_SUCCESS,
  data,
});

export const fetchAddonEventsFail = (error) => ({
  type: FETCH_ADDON_EVENTS_FAIL,
  error,
});
