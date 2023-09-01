import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Animated, } from 'react-native';
import { LogoDark, LogoLight, Background } from 'images';
import { normalize, getScreenWidth } from 'utils/size';
import Colors from 'themes/colors';
import Actions from 'actions';
import { useDispatch } from 'react-redux';

const LOGO_SIZE = normalize(getScreenWidth() / 3.5);
const BG_SIZE = normalize(getScreenWidth() / 1.5);

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    position: 'absolute',
  },
  bg: {
    width: BG_SIZE,
    height: BG_SIZE,
    borderRadius: BG_SIZE / 2,
    backgroundColor: Colors.darker,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

const SplashScreen = () => {
  const dispatch = useDispatch();
  const [initial] = useState(new Animated.Value(0));
  const [secondary] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(initial,
      { toValue: 1, duration: 1500, useNativeDriver: false })
      .start(() => {
        Animated.parallel([
          Animated.timing(initial, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(secondary, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]).start(() => {
          setTimeout(() => {
            dispatch(Actions.finishSplash());
          }, 500);
        });
      });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image source={LogoDark} style={[styles.logo, { opacity: initial }]} resizeMode="contain" />
      <AnimatedImageBackground source={Background} style={[styles.bg, { opacity: secondary }]}>
        <Animated.Image source={LogoLight} style={[styles.logo, { opacity: secondary }]} resizeMode="contain" />
      </AnimatedImageBackground>
    </View>
  );
};

export default SplashScreen;
