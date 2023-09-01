import React, { useState, useEffect } from 'react';
import {
  Text, Background, NavBar, PINInput, Loading,
} from 'components';
import {
  StyleSheet, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Selectors from 'selectors';
import Actions from 'actions';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { normalize, getScreenHeight } from 'utils/size';
import Colors from 'themes/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  description: {
    paddingTop: normalize(10),
  },
  currentPin: {
    backgroundColor: `${Colors.dark}80`,
    paddingVertical: normalize(10),
    alignItems: 'center',
  },
  pin: {
    letterSpacing: 2,
    paddingTop: normalize(10),
  },
  numberPad: {
    flex: 1,
    paddingHorizontal: normalize(20),
    marginBottom: normalize(20),
  },
  header: {
    minHeight: getScreenHeight() / 10,
  },
});

const EditPIN = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(Selectors.getUser);
  const { user_metadata: userMetadata } = user;

  const [unconfirmedPin, setUnconfirmedPin] = useState(null);

  useEffect(() => {
    dispatch(Actions.fetchUser());
  }, []);

  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.FETCH_USER_REQUEST,
  ]));

  const isUpdating = useSelector(Selectors.createLoadingSelector([
    Actions.UPDATE_USER_REQUEST,
  ]));

  const onBack = () => {
    if (unconfirmedPin !== null) {
      setUnconfirmedPin(null);
    } else {
      navigation.goBack();
    }
  };

  const onSubmit = (values, { resetForm }) => {
    const { pin } = values;
    if (unconfirmedPin) {
      if (unconfirmedPin === pin) {
        dispatch(Actions.updateUser({
          userMetadata: {
            pin,
          },
        }, () => navigation.navigate('Dashboard')));
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

  let title = 'Enter Current PIN';
  let description = 'Enter your new desired PIN Code to change';
  if (unconfirmedPin) {
    title = 'Confirm New PIN';
    description = 'Please confirm your new desired PIN Code to change';
  } else {
    title = 'Change New PIN';
  }

  return (
    <Background>
      <NavBar onLeftIconPressed={onBack} title={title} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {isLoading ? <Loading />
          : (
            <View style={styles.flex}>
              <View style={styles.header}>
                {unconfirmedPin === null && (
                  <View style={styles.currentPin}>
                    <Text weight="bold">YOUR CURRENT PIN CODE</Text>
                    <Text weight="bold" style={styles.pin}>{userMetadata?.pin}</Text>
                  </View>
                )}
                <Text centered size="small" weight="semibold" style={styles.description}>
                  {description}
                </Text>
              </View>
              <Formik
                onSubmit={onSubmit}
                initialValues={{
                  pin: '',
                }}
              >
                {({ handleSubmit }) => (
                  <View style={styles.numberPad}>
                    <PINInput name="pin" onFilled={handleSubmit} disabled={isUpdating} />
                  </View>
                )}
              </Formik>
            </View>
          )}
      </KeyboardAwareScrollView>
    </Background>
  );
};

EditPIN.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default EditPIN;
