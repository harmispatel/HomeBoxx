import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';
import {
  PAGE_MAX_EVENTS, EventTypes, EventFilters,
} from 'utils/events';

// Translate filter type to corresponding event type(s)
const getEventTypes = (eventFilter) => {
  switch (eventFilter) {
    case EventFilters.otp:
      return [EventTypes.pinOpenedByOtp];
    case EventFilters.personal:
      return [EventTypes.pinOpenedByOwner];
    case EventFilters.operator:
      return [EventTypes.pinOpenedByOperator];
    case EventFilters.warning:
      return [EventTypes.pinInvalid, EventTypes.power];
    case EventFilters.allEvents:
    default:
      // All front-end relevant events. Filter must still be applied to filter out firmware events.
      return [
        EventTypes.pinOpenedByOtp,
        EventTypes.pinOpenedByOwner,
        EventTypes.pinOpenedByOperator,
        EventTypes.pinInvalid,
        EventTypes.power,
        EventTypes.tempControl,
      ];
  }
};

function* fetchEvents({
  boxId, amount, dateFilter, eventFilter,
}) {
  try {
    const params = {
      before: dateFilter?.to || null,
      after: dateFilter?.from || null,
      type: getEventTypes(eventFilter),
      last: amount,
    };
    const response = yield call(api.fetchEvents, boxId, params);
    if (response?.status === 200 && response?.data?.data) {
      const { data } = response.data;
      // Events are returned oldest -> newest, so array must be reversed.
      yield put(Actions.fetchEventsSuccess(data.reverse()));
    } else throw new Error('Failed to get a response');
  } catch (error) {
    yield put(Actions.showNotification({ text: 'Failed to load events', variant: 'error', icon: 'error' }));
    yield put(Actions.fetchEventsFail(error));
  }
}

function* fetchAddonEvents({
  boxId, lastEvent, dateFilter, eventFilter,
}) {
  try {
    const params = {
      before: lastEvent.time,
      after: dateFilter?.from || null,
      type: getEventTypes(eventFilter),
      last: PAGE_MAX_EVENTS,
    };
    const response = yield call(api.fetchEvents, boxId, params);
    if (response?.status === 200 && response?.data?.data) {
      const { data } = response.data;
      if (data.length <= 0) {
        yield put(Actions.fetchAddonEventsSuccess([{ key: 'end_of_list', isEndOfList: true }]));
      } else if (data.length < PAGE_MAX_EVENTS) {
        yield put(Actions.fetchAddonEventsSuccess([...data.reverse(), { key: 'end_of_list', isEndOfList: true }]));
      } else {
        yield put(Actions.fetchAddonEventsSuccess(data.reverse()));
      }
    } else throw new Error('Failed to get a response');
  } catch (error) {
    yield put(Actions.showNotification({ text: 'Failed to load events', variant: 'error', icon: 'error' }));
    yield put(Actions.fetchAddonEventsFail(error));
  }
}

function* watchFetchEvents() {
  yield takeLatest(Actions.FETCH_EVENTS_REQUEST, fetchEvents);
}

function* watchFetchAddonEvents() {
  yield takeLatest(Actions.FETCH_ADDON_EVENTS_REQUEST, fetchAddonEvents);
}

export default function* events() {
  yield all([
    fork(watchFetchEvents),
    fork(watchFetchAddonEvents),
  ]);
}
