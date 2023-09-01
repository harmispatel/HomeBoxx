import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Image, View, SafeAreaView, TouchableOpacity,
} from 'react-native';
import {
  Background, NavBar, Text, TextInput, Button, Loading, PhoneNumberInput,
} from 'components';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Actions from 'actions';
import Selectors from 'selectors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserIcon, PhoneLightIcon } from 'images';
import { normalize } from 'utils/size';
import { useIsFocused } from '@react-navigation/native';
import * as Yup from 'yup';
import { DEFAULT_COUNTRY_CODE } from 'utils/phone';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: normalize(20),
  },
  icon: {
    width: normalize(25),
    height: normalize(25),
    marginRight: normalize(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  field: {
    paddingVertical: normalize(20),
  },
  space: {
    marginTop: normalize(20),
  },
  form: {
    flex: 1,
  },
  buttonContainer: {
    marginVertical: normalize(20),
  },
  verify: {
    marginBottom: normalize(10),
  },
});

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();

  const isUpdating = useSelector(Selectors.createLoadingSelector([
    Actions.UPDATE_USER_REQUEST,
  ]));


  const isFetching = useSelector(Selectors.createLoadingSelector([
    Actions.FETCH_USER_REQUEST,
  ]));

  const isFocused = useIsFocused();

  const user = useSelector(Selectors.getUser);
  const { phone_number: phoneNumber, phone_verified: isVerified } = user;

  const onSubmit = (values, { resetForm, initialValues }) => {
    dispatch(Actions.updateUser({
      name: values.name,
      phoneNumber: `${values.countryCode}${values.phoneNumber}`,
      userMetadata: {
        ...user.user_metadata,
      },
    },
    null,
    () => resetForm(initialValues)));
  };

  const onVerify = () => dispatch(Actions.smsPasswordless(phoneNumber));

  useEffect(() => {
    dispatch(Actions.fetchUser());
  }, [isFocused]);


  return (
    <Background>
      <NavBar
        title="Edit Personal Details"
        onLeftIconPressed={() => navigation.navigate('Dashboard')}
      />
      {isFetching ? <Loading />
        : (
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <Formik
              validationSchema={validationSchema}
              enableReinitialize
              initialValues={{
                name: user?.name,
                phoneNumber: phoneNumber ? phoneNumber.slice(3, phoneNumber.length) : '',
                countryCode: phoneNumber ? phoneNumber.slice(0, 3) : DEFAULT_COUNTRY_CODE,
              }}
              onSubmit={onSubmit}
            >
              {({ handleSubmit, values, setFieldValue }) => (
                <>
                  <View style={styles.form}>
                    <View style={styles.row}>
                      <Image source={UserIcon} style={styles.icon} resizeMode="contain" />
                      <Text size="large" weight="bold">Contact Details</Text>
                    </View>
                    <View style={styles.field}>
                      <TextInput name="name" label="Full Name" autoCapitalize="words" autoCorrect={false} />
                    </View>
                    <View style={[styles.row, styles.space]}>
                      <Image source={PhoneLightIcon} style={styles.icon} resizeMode="contain" />
                      <Text size="large" weight="bold" flex>Phone Number</Text>
                      {(!isVerified && `${values.countryCode}${values.phoneNumber}` === phoneNumber) && (
                        <TouchableOpacity onPress={onVerify}>
                          <Text>Verify now</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={styles.field}>
                      {(!isVerified && `${values.countryCode}${values.phoneNumber}` === phoneNumber) && (
                        <Text size="xsmall" color="red" style={styles.verify}>
                          Your phone number is not verified.
                          Please update or verify your phone number.
                        </Text>
                      )}
                      <PhoneNumberInput
                        countryCodeFieldName="countryCode"
                        phoneNumberFieldName="phoneNumber"
                        label="Phone Number"
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                    </View>
                  </View>
                  <SafeAreaView style={styles.buttonContainer}>
                    <Button onPress={handleSubmit} isLoading={isUpdating}>
                      <Text color="darkest" weight="bold">SAVE CHANGES</Text>
                    </Button>
                  </SafeAreaView>
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        ) }

    </Background>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Profile;
