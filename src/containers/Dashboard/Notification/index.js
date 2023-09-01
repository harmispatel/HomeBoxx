import React, { useEffect, useState } from 'react';
import {
  View, FlatList, StyleSheet, ActivityIndicator,
} from 'react-native';
import { Background, NavBar, Text } from 'components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { normalize } from 'utils/size';
import Actions from 'actions';
import Selectors from 'selectors';
import Colors from 'themes/colors';
import NotificationCard from './NotificationCard';

const styles = StyleSheet.create({
  container: {
    padding: normalize(10),
    flexGrow: 1,
  },
  separator: {
    paddingVertical: normalize(10),
  },
  end: {
    paddingVertical: normalize(20),
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Notification = ({ navigation }) => {
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);

  const listNotifications = () => dispatch(Actions.listNotifications(() => setHasMore(true)));

  useEffect(() => {
    dispatch(Actions.clearNotification());
    listNotifications();
  }, []);

  const isRefreshing = useSelector(Selectors.createLoadingSelector([
    Actions.LIST_NOTIFICATIONS_REQUEST,
  ]));

  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.PAGINATE_NOTIFICATIONS_REQUEST,
  ]));

  const notifications = useSelector(Selectors.getNotifications);

  const paginate = () => {
    if (hasMore) {
      const last = notifications[notifications.length - 1];
      dispatch(Actions.paginateNotifications(last, () => setHasMore(false)));
    }
  };

  return (
    <Background>
      <NavBar title="Notifications" onLeftIconPressed={() => navigation.goBack()} />
      <FlatList
        data={notifications}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <NotificationCard {...item} />
        )}
        onRefresh={listNotifications}
        refreshing={isRefreshing}
        ListFooterComponent={() => {
          if (isLoading) {
            return <ActivityIndicator color={Colors.light} style={styles.end} />;
          }
          if (!hasMore) {
            return <Text centered color="lightest" style={styles.end}>End of List</Text>;
          }
          return null;
        }}
        ListEmptyComponent={(
          <View style={styles.empty}>
            <Text color="light">No notifications yet.</Text>
          </View>
        )}
        onEndReached={paginate}
        onEndReachedThreshold={0.1}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </Background>
  );
};

Notification.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Notification;
