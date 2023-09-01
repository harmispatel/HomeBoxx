import React, { useState } from 'react';
import {
  Text, Background, NavBar, PINInput,
} from 'components';
import {
  StyleSheet, View, SafeAreaView, Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Selectors from 'selectors';
import Actions from 'actions';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { normalize } from 'utils/size';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

const EnterPIN = ({ navigation }) => {
  const dispatch = useDispatch();
  const [unconfirmedPin, setUnconfirmedPin] = useState(null);

  const isSubmitting = useSelector(Selectors.createLoadingSelector([
    Actions.UPDATE_USER_REQUEST,
  ]));

  const user = useSelector(Selectors.getUser);

  const onSubmit = (values, { resetForm }) => {
    const { pin } = values;
    if (unconfirmedPin) {
      if (unconfirmedPin === pin) {
        dispatch(Actions.updateUser({
          // eslint-disable-next-line camelcase
          userMetadata: user?.user_metadata ? { ...user.user_metadata, pin } : { pin },
        }));
      } else {
        setUnconfirmedPin(null);
        dispatch(Actions.showNotification({ text: 'PIN does not match!', variant: 'error', icon: 'error' }));
        resetForm({});
      }
    } else {
      setUnconfirmedPin(pin);
      resetForm({});
    }
  };

  const onBack = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'No',
          onPress: null,
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(Actions.signOut());
            navigation.navigate('PhoneNumber');
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <Background>
      <NavBar onLeftIconPressed={onBack} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text centered size="xlarge" weight="bold">
                {unconfirmedPin ? 'Confirm PIN' : 'Set PIN'}
              </Text>
              <Text centered size="small" weight="semibold">
                This number will be used to open any Homeboxx paired with your account.
                You can change it later in the profile section.
              </Text>
            </View>
            <Formik
              onSubmit={onSubmit}
              initialValues={{
                pin: '',
              }}
            >
              {({ handleSubmit }) => (
                <View style={styles.flex}>
                  <PINInput name="pin" onFilled={handleSubmit} disabled={isSubmitting} />
                </View>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </Background>
  );
};

EnterPIN.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default EnterPIN;
