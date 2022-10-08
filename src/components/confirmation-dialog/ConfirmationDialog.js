import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import Modal from 'react-native-modal';
import Proptypes from 'prop-types';
import LottieView from 'lottie-react-native';
import styles from "./ConfirmationDialog.styles"
import { useDispatch } from "react-redux"
import { MODAL_VISIBLE } from 'src/actions/action';

const ConfirmationDialog = ({ modalVisible, message, onClose }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      dispatch(MODAL_VISIBLE({ visible: false }))
    }, 3000);
  }, [])
  return (
    <View>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationInTiming={300}
        animationOut="slideOutDown"
        animationOutTiming={300}
        hasBackdrop={true}
        backdropOpacity={0.2}
        onBackdropPress={() => onClose()}
        swipeDirection={['down', 'up', 'left', 'right']}
        onSwipeComplete={() => onClose()}>
        <TouchableHighlight
          underlayColor="none"
          style={styles.centeredView}
          onPress={() => onClose()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{message}</Text>

              <LottieView
                style={styles.confirmationImage}
                source={require('./lottie-animation/confirmation-new.json')}
                autoPlay
                loop
              />
            </View>
          </View>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};



ConfirmationDialog.propTypes = {
  modalVisible: Proptypes.bool.isRequired,
  message: Proptypes.string.isRequired,
  onClose: Proptypes.func.isRequired,
};

export default ConfirmationDialog;
