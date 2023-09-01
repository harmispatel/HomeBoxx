import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { normalize } from 'utils/size';
import { PropTypes } from 'prop-types';
import Colors from 'themes/colors';
import { fontWeights } from 'themes/fonts';

// const XDate = require('xdate');

const styles = StyleSheet.create({
  calendar: {
    borderRadius: normalize(10),
    padding: normalize(10),
  },
});

const DateRangePicker = ({ initialRange, onSuccess, theme }) => {
  const [isFromDatePicked, setIsFromDatePicked] = useState(false);
  const [isToDatePicked, setIsToDatePicked] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [fromDate, setFromDate] = useState('');

  const setupMarkedDates = (fromDateString, toDateString) => {
    const newFromDate = new Date(fromDateString);
    const newToDate = new Date(toDateString);
    const range = newFromDate.diffDays(newToDate);
    const newMarkedDates = {
      [fromDateString]: {
        color: theme.markColor,
        textColor: theme.markTextColor,
      },
    };
    if (range > 0) {
      for (let i = 1; i <= range; i += 1) {
        const tempDate = newFromDate.addDays(1).toString('yyyy-MM-dd');
        if (i < range) {
          newMarkedDates[tempDate] = {
            color: theme.markColor,
            textColor: theme.markTextColor,
          };
        } else {
          newMarkedDates[tempDate] = {
            endingDay: true,
            color: theme.markColor,
            textColor: theme.markTextColor,
          };
        }
      }
    }
    return [newMarkedDates, range];
  };

  const setupInitialRange = () => {
    if (!initialRange) return;
    const [newFromDate, newToDate] = initialRange;
    const [newMarkedDates] = setupMarkedDates(newFromDate, newToDate);
    setMarkedDates(newMarkedDates);
    setFromDate(newFromDate);
  };

  useEffect(setupInitialRange, []);

  const setupStartMarker = (day) => {
    const newMarkedDates = {
      [day.dateString]: {
        startingDay: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
      },
    };
    setIsFromDatePicked(true);
    setIsToDatePicked(false);
    setFromDate(day.dateString);
    setMarkedDates(newMarkedDates);
  };

  const onDayPress = (day) => {
    if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
      setupStartMarker(day);
    } else if (!isToDatePicked) {
      const [newMarkedDates, range] = setupMarkedDates(fromDate, day.dateString);
      if (range >= 0) {
        setIsFromDatePicked(true);
        setIsToDatePicked(true);
        setMarkedDates(newMarkedDates);
        onSuccess(fromDate, day.dateString);
      } else {
        setupStartMarker(day);
      }
    }
  };

  return (
    <Calendar
      style={styles.calendar}
      theme={{
        calendarBackground: Colors.dark,
        dayTextColor: Colors.light,
        monthTextColor: Colors.light,
        textDisabledColor: Colors.grey,
        textMonthFontFamily: fontWeights.semibold,
        arrowColor: Colors.grey,
        disabledArrowColor: Colors.greyest,
      }}
      markingType="period"
      current={fromDate}
      markedDates={markedDates}
      onDayPress={(day) => { onDayPress(day); }}
    />
  );
};

DateRangePicker.propTypes = {
  initialRange: PropTypes.array,
  onSuccess: PropTypes.func.isRequired,
  theme: PropTypes.object,
};

DateRangePicker.defaultProps = {
  initialRange: ['', ''],
  theme: { markColor: '#00adf5', markTextColor: '#ffffff' },
};

export default DateRangePicker;
