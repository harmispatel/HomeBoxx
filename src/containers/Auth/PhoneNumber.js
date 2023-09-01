import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Text, Button, Background } from 'components';
import { LogoLight } from 'images';
import { normalize } from 'utils/size';
import { useDispatch, useSelector } from 'react-redux';
import Actions from 'actions';
import Selectors from 'selectors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: normalize(80),
    height: normalize(80),
    marginBottom: normalize(20),
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(20),
  },
  form: {
    flex: 1,
    paddingHorizontal: normalize(20),
  },
  contentContainer: {
    flexGrow: 1,
  },
  buttonContainer: {
    padding: normalize(20),
  },
});

const PhoneNumber = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.WEB_AUTH_REQUEST,
    Actions.SMS_PASSWORDLESS_REQUEST,
  ]));

  const webAuth = () => dispatch(Actions.webAuth());

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={LogoLight} style={styles.logo} resizeMode="contain" />
          <Text size="xlarge" weight="bold" centered>Welcome to Homeboxx</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={webAuth} isLoading={isLoading}>
            <Text color="darkest" weight="bold">START HERE</Text>
          </Button>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default PhoneNumber;
