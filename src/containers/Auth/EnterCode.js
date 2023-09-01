import React from 'react';
import {
  Text, Background, NavBar, Button, CodeInput,
} from 'components';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Actions from 'actions';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { normalize } from 'utils/size';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Selectors from 'selectors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(20),
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingVertical: normalize(20),
  },
  flex: {
    flex: 1,
  },
});

const EnterCode = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.SMS_LOGIN_REQUEST,
  ]));

  const onSubmit = (values) => {
    if (route?.params?.phoneNumber) {
      const { params: { phoneNumber } } = route;
      dispatch(Actions.smsLogin(phoneNumber, values.code));
    }
  };

  return (
    <Background>
      <NavBar onLeftIconPressed={() => navigation.goBack()} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text centered size="xxlarge" weight="bold">Enter Code</Text>
              <Text centered>Enter the 6-digits code sent to your mobile number.</Text>
            </View>
            <Formik
              onSubmit={onSubmit}
              initialValues={{
                code: '',
              }}
            >
              {({ handleSubmit }) => (
                <View style={styles.flex}>
                  <View style={styles.flex}>
                    <CodeInput name="code" />
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button onPress={handleSubmit} isLoading={isLoading}>
                      <Text color="darkest" weight="bold" size="large">CONTINUE</Text>
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </Background>
  );
};

EnterCode.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default EnterCode;
