import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, PanResponder, Animated, UIManager, Image, ActivityIndicator,
} from 'react-native';
import { Text } from 'components';
import { normalize } from 'utils/size';
import Colors from 'themes/colors';
import { LockedIcon, UnlockedIcon } from 'images';
import { connect } from 'react-redux';
import Actions from 'actions';
import { isEqual } from 'lodash';

// Enable LayoutAnimation on Android
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const buttonSize = 65;

const styles = {
  track: {
    height: normalize(buttonSize - 10),
    borderRadius: normalize(buttonSize / 2),
    justifyContent: 'center',
  },
  button: {
    width: normalize(buttonSize),
    height: normalize(buttonSize),
    borderRadius: normalize(buttonSize / 2),
    borderWidth: normalize(buttonSize / 10),
    borderColor: Colors.white,
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
  },
  icon: {
    maxHeight: normalize(25),
    maxWidth: normalize(25),
    resizeMode: 'contain',
  },
  loading: {
    paddingVertical: normalize(2),
  },
};


class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drag: new Animated.ValueXY(),
      moving: false,
      percent: 0,
      dimensions: { width: 0, height: 0 },
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        const { drag } = this.state;
        // eslint-disable-next-line no-underscore-dangle
        const positionXY = drag.__getValue();
        drag.setOffset(positionXY);
        drag.setValue({ x: 0, y: 0 });
      },
      // eslint-disable-next-line react/destructuring-assignment
      onPanResponderMove: Animated.event([null, { dx: this.state.drag.x }], {
        // limit sliding out of box
        listener: (event, gestureState) => {
          const { lockState: { isLocked, isLoading } } = this.props;
          const { drag } = this.state;

          let toX = gestureState.dx;
          if ((isLocked && toX < 0)
          || (!isLocked && toX > 0)) toX = 0;
          if ((isLocked && toX > this.getMaxDistance())
          || (!isLocked && toX < this.getMaxDistance())) toX = this.getMaxDistance();
          const percent = ((toX * 100) / this.getMaxDistance()).toFixed();
          this.setState({ percent });

          if (isLoading) {
            drag.setValue({ x: 0, y: 0 });
            return;
          }
          drag.setValue({ x: toX, y: 0 });
        },
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        const { percent } = this.state;
        const { lockState: { isLoading } } = this.props;
        if (percent >= 100) {
          this.setState({ moving: false });
          this.onReachedTarget();
        } else if (!isLoading) {
          this.reset();
        }
      },
      onPanResponderTerminate: () => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        // console.log("onPanResponderTerminate", gestureState);
      },
    });
  }

  componentDidUpdate(prevProps) {
    const { lockState: prevLockState } = prevProps;
    const { lockState } = this.props;
    if (!isEqual(lockState, prevLockState) && !lockState.isLoading) {
      this.forceReset();
    }
  }


  onReachedTarget = () => {
    const {
      currentBox, lockState: { isLoading, isLocked }, lockBox, unlockBox,
    } = this.props;
    if (!currentBox) return;
    const { drag } = this.state;
    if (isLoading) return;
    if (isLocked) {
      unlockBox(currentBox.id, () => {
        drag.setValue({ x: 0, y: 0 });
      });
    } else {
      lockBox(currentBox.id, () => {
        drag.setValue({ x: 0, y: 0 });
      });
    }
  }

  getMaxDistance() {
    const { lockState: { isLocked } } = this.props;
    const { dimensions: { width } } = this.state;
    const maxDistance = width - normalize((buttonSize));
    if (!isLocked) return -maxDistance;
    return maxDistance;
  }

  isMoving() {
    const { moving } = this.state;
    return moving;
  }

  reset() {
    const { lockState: { isLocked } } = this.props;
    const { drag } = this.state;
    let toX = 0;
    if (!isLocked) toX = Math.abs(this.getMaxDistance());
    drag.setOffset({ x: toX, y: 0 });
    Animated.timing(drag, {
      toValue: { x: 0, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start();
    this.setState({ moving: false, percent: 0 });
  }

  forceReset() {
    const { lockState: { isLocked } } = this.props;
    const { drag } = this.state;
    let toX = 0;
    if (!isLocked) toX = Math.abs(this.getMaxDistance());
    drag.setOffset({ x: toX, y: 0 });
    drag.setValue({ x: 0, y: 0 });
    this.setState({ moving: false, percent: 0 });
  }

  renderButtonContents() {
    const { lockState: { isLoading, isLocked } } = this.props;
    if (isLoading) {
      return (
        <ActivityIndicator style={styles.loading} color={Colors.light} />
      );
    }
    return (
      <Image style={styles.icon} source={isLocked ? LockedIcon : UnlockedIcon} />
    );
  }

  render() {
    const { lockState: { isLoading, isLocked } } = this.props;
    const { drag } = this.state;
    const position = { transform: drag.getTranslateTransform() };

    let text = 'PLEASE WAIT...';
    let backgroundColor = Colors.greyest;
    if (isLoading) {
      if (isLocked) text = 'UNLOCKING BOX...';
      if (!isLocked) text = 'LOCKING BOX...';
    } else if (isLocked) {
      text = 'SWIPE RIGHT TO UNLOCK';
      backgroundColor = Colors.green;
    } else if (!isLocked) {
      text = 'SWIPE LEFT TO LOCK';
      backgroundColor = Colors.yellow;
    }

    return (
      <View
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          this.setState({
            dimensions: { width, height },
          }, this.forceReset);
        }}
        style={styles.track}
        backgroundColor={backgroundColor}
      >
        <Text size="regular" weight="semibold" color={Colors.white} centered style={styles.text}>
          {text}
        </Text>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            position,
            styles.button,
          ]}
        >
          {this.renderButtonContents()}
        </Animated.View>
      </View>
    );
  }
}

Slider.propTypes = {
  currentBox: PropTypes.object,
  lockState: PropTypes.object,
  lockBox: PropTypes.func,
  unlockBox: PropTypes.func,
  lockBoxSuccess: PropTypes.func,
  unlockBoxSuccess: PropTypes.func,
};
Slider.defaultProps = {
  currentBox: null,
  lockState: null,
  lockBox: null,
  unlockBox: null,
  lockBoxSuccess: null,
  unlockBoxSuccess: null,
};

function mapStateToProps(state) {
  return {
    lockState: state.BOX.lock,
  };
}

const mapDispatchToProps = {
  lockBox: Actions.lockBox,
  unlockBox: Actions.unlockBox,
  lockBoxSuccess: Actions.lockBoxSuccess,
  unlockBoxSuccess: Actions.unlockBoxSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
