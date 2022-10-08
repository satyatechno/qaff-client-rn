import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import styles from './CustomButton.styles';
import colors from 'src/styles/texts/colors';

export class CustomButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.handlePress()}
        disabled={this.props.isLoading}
        style={
          this.props.customMargin
            ? {
                backgroundColor: colors.skyBlue,
                // padding: 15,
                height: 45,
                borderRadius: 10,
                justifyContent: 'center',
                marginVertical: 20,
                marginHorizontal: 10,
              }
            : styles.button
        }>
        {!this.props.isLoading && (
          <Text numberOfLines={1} style={styles.buttonText}>
            {this.props.title}
          </Text>
        )}
        {this.props.isLoading && (
          <ActivityIndicator color={colors.defaultWhite} size={30} />
        )}
      </TouchableOpacity>
    );
  }
}

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  handlePress: PropTypes.func.isRequired,
  customMargin: PropTypes.number,
};
CustomButton.defaultProps = {
  title: 'Title',
  isLoading: false,
};

export default CustomButton;
