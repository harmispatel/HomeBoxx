import React, { useEffect } from 'react';
import {
  Text, Background, NavBar, Button, TextInput,
} from 'components';
import {
  StyleSheet, View, SafeAreaView, ActivityIndicator, Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Actions from 'actions';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { normalize } from 'utils/size';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Selectors from 'selectors';
import * as Yup from 'yup';
import Colors from 'themes/colors';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Your full name is required'),
});

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

const EnterName = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.fetchUser());
  }, []);
  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.FETCH_USER_REQUEST,
  ]));
  const isSubmitting = useSelector(Selectors.createLoadingSelector([
    Actions.UPDATE_USER_REQUEST,
  ]));

  const user = useSelector(Selectors.getUser);

  const onSubmit = (values) => {
    const { name } = values;
    dispatch(Actions.updateUser({
      name,
      // eslint-disable-next-line camelcase
      userMetadata: user?.user_metadata ? user.user_metadata : {},
    }));
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
          {isLoading ? <ActivityIndicator height={600} color={Colors.light} />
            : (
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text centered size="xlarge" weight="bold">Enter Name</Text>
                  <Text centered>Enter your full name to complete registration</Text>
                </View>
                <Formik
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                  initialValues={{
                    name: '',
                  }}
                >
                  {({ handleSubmit }) => (
                    <View style={styles.flex}>
                      <View style={styles.flex}>
                        <TextInput
                          name="name"
                          label="Full Name"
                          autoCapitalize="words"
                          autoCorrect={false}
                        />
                      </View>
                      <View style={styles.buttonContainer}>
                        <Button onPress={handleSubmit} isLoading={isSubmitting}>
                          <Text color="darkest" weight="bold" size="large">CONTINUE</Text>
                        </Button>
                      </View>
                    </View>
                  )}
                </Formik>
              </View>
            )}
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </Background>
  );
};

EnterName.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default EnterName;
