import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Colors from 'themes/colors';
import { normalize, getScreenHeight } from 'utils/size';
import { Text } from 'components';
import { ClockIcon } from 'images';
import PropTypes from 'prop-types';
import ActivityCard from 'components/ActivityCard';
import { useDispatch, useSelector } from 'react-redux';
import Selectors from 'selectors';
import Actions from 'actions';
import { DASHBOARD_MAX_EVENTS } from 'utils/events';

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: normalize(30),
    width: normalize(25),
    marginHorizontal: normalize(20),
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
});

const LatestActivity = ({
  navigation, currentBox, style, isVisible,
}) => {
  if (!isVisible) return null;
  const dispatch = useDispatch();
  const events = useSelector(Selectors.getEvents);
  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.FETCH_EVENTS_REQUEST,
  ]));

  useEffect(() => {
    if (!currentBox) return;
    dispatch(Actions.fetchEvents(currentBox.id, DASHBOARD_MAX_EVENTS));
  }, [currentBox]);

  const renderContent = (hasEvents) => {
    if (hasEvents) {
      return (
        events.map((event) => (
          <View key={event.key.toString()}>
            <ActivityCard event={event} currentBox={currentBox} />
            <View style={styles.separator} />
          </View>
        ))
      );
    }
    return (
      <>
        <Image style={styles.icon} source={ClockIcon} />
        <Text size="small" weight="semibold" centered>Your Homeboxx activities will appear here...</Text>
      </>
    );
  };

  const hasEvents = !!(currentBox && (events.length > 0));
  return (
    <View style={style}>
      <View style={styles.row}>
        <Text size="large" weight="bold">Latest Activity</Text>
        <View style={styles.spacer} />
        {hasEvents && (
        <TouchableOpacity onPress={() => { navigation.navigate('AllActivity'); }}>
          <Text size="regular" weight="semibold">View All</Text>
        </TouchableOpacity>
        )}
      </View>
      <View style={styles.separator} />
      <View
        style={[
          styles.container,
          (isLoading || !hasEvents) && { minHeight: getScreenHeight() * 0.2 },
        ]}
      >
        {isLoading ? (<ActivityIndicator color={Colors.light} />) : (renderContent(hasEvents))}
      </View>
    </View>
  );
};

LatestActivity.propTypes = {
  navigation: PropTypes.object.isRequired,
  currentBox: PropTypes.object,
  style: PropTypes.array,
  isVisible: PropTypes.bool,
};

LatestActivity.defaultProps = {
  currentBox: null,
  style: [],
  isVisible: true,
};

export default LatestActivity;
