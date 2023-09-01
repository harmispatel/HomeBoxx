import React, { useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  PermissionsAndroid,
} from 'react-native';
import {
  Background, NavBar, Button, Text, Form, PhoneNumberInput,
} from 'components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { normalize } from 'utils/size';
import { removeCountryCode } from 'utils/phoneNumber';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Selectors from 'selectors';
import Actions from 'actions';
import { Formik } from 'formik';
import Colors from 'themes/colors';
import * as Yup from 'yup';
import { selectContactPhone } from 'react-native-select-contact';
import { DEFAULT_COUNTRY_CODE } from 'utils/phone';

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Phone number is required'),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: normalize(20),
  },
  phoneNumberInput: {
    flex: 1,
  },
  margin: {
    marginVertical: normalize(20),
  },
  contactsButton: {
    backgroundColor: `${Colors.darker}60`,
    borderWidth: 1,
    borderColor: Colors.greyest,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: normalize(20),
  },
});

const ShareBox = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.FIND_USER_REQUEST,
    Actions.SHARE_BOX_REQUEST,
  ]));

  useEffect(() => {
    dispatch(Actions.clearFoundUser());
  }, []);

  const userExists = useSelector(Selectors.userExists);
  const userData = useSelector(Selectors.getFoundUser);

  const selectFromContacts = async (setFieldValue) => {
    const phoneNumber = await selectContactPhone()
      .then((selection) => {
        if (!selection) return null;
        const { selectedPhone } = selection;
        return selectedPhone.number;
      });
    if (!phoneNumber) return;
    setFieldValue('phoneNumber', removeCountryCode(phoneNumber));
  };

  return (
    <Background>
      <NavBar
        onLeftIconPressed={navigation.goBack}
        title="Share Homeboxx"
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.margin} size="regular" weight="regular" centered>
            {!userExists
              ? 'Enter the phone number you would like to share this Homeboxx with.'
              : 'Share this Homeboxx with user: '}
          </Text>
          {userExists
          && (
          <>
            <Text style={styles.margin} size="large" weight="bold" centered>
              {userData.name}
            </Text>
            <Button
              onPress={() => {
                const { params: { box: { id } } } = route;
                dispatch(Actions.shareBox(id, userData.id, () => {
                  navigation.goBack();
                }));
              }}
              isLoading={isLoading}
            >
              <Text color="darkest" weight="semibold">SHARE</Text>
            </Button>
          </>
          )}
          <Formik
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (!userExists) {
                dispatch(Actions.findUser({
                  phoneNumber: `${values.countryCode}${values.phoneNumber}`,
                }));
              }
            }}
            initialValues={{
              phoneNumber: '',
              countryCode: DEFAULT_COUNTRY_CODE,
            }}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <>
                {!userExists
                  && (
                  <>
                    <View style={styles.phoneNumberInput}>
                      <Form>
                        <PhoneNumberInput
                          countryCodeFieldName="countryCode"
                          phoneNumberFieldName="phoneNumber"
                          label="Phone Number"
                          values={values}
                          setFieldValue={setFieldValue}
                        />
                      </Form>
                      <Text color="grey" centered>OR</Text>
                      <Button
                        style={styles.contactsButton}
                        onPress={() => {
                          dispatch(Actions.requestPermission(
                            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                            {
                              title: 'Allow Contacts Access',
                              message:
                          'Allow Homeboxx to read contact information?',
                              buttonNegative: 'Cancel',
                              buttonPositive: 'OK',
                            },
                            () => { selectFromContacts(setFieldValue); },
                          ));
                        }}
                      >
                        <Text color="light" weight="semibold">SELECT PHONE CONTACTS</Text>
                      </Button>
                    </View>
                    <Button onPress={handleSubmit} isLoading={isLoading}>
                      <Text color="darkest" weight="semibold">CHECK</Text>
                    </Button>
                  </>
                  )}
              </>
            )}
          </Formik>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </Background>
  );
};

ShareBox.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default ShareBox;
