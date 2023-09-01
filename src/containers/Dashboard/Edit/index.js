import React from 'react';
import {
  StyleSheet, View, Image, SafeAreaView,
} from 'react-native';
import {
  Background, Text, NavBar, TextInput, LocationInput, Button,
} from 'components';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AddressIcon } from 'images';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Actions from 'actions';
import Selectors from 'selectors';
import { normalize } from 'utils/size';

const styles = StyleSheet.create({
  icon: {
    width: normalize(30),
    height: normalize(30),
    marginRight: normalize(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(20),
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginVertical: normalize(20),
  },
  flex: {
    flex: 1,
  },
  divider: {
    paddingHorizontal: normalize(10),
  },
  halfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    padding: normalize(20),
  },
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Location name is required'),
  street: Yup.string().required('Street name is required'),
  postcode: Yup.string().required('Postcode is required'),
  city: Yup.string().required('City is required'),
});

const EditBox = ({ navigation, route }) => {
  const { box } = route.params;
  const dispatch = useDispatch();
  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.EDIT_BOX_REQUEST,
  ]));

  const place = useSelector(Selectors.getGooglePlaceDetail);

  const onSubmit = (values) => {
    dispatch(Actions.editBox(box.id, {
      name: values.name,
      ownerAddress: values.street,
      ownerCity: values.city,
      ownerPostalCode: values.postcode,
      latitude: place?.coordinates?.lat || 0,
      longitude: place?.coordinates?.lng || 0,
    }));
  };

  const onStreetPress = (setFieldValue) => {
    navigation.navigate('SearchAddress', {
      callback: ({ street, postcode, city }) => {
        setFieldValue('street', street);
        setFieldValue('postcode', postcode);
        setFieldValue('city', city);
      },
    });
  };

  return (
    <Background>
      <NavBar title="Edit Homeboxx" onLeftIconPressed={() => navigation.goBack()} />
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Image source={AddressIcon} style={styles.icon} resizeMode="contain" />
          <Text weight="bold" size="large">Box Address</Text>
        </View>
        <Formik
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
          initialValues={{
            name: box.name,
            street: box.ownerAddress,
            postcode: box.ownerPostalCode,
            city: box.ownerCity,
          }}
        >
          {({ setFieldValue, handleSubmit }) => (
            <>
              <View style={styles.flex}>
                <TextInput name="name" label="Location Name (e.g. Home)" />
                <LocationInput
                  name="street"
                  label="Street Name"
                  onPress={() => onStreetPress(setFieldValue)}
                />
                <View style={styles.halfContainer}>
                  <View style={styles.flex}>
                    <TextInput name="postcode" label="Postcode" />
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.flex}>
                    <TextInput name="city" label="City" />
                  </View>
                </View>
              </View>
              <SafeAreaView style={styles.buttonContainer}>
                <Button onPress={handleSubmit} isLoading={isLoading}>
                  <Text weight="bold" color="darkest">SAVE CHANGES</Text>
                </Button>
              </SafeAreaView>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </Background>
  );
};

EditBox.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default EditBox;
