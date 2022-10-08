import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './Splash.styles';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {StackActions} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {LOADER} from 'src/actions/action';

export class Splash extends Component {
  constructor(props) {
    super();
    this.state = {
      visible: true,
    };
  }

  async componentDidMount() {
    this.props.dispatch(LOADER(false));
    setTimeout(async () => {
      this.setState({visible: false});
      if (this.props.token) {
        this.props.navigation.dispatch(StackActions.replace('Tabs'));
      } else {
        let first = await AsyncStorage.getItem('FirstTimeLogin');
        console.log('firstTo', first);
        if (first) {
          this.props.navigation.dispatch(
            StackActions.replace('Intro', {screen: 'Login'}),
          );
        } else {
          this.props.navigation.dispatch(
            StackActions.replace('Intro', {screen: 'Introduction'}),
          );
        }
      }
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout();
  }

  render() {
    return (
      this.state.visible && (
        <View style={styles.container}>
          <View>
            <LottieView
              style={styles.logo}
              source={require('./lottie-animation/splash.json')}
              autoPlay
              loop={false}
            />
          </View>
        </View>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
});

export default connect(mapStateToProps)(Splash);
