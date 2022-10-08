import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'src/styles/texts/colors';
import LottieView from 'lottie-react-native';
import styles from "./ErrorDialog.styles";

class ErrorDialog extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    console.log('err mod unm');
  }
  render() {
    return (
      <Modal
        // useNativeDriver={true}
        // hideModalContentWhileAnimating={true}
        // backdropTransitionOutTiming={0}
        isVisible={this.props.modalVisible}
        animationIn="slideInUp"
        animationInTiming={800}
        animationOut="slideOutDown"
        animationOutTiming={800}
        // hasBackdrop={true}
        swipeDirection="down"
        backdropOpacity={0.5}
        onBackdropPress={() => this.props.onClose()}
        onSwipeComplete={() => this.props.onClose()}>
        <View style={styles.errorModalView}>
          <TouchableOpacity onPress={() => this.props.onClose()}>
            <Ionicons
              name="close-outline"
              size={30}
              color={colors.appGray}
              style={{ alignSelf: 'flex-end' }}
            />
          </TouchableOpacity>
          <Text style={styles.errorModalText}>{this.props.title}</Text>

          <LottieView
            style={styles.errorModalImage}
            source={require('./lottie-animation/error.json')}
            autoPlay
            loop
          />
        </View>
      </Modal>
    );
  }
}



ErrorDialog.propTypes = {
  title: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorDialog;
