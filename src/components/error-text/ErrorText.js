import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './ErrorText.styles';
import * as Animatable from 'react-native-animatable';

export class ErrorText extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <View style={styles.container}>
        <Animatable.Text
          animation="shake"
          style={[
            styles.text,
            this.props.fontSize && {fontSize: this.props.fontSize},
          ]}>
          {this.props.name}
        </Animatable.Text>
      </View>
    );
  }
}

ErrorText.propTypes = {
  // name: PropTypes.string.is
  fontSize: PropTypes.number,
};

export default ErrorText;
