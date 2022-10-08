import React, {Component} from 'react';
import {Text, View, ImageBackground} from 'react-native';
import styles from './InfoCards.styles';
import PropTypes from 'prop-types';

class InfoCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <ImageBackground
            style={styles.cardImage}
            source={{uri: this.props.bgImage}}
            resizeMode="cover">
            <Text style={styles.cardText}>@{this.props.username}</Text>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

InfoCards.propTypes = {
  bgImage: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default InfoCards;
