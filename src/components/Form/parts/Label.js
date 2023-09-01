import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Colors from 'themes/colors';
import {
  Animated,
  StyleSheet,
} from 'react-native';
import { normalize } from 'utils/size';

const DEFAULT_POSITION = 10;
const FOCUSED_POSITION = -8;
const DEFAULT_ANIMATION_DURATION = 225;
const DEFAULT_FONT_SIZE = normalize(14);
const ACTIVE_FONT_SIZE = normalize(12);
const DEFAULT_PLACEHOLDER_COLOR = Colors.grey;
const DEFAULT_ERROR_COLOR = Colors.red;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: normalize(34),
  },
});

class Label extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      input: new Animated.Value(this.inputState()),
      focus: new Animated.Value(this.focusState()),
    };
  }

  // TODO: convert this into a function component
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(props) {
    const { focus, input } = this.state;
    const {
      isActive, isFocused, isError,
    } = this.props;
    const duration = DEFAULT_ANIMATION_DURATION;

    if (isFocused ^ props.isFocused || isActive ^ props.isActive) { // eslint-disable-line
      const toValue = this.inputState(props);

      Animated
        .timing(input, { toValue, duration, useNativeDriver: false })
        .start();
    }

    if (isFocused ^ props.isFocused || isError ^ props.isError) { // eslint-disable-line
      const toValue = this.focusState(props);

      Animated
        .timing(focus, { toValue, duration, useNativeDriver: false })
        .start();
    }
  }

  inputState({ isFocused, isActive } = this.props) {
    return isActive || isFocused ? 1 : 0;
  }

  focusState({ isFocused, isError } = this.props) {
    // eslint-disable-next-line no-nested-ternary
    return isError ? -1 : (isFocused ? 1 : 0);
  }

  render() {
    const {
      children,
      fontSize,
      activeFontSize,
      isError,
      isFocused,
      isActive,
      errorColor,
      focusedColor,
      baseColor,
      onPress,
      ...props
    } = this.props;
    const { input, focus } = this.state;
    const color = focus.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [errorColor, baseColor, focusedColor],
    });

    const top = input.interpolate({
      inputRange: [0, 1],
      outputRange: [
        DEFAULT_POSITION,
        FOCUSED_POSITION,
      ],
    });

    const size = input.interpolate({
      inputRange: [0, 1],
      outputRange: [fontSize, activeFontSize],
    });

    const textStyle = {
      fontSize: size,
      color,
    };

    const containerStyle = {
      top,
    };

    return (
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.Text style={[textStyle]} {...props} onPress={onPress}>
          {children}
        </Animated.Text>
      </Animated.View>
    );
  }
}

Label.propTypes = {
  children: PropTypes.any.isRequired,
  isActive: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  fontSize: PropTypes.number,
  activeFontSize: PropTypes.number,
  focusedColor: PropTypes.string,
  baseColor: PropTypes.string,
  errorColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

Label.defaultProps = {
  fontSize: DEFAULT_FONT_SIZE,
  activeFontSize: ACTIVE_FONT_SIZE,
  focusedColor: DEFAULT_PLACEHOLDER_COLOR,
  baseColor: DEFAULT_PLACEHOLDER_COLOR,
  errorColor: DEFAULT_ERROR_COLOR,
};

export default Label;
