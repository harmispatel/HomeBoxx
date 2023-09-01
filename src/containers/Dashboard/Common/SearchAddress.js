import React, { useCallback } from 'react';
import {
  StyleSheet, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import {
  Background, NavBar, Text, TextInput,
} from 'components';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import Actions from 'actions';
import Selectors from 'selectors';
import debounce from 'lodash/debounce';
import { normalize } from 'utils/size';
import Colors from 'themes/colors';

const styles = StyleSheet.create({
  container: {
    padding: normalize(20),
  },
  prediction: {
    paddingVertical: normalize(20),
    borderBottomWidth: 1,
    borderColor: Colors.grey,
  },
  loading: {
    marginVertical: normalize(20),
  },
});

const SearchAddress = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.GOOGLE_AUTOCOMPLETE_REQUEST,
  ]));
  const predictions = useSelector(Selectors.getGooglePredictions);

  const googleAutocomplete = (value) => dispatch(Actions.googleAutocomplete(value));

  const onPlacePress = (data) => {
    const { callback } = route.params;
    dispatch(Actions.fetchGooglePlaceDetail(data, callback));
    navigation.goBack();
  };

  const onInputPress = (value) => {
    const { callback } = route.params;
    callback({ street: value });
    navigation.goBack();
  };

  const onChangeText = useCallback(debounce(googleAutocomplete, 1000), []);

  return (
    <Background>
      <NavBar title="Search Address" onLeftIconPressed={() => navigation.goBack()} />
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            search: '',
          }}
        >
          {({ values }) => (
            <>
              <TextInput
                name="search"
                onChangeText={onChangeText}
                label="Search address"
                autoCorrect={false}
                autoCapitalize="words"
              />
              {isLoading && <ActivityIndicator color={Colors.white} style={styles.loading} />}
              {!isLoading && (
                <>
                  {predictions.map((prediction) => (
                    <TouchableOpacity
                      key={prediction.id}
                      onPress={() => onPlacePress(prediction)}
                      style={styles.prediction}
                    >
                      <Text>{prediction.description}</Text>
                    </TouchableOpacity>
                  ))}
                  {values.search !== '' && (
                    <TouchableOpacity
                      style={styles.prediction}
                      onPress={() => onInputPress(values.search)}
                    >
                      <Text>{`"${values.search}"`}</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </Background>
  );
};

SearchAddress.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default SearchAddress;
