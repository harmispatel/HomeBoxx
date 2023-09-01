import React from 'react';
import { Modal as RNModal, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Colors from 'themes/colors';
import { normalize, getScreenHeight } from 'utils/size';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    paddingHorizontal: normalize(20),
    flex: 1,
  },
  inner: {
    backgroundColor: Colors.white,
    borderRadius: normalize(5),
    minHeight: getScreenHeight() / 2,
  },
});

const Modal = ({ isVisible, onRequestClose, children }) => (
  <RNModal
    visible={isVisible}
    onRequestClose={onRequestClose}
    animationType="fade"
    transparent
  >
    <View style={styles.container}>
      <View style={styles.inner}>
        {children}
      </View>
    </View>
  </RNModal>
);

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

export default Modal;
