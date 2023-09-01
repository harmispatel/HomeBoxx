import moment from 'moment';

export const formatTime = (time) => {
  if (!time) return null;
  const currentTime = moment();
  const comparedTime = moment(time);
  if (currentTime.diff(comparedTime, 'minutes') < 45) {
    return comparedTime.fromNow();
  }
  return `${comparedTime.format('DD-MM-YYYY')} • ${comparedTime.format('HH:mm')}`;
};
