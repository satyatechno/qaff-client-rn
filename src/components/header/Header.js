import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  Modal,
  Dimensions,
  I18nManager,
  Animated,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './Header.styles';

import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from 'src/icon-configs/config.json';
import colors from 'src/styles/texts/colors';
const CustomIcon = createIconSetFromFontello(fontelloConfig);
import Ionicons from 'react-native-vector-icons/Ionicons';
// import NotificationComponent from '../notification-component/NotificationComponent';
import * as Animatable from 'react-native-animatable';
const statusbarHeight = StatusBar.currentHeight;
export const {width, height} = Dimensions.get('window');
import NetInfoStatus from 'src/components/net-info-status/NetInfoStatus';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchInput: false,
      showNotificationComponent: false,
      isScrollable: false,
    };
  }

  toggleSearch = () => {
    this.setState({
      showSearchInput: !this.state.showSearchInput,
    });
  };
  toggleNotification = () => {
    this.props.navigation.navigate('NotificationComponent');
  };

  // testFunction(tw) {
  //   this.setState({isScrollable: true});

  //   this.scrollY.setValue(tw);
  //   this.diffClamp = Animated.diffClamp(this.scrollY, 0, 60);
  //   this.translateY = this.diffClamp.interpolate({
  //     inputRange: [0, 60],
  //     outputRange: [0, -60],
  //     // extrapolate: 'clamp',
  //   });
  // }

  render() {
    const {isOnline} = this.props;
    console.log('image=================', this.props.headerRightImage);
    return (
      <>
        <StatusBar backgroundColor={colors.skyBlue} />
        <View
          style={
            this.props.transparent === true
              ? {
                  // height: statusbarHeight,
                  // top: statusbarHeight,
                  left: 0,
                  right: 0,
                  height: Platform.OS === 'android' ? 60 : 100,
                  position: 'absolute',
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  zIndex: 100,
                  alignItems: 'center',
                  paddingTop: Platform.OS === 'android' ? 0 : 30,
                }
              : {
                  height: Platform.OS === 'android' ? 60 : 100,
                  backgroundColor: colors.skyBlue,
                  flexDirection: 'row',
                  elevation: 4,
                  zIndex: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignContent: 'center',
                  paddingTop: Platform.OS === 'android' ? 0 : 30,
                }
          }>
          {/* {this.props.transparent === true && (
            <StatusBar backgroundColor="transparent" translucent />
          )} */}
          <View style={styles.logoContainer}>
            {this.props.logo ? (
              <FastImage
                style={styles.logo}
                source={require('./images/qaaf-white-logo.png')}
              />
            ) : this.props.backButton === true ? (
              <TouchableOpacity onPress={() => this.props.navigation?.goBack()}>
                <CustomIcon
                  name={I18nManager.isRTL ? 'next' : 'back'}
                  color={colors.defaultWhite}
                  size={20}
                  style={{marginTop: 5}}
                />
              </TouchableOpacity>
            ) : this.props.cancelButton === true ? (
              <TouchableOpacity onPress={() => this.props.navigation?.goBack()}>
                <Ionicons
                  name="close-outline"
                  color={colors.defaultWhite}
                  size={30}
                  style={{marginTop: 5}}
                />
              </TouchableOpacity>
            ) : (
              <View style={{width: 30}}></View>
            )}
          </View>

          <View style={styles.titleContainer}>
            {!this.state.showSearchInput && this.props.title ? (
              <Animatable.Text
                animation="slideInLeft"
                duration={200}
                style={[styles.title]}>
                {this.props.title}
              </Animatable.Text>
            ) : this.state.showSearchInput ? (
              <Animatable.View
                style={{width: '100%'}}
                animation="slideInRight"
                easing="ease-out"
                useNativeDriver={true}
                duration={200}>
                <TextInput
                  autoFocus={true}
                  style={styles.headerInput}
                  placeholder={this.props.t('header.search')}
                  placeholderTextColor="white"
                  onChangeText={(text) =>
                    this.props.onSearch && this.props.onSearch(text)
                  }
                />
              </Animatable.View>
            ) : (
              <> </>
            )}
          </View>
          {this.props.headerRightImage !== undefined && (
            <View>
              <FastImage
                source={
                  this.props.headerRightImage === undefined ||
                  this.props.headerRightImage === null ||
                  this.props.headerRightImage === ''
                    ? require('src/assets/images/avator.png')
                    : {uri: this.props.headerRightImage}
                }
                style={styles.headerRightImage}
              />
              <Ionicons
                name="ellipse"
                size={12}
                color={isOnline ? colors.appGreen : colors.appRed}
                style={{position: 'absolute', bottom: -2, end: 10, zIndex: 10}}
              />
            </View>
          )}
          {this.props.headerRightImage === undefined && (
            <View style={styles.iconContainer}>
              {this.props.searchButton && (
                <TouchableOpacity onPress={this.toggleSearch}>
                  <CustomIcon
                    name="search"
                    color="white"
                    size={20}
                    style={{marginTop: 5}}
                  />
                </TouchableOpacity>
              )}
              {this.props.notificationButton && (
                <TouchableOpacity onPress={() => this.toggleNotification()}>
                  <CustomIcon
                    name="notifications"
                    color="white"
                    size={20}
                    style={{marginTop: 5, marginStart: 20, marginEnd: 10}}
                  />
                  {this.props.unReadNotification > 0 && (
                    <View
                      style={{
                        backgroundColor: colors.defaultWhite,
                        borderRadius: 9,
                        height: 17,
                        width: 17,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        end: 5,
                        top: -2,
                      }}>
                      <Text
                        style={{
                          fontSize:
                            this.props.unReadNotification < 10
                              ? 12
                              : this.props.unReadNotification > 9 &&
                                this.props.unReadNotification < 100
                              ? 10
                              : 8,
                          color: colors.skyBlue,
                        }}>
                        {this.props.unReadNotification}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </View>
          )}
          {/* <Modal
            visible={this.state.showNotificationComponent}
            transparent={true}
            statusBarTranslucent={true}
            animationType="fade">
            <NotificationComponent
              toggleNotification={this.toggleNotification}
            />
          </Modal> */}
        </View>
        <NetInfoStatus />
      </>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.bool,
  backButton: PropTypes.bool,
  cancelButton: PropTypes.bool,
  transparent: PropTypes.bool,
  headerRightImage: PropTypes.string || PropTypes.object,
  searchButton: PropTypes.bool,
  notificationButton: PropTypes.bool,
};

Header.defaultProps = {
  title: 'Title',
  logo: false,
  transparent: false,
  headerRightImage: undefined,
};
const mapStateToProps = (state) => ({
  unReadNotification: state.notificationReducer.unReadNotification,
});

export default connect(mapStateToProps)(withTranslation()(Header));

// class HeaderWrapper extends React.Component {
//   render() {
//     return <Header {...this.props} ref={this.props.myForwardedRef} />;
//   }
// }

// const ConnectedHeaderWrapper = connect(mapStateToProps)(
//   withTranslation()(HeaderWrapper),
// );

// export default React.forwardRef((props, ref) => (
//   <ConnectedHeaderWrapper {...props} myForwardedRef={ref} />
// ));
