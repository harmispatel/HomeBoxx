import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Background, NavBar, Text,
} from 'components';
import Colors from 'themes/colors';
import { normalize } from 'utils/size';
import PropTypes from 'prop-types';
import ActivityCard from 'components/ActivityCard';
import { useDispatch, useSelector } from 'react-redux';
import Selectors from 'selectors';
import Actions from 'actions';
import { PAGE_MAX_EVENTS, DASHBOARD_MAX_EVENTS } from 'utils/events';
import { FilterIcon } from 'images';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(20),
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
  icon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: normalize(20),
    width: normalize(20),
    marginRight: normalize(10),
  },
  col: {
    flexDirection: 'column',
    marginHorizontal: normalize(20),
  },
  filter: {
    paddingHorizontal: normalize(25),
    marginVertical: normalize(10),
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    height: normalize(45),
    borderWidth: 1,
    borderRadius: normalize(5),
    backgroundColor: `${Colors.dark}60`,
    borderColor: Colors.greyest,
  },
});

const AllActivity = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const events = useSelector(Selectors.getEvents);
  const currentBox = useSelector(Selectors.getCurrentBox);
  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.FETCH_ADDON_EVENTS_REQUEST,
  ]));
  const isRefreshing = useSelector(Selectors.createLoadingSelector([
    Actions.FETCH_EVENTS_REQUEST,
  ]));
  const dateFilter = route?.params?.filters?.date || null;
  const eventFilter = route?.params?.filters?.event || null;

  const refreshEvents = () => {
    dispatch(Actions.fetchEvents(currentBox.id, PAGE_MAX_EVENTS, dateFilter, eventFilter));
  };
  const fetchAddonEvents = () => {
    const last = events[events.length - 1];
    if (last.isEndOfList) return;
    dispatch(Actions.fetchAddonEvents(currentBox.id, last.elem, dateFilter, eventFilter));
  };

  useEffect(refreshEvents, []);

  let filterText = 'Showing recent...';
  if (dateFilter) {
    const { from, to } = dateFilter;
    if (from === to) {
      filterText = `Showing for ${moment(from).format('DD-MM-yyyy')}`;
    } else {
      filterText = `Showing from ${moment(from).format('DD-MM-yyyy')} to ${moment(to).format('DD-MM-yyyy')}`;
    }
  }
  if (eventFilter) {
    filterText = `${filterText} | ${eventFilter}`;
  }

  return (
    <Background>
      <NavBar
        onLeftIconPressed={() => {
          dispatch(Actions.fetchEvents(currentBox.id, DASHBOARD_MAX_EVENTS));
          navigation.goBack();
        }}
        title="Activity"
      />
      <View style={styles.col}>
        <TouchableOpacity style={styles.filter} onPress={() => navigation.navigate('ActivityFilters', route?.params)}>
          <Image style={styles.icon} source={FilterIcon} />
          <Text weight="semibold" size="regular" centered>Filter By</Text>
        </TouchableOpacity>
        <Text color="grey" size="small">{filterText}</Text>
      </View>
      <FlatList
        data={events}
        contentContainerStyle={styles.container}
        renderItem={({ item, index }) => (
          <>
            {index === 0 && <View style={styles.separator} />}
            <ActivityCard event={item} currentBox={currentBox} />
          </>
        )}
        onRefresh={refreshEvents}
        refreshing={isRefreshing}
        ListFooterComponent={isLoading && <ActivityIndicator color={Colors.light} />}
        onEndReached={fetchAddonEvents}
        onEndReachedThreshold={0.1}
        keyExtractor={(item) => item.key.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </Background>
  );
};

AllActivity.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object,
};

AllActivity.defaultProps = {
  route: null,
};

export default AllActivity;
