import React from 'react';
import {
  Background, NavBar, Button, Text,
} from 'components';
import {
  View, StyleSheet, SafeAreaView, Image,
} from 'react-native';
import { HomeboxxOutline, PairIcon } from 'images';
import PropTypes from 'prop-types';
import { normalize, getScreenWidth } from 'utils/size';
import { useSelector, useDispatch } from 'react-redux';
import Selectors from 'selectors';
import Actions from 'actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: getScreenWidth() * 0.8,
  },
  buttonContainer: {
    margin: normalize(20),
  },
  icon: {
    height: normalize(20),
    width: normalize(20),
    marginRight: normalize(20),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Pair = ({ navigation }) => {
  const dispatch = useDispatch();
  const boxes = useSelector(Selectors.getBoxes);
  return (
    <Background>
      <NavBar title="Pair Homeboxx" onLeftIconPressed={() => navigation.goBack()} />
      <View style={styles.container}>
        <Image source={HomeboxxOutline} style={styles.image} resizeMode="contain" />
      </View>
      <SafeAreaView style={styles.buttonContainer}>
        <Button onPress={() => {
          if (boxes && boxes.length >= 5) {
            dispatch(Actions.showNotification({ text: 'Maximum of 5 boxes reached', variant: 'error', icon: 'error' }));
          } else {
            navigation.navigate('PairRequest');
          }
        }}
        >
          <View style={styles.button}>
            <Image source={PairIcon} style={styles.icon} resizeMode="contain" />
            <Text color="darkest" weight="bold">READY TO PAIR</Text>
          </View>
        </Button>
      </SafeAreaView>
    </Background>
  );
};

Pair.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Pair;
