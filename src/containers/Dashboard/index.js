import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import Colors from 'themes/colors';
import { normalize } from 'utils/size';
import {
  Background, NavBar, ScreenCover, Animation,
} from 'components';
import {
  BurgerIcon,
  BellIcon,
} from 'images';
import { PropTypes } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Selectors from 'selectors';
import Actions from 'actions';
import CONFIG from 'react-native-config';
import { BoxTypes } from 'utils/box';
import { SecureCodeTypes } from 'utils/secureCode';
import BoxHeader from './Box/Widgets/Header';
import BoxCarousel from './Box/Widgets/Carousel';
import BoxAddress from './Box/Widgets/Address';
import BoxTemperature from './Box/Widgets/Temperature';
import BoxSecureCode from './Box/Widgets/SecureCode';
import BoxLatestActivity from './Box/Widgets/LatestActivity';
import TemperatureControl from './Box/Widgets/TemperatureControl';
import Advertisement from './Box/Widgets/Advertisement';
import Simulate from './Box/Simulate';
// import Slider from './Box/Slider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  widgetBorders: {
    backgroundColor: `${Colors.dark}60`,
    borderWidth: 1,
    borderRadius: normalize(10),
    borderColor: Colors.greyest,
    padding: normalize(20),
  },
  headerContainer: {
    marginHorizontal: normalize(20),
  },
  footerContainer: {
    padding: normalize(20),
    backgroundColor: Colors.dark,
    zIndex: 3,
  },
  widgetContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: normalize(10),
    marginHorizontal: normalize(20),
  },
  actionIcon: {
    alignSelf: 'center',
    maxHeight: normalize(35),
    maxWidth: normalize(35),
    resizeMode: 'contain',
    marginVertical: normalize(10),
  },
  bottomBanner: {
    backgroundColor: Colors.greyest,
  },
  menu: {
    width: normalize(20),
  },
  bell: {
    width: normalize(18),
  },
  dot: {
    width: normalize(10),
    height: normalize(10),
    borderRadius: normalize(5),
    backgroundColor: Colors.red,
    position: 'absolute',
    top: normalize(25),
    right: normalize(-4),
    zIndex: 1,
  },
});

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const boxes = useSelector(Selectors.getBoxes);
  const ads = useSelector(Selectors.getAds);
  const currentBox = useSelector(Selectors.getCurrentBox);
  const lockState = useSelector(Selectors.getLockState);
  const hasNotification = useSelector(Selectors.hasNotification);
  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.LIST_BOXES_REQUEST,
    Actions.LIST_ADS_REQUEST,
  ]));
  const isTempControlToggling = useSelector(Selectors.createLoadingSelector([
    Actions.TOGGLE_TEMP_CONTROL_REQUEST,
  ]));

  const fetchDashData = () => {
    dispatch(Actions.listBoxes());
    dispatch(Actions.listAds());
  };

  useEffect(() => {
    fetchDashData();
  }, []);

  const coverScreen = lockState?.isLoading || isTempControlToggling;
  const getAnimationType = () => {
    if (lockState?.isLoading) return 'lock';
    return 'tempControl';
  };

  return (
    <Background>
      <NavBar
        onLeftIconPressed={() => navigation.openDrawer()}
        leftElement={<Image source={BurgerIcon} style={styles.menu} resizeMode="contain" />}
        rightElement={(
          <View style={{ position: 'relative' }}>
            {hasNotification && <View style={styles.dot} />}
            <Image source={BellIcon} style={styles.bell} resizeMode="contain" />
          </View>
        )}
        onRightElementPressed={() => navigation.navigate('Notification')}
      />
      <ScreenCover
        visible={currentBox && coverScreen}
        coverSlider={isTempControlToggling}
      >
        <Animation type={getAnimationType()} />
      </ScreenCover>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchDashData} />
        }
        contentContainerStyle={styles.contentContainer}
      >
        <SafeAreaView style={styles.container}>
          <BoxHeader
            style={[styles.headerContainer]}
            currentBox={currentBox}
            isVisible={!isLoading}
            navigation={navigation}
          />
          <BoxCarousel
            style={[styles.widgetContainer, currentBox ? null : styles.widgetBorders]}
            isVisible={!isLoading}
            boxes={boxes}
            currentBox={currentBox}
            navigation={navigation}
          />
          <BoxTemperature
            style={[styles.widgetContainer]}
            isVisible={!isLoading}
            currentBox={currentBox}
          />
          <TemperatureControl
            style={[styles.widgetContainer]}
            isVisible={!isLoading
               && (currentBox?.boxType !== null && currentBox?.boxType === BoxTypes.active)}
            currentBox={currentBox}
          />
          <BoxSecureCode
            style={[styles.widgetContainer]}
            isVisible={!isLoading}
            currentBox={currentBox}
            navigation={navigation}
            type={SecureCodeTypes.fiveMinutes}
          />
          <BoxSecureCode
            style={[styles.widgetContainer]}
            isVisible={!isLoading}
            currentBox={currentBox}
            navigation={navigation}
            type={SecureCodeTypes.fullDay}
          />
          {/* eslint-disable-next-line no-undef */}
          {(__DEV__ || CONFIG.ENVIRONMENT === 'staging') && (
          <Simulate
            isVisible={!isLoading && !!currentBox}
            navigation={navigation}
          />
          )}
          <BoxAddress
            style={[styles.widgetContainer, styles.widgetBorders]}
            isVisible={!isLoading}
            currentBox={currentBox}
            navigation={navigation}
          />
          <Advertisement
            isVisible={!isLoading}
            ads={ads}
          />
          <BoxLatestActivity
            style={[styles.widgetContainer]}
            isVisible={!isLoading}
            currentBox={currentBox}
            navigation={navigation}
          />
        </SafeAreaView>
      </ScrollView>
      {/* Removed until firmware is ready */}
      {/* {
      !isLoading && currentBox
      && (
      <View style={styles.footerContainer}>
        <Slider currentBox={currentBox} />
      </View>
      )
      } */}
    </Background>
  );
};

Dashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Dashboard;
