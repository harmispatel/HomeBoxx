import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Background, NavBar, Button, Text, DateRangePicker, ScreenCover,
} from 'components';
import Colors from 'themes/colors';
import { normalize } from 'utils/size';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Selectors from 'selectors';
import Actions from 'actions';
import { PAGE_MAX_EVENTS, EventFilters } from 'utils/events';
import { fontSizes, fontWeights } from 'themes/fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CalendarIcon } from 'images';
import moment from 'moment';

const ROW_HEIGHT = normalize(50);

const dropdownItems = Object.values(EventFilters).map((filter) => ({
  label: filter,
  value: filter,
}));

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(20),
    flex: 1,
  },
  dateFilter: {
    backgroundColor: `${Colors.dark}60`,
    borderRadius: normalize(5),
    borderColor: Colors.greyest,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: ROW_HEIGHT,
    padding: normalize(15),
    marginVertical: normalize(10),
  },
  // Must be set this way to override the component's style
  eventFilter: {
    backgroundColor: `${Colors.dark}60`,
    borderTopRightRadius: normalize(5),
    borderTopLeftRadius: normalize(5),
    borderBottomRightRadius: normalize(5),
    borderBottomLeftRadius: normalize(5),
    borderColor: Colors.greyest,
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(15),
  },
  separator: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.greyest,
    width: '100%',
    marginVertical: normalize(10),
    alignSelf: 'center',
  },
  spacer: {
    flex: 1,
  },
  dropdownMenu: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.greyest,
    backgroundColor: `${Colors.dark}40`,
  },
  dropdownText: {
    fontFamily: fontWeights.semibold,
    fontSize: fontSizes.regular,
    color: Colors.lightest,
    textAlign: 'left',
    flex: 1,
  },
  dropdownArrow: {
    width: 0,
    height: 0,
    marginTop: normalize(8),
    borderWidth: normalize(8),
    borderRightColor: 'transparent',
    borderTopColor: Colors.greyer,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  row: {
    height: ROW_HEIGHT,
    marginVertical: normalize(10),
  },
  icon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: normalize(20),
    width: normalize(20),
  },
  calendar: {
    flex: 1,
    justifyContent: 'center',
    padding: normalize(30),
  },
  inner: {
    marginVertical: normalize(50),
    flex: 1,
  },
});

const ActivityFilters = ({ navigation, route }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();
  const currentBox = useSelector(Selectors.getCurrentBox);
  const [dateFilter, setDateFilter] = useState({
    to: route?.params?.filters?.date?.to || '',
    from: route?.params?.filters?.date?.from || '',
  });
  const [eventFilter, setEventFilter] = useState(
    route?.params?.filters?.event || EventFilters.allEvents,
  );

  const refreshEvents = () => {
    dispatch(Actions.fetchEvents(currentBox.id, PAGE_MAX_EVENTS, dateFilter, eventFilter));
  };

  const onSubmit = () => {
    refreshEvents();
    navigation.navigate('AllActivity', {
      filters: {
        event: eventFilter,
        date: dateFilter,
      },
    });
  };

  let dateText = 'Date';
  if (dateFilter.from) {
    dateText = moment(dateFilter.from).format('DD-MM-yyyy');
    if (dateFilter.to && (dateFilter.to !== dateFilter.from)) {
      dateText = `${dateText} to ${moment(dateFilter.to).format('DD-MM-yyyy')}`;
    }
  }

  return (
    <Background>
      <NavBar
        onLeftIconPressed={navigation.goBack}
        title="Filter By"
      />
      <ScreenCover visible={showDatePicker} />
      <View style={styles.container}>
        <View style={styles.inner}>
          <Modal
            animationType="slide"
            transparent
            visible={showDatePicker}
            onRequestClose={() => { setShowDatePicker(false); }}
          >
            <View style={styles.calendar}>
              <DateRangePicker
                initialRange={[
                  moment(dateFilter.from).format('yyyy-MM-DD'),
                  moment(dateFilter.to).format('yyyy-MM-DD'),
                ]}
                onSuccess={(s, e) => {
                  setDateFilter({
                    from: moment(s).toISOString(),
                    to: moment(e)
                      .set({
                        hour: 23, minute: 59, second: 59, millisecond: 999,
                      })
                      .toISOString(),
                  });
                  setShowDatePicker(false);
                }}
                theme={{ markColor: Colors.grey, markTextColor: Colors.lightest }}
              />
            </View>
          </Modal>
          <TouchableOpacity style={styles.dateFilter} onPress={() => setShowDatePicker(true)}>
            <Text weight="semibold" size="regular" color="lightest">{dateText}</Text>
            <View style={styles.spacer} />
            <Image source={CalendarIcon} style={styles.icon} />
          </TouchableOpacity>
          <DropDownPicker
            name="eventFilter"
            items={dropdownItems}
            defaultValue={eventFilter}
            containerStyle={styles.row}
            style={styles.eventFilter}
            labelStyle={styles.dropdownText}
            arrowStyle={styles.dropdownArrow}
            dropDownStyle={styles.dropdownMenu}
            dropDownMaxHeight={300}
            onChangeItem={(item) => {
              setEventFilter(item.value);
            }}
          />
        </View>
        <View style={styles.spacer} />
        <Button onPress={onSubmit}>
          <Text color="darkest" weight="bold" size="large">APPLY FILTER</Text>
        </Button>
      </View>
    </Background>
  );
};

ActivityFilters.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object,
};

ActivityFilters.defaultProps = {
  route: null,
};

export default ActivityFilters;
