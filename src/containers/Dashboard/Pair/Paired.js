import React, { useEffect } from 'react';
import {
  View, StyleSheet, Image, SafeAreaView,
} from 'react-native';
import {
  Background, NavBar, Text, TextInput, Button, LocationInput,
} from 'components';
import PropTypes from 'prop-types';
import { normalize, getScreenWidth } from 'utils/size';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AddressIcon, PlaceholderBox } from 'images';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Actions from 'actions';
import Selectors from 'selectors';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Location name is required'),
  street: Yup.string().required('Street name is required'),
  postcode: Yup.string().required('Postcode is required'),
  city: Yup.string().required('City is required'),
});

const styles = StyleSheet.create({
  header: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(20),
  },
  content: {
    flex: 0.7,
    padding: normalize(20),
  },
  subtitle: {
    paddingVertical: normalize(10),
  },
  icon: {
    width: normalize(30),
    height: normalize(30),
    marginRight: normalize(20),
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(20),
    flex: 1,
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
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: getScreenWidth() * 0.8,
    height: getScreenWidth() * 0.8,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

const Paired = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.EDIT_BOX_REQUEST,
    Actions.FETCH_BOX_REQUEST,
  ]));

  const box = useSelector(Selectors.getBox);

  const place = useSelector(Selectors.getGooglePlaceDetail);

  useEffect(() => {
    const { box: newBox } = route.params;
    dispatch(Actions.fetchBox(newBox.boxId));
  }, []);

  const onStreetPress = (setFieldValue) => {
    navigation.navigate('SearchAddress', {
      callback: ({ street, postcode, city }) => {
        setFieldValue('street', street);
        setFieldValue('postcode', postcode);
        setFieldValue('city', city);
      },
    });
  };

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

  return (
    <Background>
      <NavBar
        onLeftIconPressed={() => {
          dispatch(Actions.listBoxes());
          navigation.navigate('Dashboard');
        }}
        title="Pair Homeboxx"
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text centered size="xlarge" weight="xbold">Awesome!</Text>
          <Text centered style={styles.subtitle}>
            Your Homeboxx is now accessible through your device. Kindly add your address to proceed.
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image source={PlaceholderBox} style={styles.image} resizeMode="contain" />
          </View>
          <View style={styles.address}>
            <Image source={AddressIcon} style={styles.icon} resizeMode="contain" />
            <Text weight="bold" size="large">Box Address</Text>
          </View>
          <Formik
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            initialValues={{
              name: '',
              street: '',
              postcode: '',
              city: '',
            }}
          >
            {({ setFieldValue, handleSubmit }) => (
              <>
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
                <SafeAreaView style={styles.buttonContainer}>
                  <Button onPress={handleSubmit} isLoading={isLoading}>
                    <Text weight="bold" color="darkest">CONFIRM</Text>
                  </Button>
                </SafeAreaView>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </Background>
  );
};

Paired.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Paired;
