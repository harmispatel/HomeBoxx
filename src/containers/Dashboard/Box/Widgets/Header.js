import React, { useRef, useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity, SafeAreaView, Image,
} from 'react-native';
import { Text, Button, Modal } from 'components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { normalize, getScreenHeight, getScreenWidth } from 'utils/size';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import RBSheet from 'react-native-raw-bottom-sheet';
import { PlaceholderBox, BatteryIcon, BatteryChargingIcon } from 'images';
import { useDispatch, useSelector } from 'react-redux';
import Actions from 'actions';
import Selectors from 'selectors';
import Action from './Action';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  actions: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  battery: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  sheet: {
    borderTopLeftRadius: normalize(26),
    borderTopRightRadius: normalize(26),
    backgroundColor: Colors.dark,
  },
  innerSheet: {
    justifyContent: 'space-between',
    padding: normalize(20),
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  image: {
    width: getScreenWidth() / 2,
    height: getScreenWidth() / 2,
    alignSelf: 'center',
  },
  modal: {
    padding: normalize(20),
  },
  subtitle: {
    paddingVertical: normalize(10),
  },
  buttonContainer: {
    paddingVertical: normalize(20),
  },
  button: {
    marginTop: normalize(20),
  },
  icon: {
    maxHeight: normalize(30),
    maxWidth: normalize(30),
    resizeMode: 'contain',
  },
});

const Header = ({
  currentBox, isVisible, style, navigation,
}) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);
  const onUnpairBox = () => dispatch(Actions.unpairBox(toggleModal));
  const isLoading = useSelector(Selectors.createLoadingSelector([
    Actions.UNPAIR_BOX_REQUEST,
  ]));

  const getTitle = () => {
    if (currentBox) {
      return currentBox.name || '-';
    }
    return 'Welcome to Homeboxx';
  };

  if (!isVisible) return null;
  return (
    <View style={[...style]}>
      <View style={styles.header}>
        {currentBox
        && (
        <View style={styles.battery}>
          <Image
            style={styles.icon}
            source={currentBox.powerSupplyOn ? BatteryChargingIcon : BatteryIcon}
          />
        </View>
        )}
        <Text size="xlarge" weight="xbold" color="white" centered flex>
          {getTitle()}
        </Text>
        {currentBox && (
          <TouchableOpacity style={styles.actions} onPress={() => ref.current.open()}>
            <Icon name="dots-horizontal" color={Colors.lightest} size={normalize(40)} />
          </TouchableOpacity>
        )}
      </View>
      <RBSheet
        ref={ref}
        height={getScreenHeight() / 2}
        openDuration={250}
        closeOnDragDown
        customStyles={{
          container: styles.sheet,
        }}
      >
        <SafeAreaView style={styles.flex}>
          <View style={styles.innerSheet}>
            <Action
              label="Share Homeboxx"
              icon="share"
              onPress={() => {
                ref.current.close();
                navigation.navigate('ShareBox', { box: currentBox });
              }}
            />
            {/* <Action label="Adjust Temperature" icon="thermometer" onPress={() => {}} /> */}
            <Action
              label="Edit Address"
              icon="address"
              onPress={() => {
                ref.current.close();
                navigation.navigate('EditBox', { box: currentBox });
              }}
            />
            <Action
              label="Remove Homeboxx"
              icon="remove"
              onPress={() => {
                ref.current.close();
                // hack to toggle another modal after hiding one.
                setTimeout(() => {
                  toggleModal();
                }, 200);
              }}
              accent
            />
            <Button variant="border" bg="dark" onPress={() => ref.current.close()}>
              <Text weight="bold" color="light">CANCEL</Text>
            </Button>
          </View>
        </SafeAreaView>
      </RBSheet>
      <Modal isVisible={isModalVisible} onRequestClose={toggleModal}>
        <View style={styles.modal}>
          <Image
            source={PlaceholderBox}
            resizeMode="contain"
            style={styles.image}
          />
          <Text color="darker" weight="bold" size="large" centered>{`Remove ${currentBox?.id}?`}</Text>
          <Text color="darker" centered style={styles.subtitle}>
            {`Are you sure you want to remove ${currentBox?.id}? You won't be able to undo this action.`}
          </Text>
          <View style={styles.buttonContainer}>
            <Button bg="red" onPress={onUnpairBox} isLoading={isLoading}>
              <Text weight="bold">YES, REMOVE BOXX</Text>
            </Button>
            <Button variant="border" bg="white" style={styles.button} onPress={toggleModal}>
              <Text weight="bold" color="darker">{'NO, DON\'T REMOVE'}</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

Header.propTypes = {
  currentBox: PropTypes.object,
  isVisible: PropTypes.bool,
  style: PropTypes.array,
  navigation: PropTypes.object.isRequired,
};

Header.defaultProps = {
  currentBox: null,
  style: [],
  isVisible: false,
};

export default Header;
