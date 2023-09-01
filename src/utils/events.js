export const EventTypes = Object.freeze({
  lid: 'LID',
  lock: 'LOCK',
  temperature: 'TEMPERATURE',
  pin: 'PIN',
  battery: 'BATTERY',
  power: 'POWER',
  cooler: 'COOLER',
  pinOpenedByOtp: 'PIN_INTERPRETED_OTP',
  pinOpenedByOwner: 'PIN_INTERPRETED_OWNER',
  pinOpenedByOperator: 'PIN_INTERPRETED_OPERATOR',
  pinInvalid: 'PIN_INTERPRETED_INVALID',
  heater: 'HEATER',
  tempControl: 'TEMPERATURE_CONTROL',
  boxShared: 'BOX_SHARED',
  connectivity: 'CONNECTIVITY_STATUS',
  startup: 'STARTUP',
});

export const EventFilters = Object.freeze({
  allEvents: 'All Events',
  otp: 'OTP',
  personal: 'Personal',
  operator: 'Operator',
  warning: 'Warning',
});

export const PAGE_MAX_EVENTS = 10;
export const DASHBOARD_MAX_EVENTS = 10;
