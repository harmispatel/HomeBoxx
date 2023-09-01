import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from 'themes/colors';
import { normalize, getScreenHeight, getScreenWidth } from 'utils/size';
import { Text } from 'components';
import {
  AddIcon,
  PlaceholderBox,
} from 'images';
import PropTypes from 'prop-types';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useDispatch } from 'react-redux';
import Actions from 'actions';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    alignSelf: 'center',
    maxHeight: normalize(35),
    maxWidth: normalize(35),
    resizeMode: 'contain',
    marginVertical: normalize(10),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  arrowRight: {
    width: 0,
    height: 0,
    borderWidth: normalize(15),
    borderLeftColor: Colors.light,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
  },
  arrowLeft: {
    width: 0,
    height: 0,
    borderWidth: normalize(15),
    borderRightColor: Colors.light,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  arrowHidden: {
    width: 0,
    height: 0,
    borderWidth: normalize(15),
    borderColor: 'transparent',
  },
  paginationDot: {
    width: normalize(30),
    height: normalize(5),
    borderRadius: normalize(5),
  },
});

const BoxSelector = ({
  boxes, currentBox, navigation, style, isVisible,
}) => {
  if (!isVisible) return null;
  if (!currentBox) {
    return (
      <TouchableOpacity
        style={[...style, { height: getScreenHeight() * 0.4 }]}
        onPress={() => navigation.navigate('Pair')}
      >
        <Image style={styles.actionIcon} source={AddIcon} />
        <Text size="small" weight="semibold" centered>Pair your Homeboxx to monitor from your phone</Text>
      </TouchableOpacity>
    );
  }

  const dispatch = useDispatch();
  const setCurrentBox = (box) => { dispatch(Actions.setCurrentBox(box)); };
  const currentIndex = boxes.findIndex((box) => (box.id === currentBox.id));
  const boxLength = boxes.length;
  return (
    <View
      style={[...style]}
    >
      {/* <Pagination
        dotsLength={boxLength}
        containerStyle={styles.container}
        activeDotIndex={currentIndex}
        dotStyle={styles.paginationDot}
        dotColor={Colors.white}
        inactiveDotColor={Colors.grey}
        inactiveDotStyle={styles.paginationDot}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      /> */}
      <View flexDirection="row" style={styles.container}>
        <TouchableOpacity
          style={currentIndex > 0 ? styles.arrowLeft : styles.arrowHidden}
          disabled={currentIndex <= 0}
          onPress={() => setCurrentBox(boxes[currentIndex - 1])}
        />
        <View style={styles.container} maxHeight={normalize(180)}>
          {/* <Carousel
            layout="default"
            data={boxes}
            renderItem={() => (
              <Image style={styles.image} source={PlaceholderBox} />
            )}
            sliderWidth={getScreenWidth() * 0.8}
            itemWidth={getScreenWidth() * 0.8}
            onBeforeSnapToItem={(index) => (setCurrentBox(boxes[index]))}
          /> */}
        </View>
        <TouchableOpacity
          style={currentIndex < (boxLength - 1) ? styles.arrowRight : styles.arrowHidden}
          disabled={currentIndex >= (boxLength - 1)}
          onPress={() => setCurrentBox(boxes[currentIndex + 1])}
        />
      </View>
    </View>
  );
};

BoxSelector.propTypes = {
  boxes: PropTypes.array,
  currentBox: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  style: PropTypes.array,
  isVisible: PropTypes.bool,
};

BoxSelector.defaultProps = {
  boxes: null,
  currentBox: null,
  style: [],
  isVisible: true,
};

export default BoxSelector;
