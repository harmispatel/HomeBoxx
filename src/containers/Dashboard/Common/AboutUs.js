import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { normalize } from 'utils/size';
import { Text, Background, NavBar } from 'components';
import {
  PhoneLightIcon, EmailIcon, LocationLightIcon, LogoLight,
} from 'images';
import PropTypes from 'prop-types';
import Colors from 'themes/colors';
import * as about from 'utils/about';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    flexGrow: 1,
  },
  sectionContainer: {
    paddingVertical: normalize(10),
  },
  row: {
    paddingTop: normalize(10),
    flexDirection: 'row',
  },
  centered: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: normalize(25),
    width: normalize(20),
    margin: normalize(10),
  },
  logo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: normalize(80),
    width: normalize(80),
    marginVertical: normalize(10),
  },
  separator: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.greyest,
    width: '100%',
    marginVertical: normalize(20),
  },
  header: {
    marginVertical: normalize(5),
  },
  footer: {
    marginVertical: normalize(10),
    flex: 1,
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
});

const AboutUs = ({ navigation }) => (
  <Background>
    <NavBar onLeftIconPressed={() => navigation.goBack()} title="About Us" />
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.sectionContainer}>
          <Text style={styles.header} textAlign="left" color="lightest" size="large" weight="bold">Contact Us</Text>
          <View style={styles.row}>
            <Image style={styles.icon} source={PhoneLightIcon} />
            <View style={styles.centered}>
              <Text centered color="lightest" size="regular" weight="bold">{about.CONTACT_NO}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Image style={styles.icon} source={EmailIcon} />
            <View style={styles.centered}>
              <Text centered color="lightest" size="regular" weight="bold">{about.CONTACT_EMAIL}</Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.header} color="lightest" textAlign="left" size="large" weight="bold">Manufactured By</Text>
          <View style={styles.row}>
            <Image style={styles.icon} source={LocationLightIcon} />
            <View style={styles.centered}>
              <Text textAlign="left" color="lightest" size="regular" weight="bold">{about.MANUFACTURER}</Text>
              <Text textAlign="left" color="lightest" size="regular" weight="regular">{about.MANUFACTURER_ADDRESS}</Text>
            </View>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.flex}>
          <Image style={styles.logo} source={LogoLight} />
          <Text centered color="lightest" size="regular" weight="regular">
            {about.DESCRIPTION}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text centered color="lightest" size="regular" weight="regular">
            {about.COPYRIGHT}
          </Text>
          <Text centered size="small" weight="regular">
            {`App version ${about.VERSION} ${about.YEAR}`}
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  </Background>
);

AboutUs.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AboutUs;
