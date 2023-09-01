import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Image,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from 'themes/colors';
import { normalize, isIphoneX } from 'utils/size';
import { LogoLight } from 'images';
import Text from '../Text';

const isIos = Platform.OS === 'ios';
const INNER_STATUS_BAR_HEIGHT = isIphoneX() ? 44 : 20;
const STATUS_BAR_HEIGHT = isIos ? INNER_STATUS_BAR_HEIGHT : 0;
const INNER_HEADER_HEIGHT = isIphoneX() ? 98 : 74;
const HEADER_HEIGHT = isIos ? INNER_HEADER_HEIGHT : 55;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    position: 'relative',
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: Colors.transparent,
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: STATUS_BAR_HEIGHT,
    left: 0,
    right: 0,
  },
  elementRight: {
    position: 'absolute',
    right: 20,
    top: 5,
    bottom: 5,
    minWidth: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconLeft: {
    position: 'absolute',
    left: 0,
    top: 5,
    bottom: 0,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: undefined,
    flex: 1,
    marginVertical: normalize(10),
  },
});

const NavBar = ({
  onLeftIconPressed, leftIconName, leftIconColor, title, children, onRightElementPressed,
  rightElementColor, rightIconName, rightTextName, rightElement, backgroundColor, containerStyle,
  leftElement,
}) => {
  const renderLeftElement = () => {
    if (onLeftIconPressed) {
      return (
        <TouchableOpacity style={styles.iconLeft} onPress={onLeftIconPressed}>
          {!leftElement && <Icon name={leftIconName} size={normalize(30)} color={leftIconColor} />}
          {leftElement && leftElement}
        </TouchableOpacity>
      );
    }
    return false;
  };

  const renderCenterElement = () => {
    if (children) {
      return children;
    }
    if (title === null) {
      return <Image source={LogoLight} style={styles.logo} resizeMode="contain" />;
    }
    return <Text size="large" weight="bold" color="lightest">{title}</Text>;
  };

  const renderRightElement = () => {
    const RightElement = onRightElementPressed ? TouchableOpacity : View;
    return (
      <RightElement style={styles.elementRight} onPress={onRightElementPressed}>
        {rightIconName
          && <Icon name={rightIconName} size={normalize(18)} color={rightElementColor} />}
        {rightTextName && <Text>{rightTextName}</Text>}
        {rightElement !== null && rightElement}
      </RightElement>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.statusBar, backgroundColor && { backgroundColor }]} />
      <View style={[styles.navBar, backgroundColor && { backgroundColor }, containerStyle]}>
        {renderLeftElement()}
        {renderCenterElement()}
        {renderRightElement()}
      </View>
    </View>
  );
};

NavBar.propTypes = {
  title: PropTypes.string,
  leftIconName: PropTypes.string,
  rightIconName: PropTypes.string,
  rightTextName: PropTypes.string,
  leftIconColor: PropTypes.string,
  rightElementColor: PropTypes.string,
  onLeftIconPressed: PropTypes.func,
  onRightElementPressed: PropTypes.func,
  rightElement: PropTypes.any,
  backgroundColor: PropTypes.string,
  containerStyle: PropTypes.object,
  children: PropTypes.element,
  leftElement: PropTypes.any,
};

NavBar.defaultProps = {
  title: null,
  leftIconName: 'chevron-left',
  rightIconName: null,
  rightTextName: null,
  leftIconColor: Colors.lightest,
  rightElementColor: Colors.lightest,
  onLeftIconPressed: null,
  onRightElementPressed: null,
  rightElement: null,
  backgroundColor: null,
  containerStyle: {},
  children: null,
  leftElement: null,
};

export default NavBar;
