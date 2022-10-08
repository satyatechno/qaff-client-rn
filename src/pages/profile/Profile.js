import {GoogleSignin} from '@react-native-community/google-signin';
import {StackActions} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import QB from 'quickblox-react-native-sdk';
import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  I18nManager,
  Linking,
  Modal,
  Platform,
  SectionList,
  Share,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import FastImage from 'react-native-fast-image';
import {Freshchat} from 'react-native-freshchat-sdk';
import OneSignal from 'react-native-onesignal';
import RNRestart from 'react-native-restart';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {LOGOUT_ACTION} from 'src/actions/action';
import Divider from 'src/components/divider/Divider';
import Header from 'src/components/header/Header';
import fontelloConfig from 'src/icon-configs/config.json';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import {logout} from '../../services/http.service';
import styles from './Profile.styles';
const CustomIcon = createIconSetFromFontello(fontelloConfig);
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {logoutFireBase} from 'src/firebase';

// import { CLEAR_PROJECTS } from '../../actions/action';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionListColor: 0,
      listColor: [colors.appYellow, colors.appViolet, colors.skyBllue],
      isOnline: false,
      logoutLoading: false,
    };
  }
  PROFILE_ITEMS = [
    {
      title: this.props.t('profile.myQaff'),
      sectionId: 1,
      color: colors.appViolet,
      data: [
        {
          iconName: 'user',
          listName: this.props.t('profile.personalProfile'),
          listId: 1,
        },
        {
          iconName: 'star',
          listName: this.props.t('profile.saved'),
          listId: 2,
        },
        {
          iconName: 'heart',
          listName: this.props.t('profile.myInterests'),
          listId: 3,
        },
        {
          iconName: 'whatsapp',
          listName: this.props.t('profile.chatToCustomerService'),
          listId: 4,
        },
        {
          iconName: 'checkmark',
          listName: this.props.t('profile.takeThePoll'),
          listId: 5,
        },
      ],
    },
    {
      title: this.props.t('profile.projects'),
      sectionId: 2,
      data: [
        {
          iconName: 'contract',
          listName: this.props.t('profile.manageProjects'),
          listId: 6,
        },
        {
          iconName: 'chat',
          listName: this.props.t('profile.fileADispute'),
          listId: 7,
        },
        {
          iconName: 'chat',
          listName: this.props.t('profile.myDispute'),
          listId: 14,
        },
      ],
    },
    {
      title: this.props.t('profile.general'),
      sectionId: 3,
      data: [
        {
          iconName: 'ellipse-outline',
          listName: this.props.t('profile.onlineStatus'),
          listId: 8,
        },
        {
          iconName: 'payment',
          listName: this.props.t('profile.payments'),
          listId: 9,
        },
        {
          iconName: 'user',
          listName: this.props.t('profile.becomeAFreelancer'),
          listId: 10,
        },
        {
          iconName: 'invite',
          listName: this.props.t('profile.inviteFriends'),
          listId: 11,
        },
        {
          iconName: 'settings',
          listName: this.props.t('profile.settings'),
          listId: 12,
        },
        {
          iconName: 'swap-horizontal',
          listName: this.props.t('profile.changeLanguage'),
          listId: 15,
        },
        {
          iconName: 'exit-outline',
          listName: this.props.t('profile.logout'),
          listId: 13,
        },
      ],
    },
  ];
  Item = ({title, section}) => {
    const listColor =
      section.sectionId === 2
        ? colors.appViolet
        : section.sectionId === 3
        ? colors.skyBlue
        : colors.appYellow;

    const handleLogout = () => {
      Alert.alert(
        this.props.t('profile.logout'),
        this.props.t('profile.logoutQue'),
        [
          {
            text: this.props.t('profile.cancel'),
            onPress: () => console.log('Cancel Pressed'),
          },
          {
            text: this.props.t('profile.ok'),
            onPress: async () => {
              this.setState({logoutLoading: true});
              OneSignal.setSubscription(false);

              // await QB.chat
              //   .disconnect()
              //   .then(async function () {
              //     console.log('Disconnected from chat server');
              //     await QB.auth
              //       .logout()
              //       .then((res) => console.log('Quickblox logout successfull'))
              //       .catch((err) =>
              //         console.log(
              //           `error while logging out from quickblox`,
              //           err,
              //         ),
              //       );
              //   })
              //   .catch(function (err) {
              //     console.error(`Couldnot disconnect from chat server`, err);
              //   });
              let isSignedInFromGoogle = await GoogleSignin.isSignedIn();
              if (isSignedInFromGoogle) {
                GoogleSignin.signOut()
                  .then((res) => {
                    console.log('Google signed out', res);
                  })
                  .catch((err) => {
                    console.error('Couldnot signout from google', err);
                  });
              }
              LoginManager.logOut();

              await logout({token: this.props.token})
                .then((res) => {
                  console.log('ress logout success');
                })
                .catch((error) => console.log('Error in Logout', error))
                .finally(() => {
                  logoutFireBase();
                  // this.props.dispatch(LOGOUT_ACTION());
                });
              this.setState({logoutLoading: false});
              this.props.navigation.dispatch(
                StackActions.replace('Intro', {screen: 'Login'}),
              );
              // this.props.dispatch(CLEAR_PROJECTS())

              // this.props.navigation.navigate(StackActions.replace('Login'));
              // this.props.navigation.navigate('Intro', {
              //   screen: StackActions.replace('Login'),
              // });
              // StackActions.replace('Intro');
            },
          },
        ],
        {cancelable: true},
      );
    };
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{marginEnd: 15}}
        disabled={title.listId === 8 ? true : false}
        onPress={
          title.listId === 13
            ? () => handleLogout()
            : () => this.handleProfileNavigation(title.listId)
        }>
        <View style={styles.listContainer}>
          {title.listId === 8 || title.listId === 13 || title.listId === 15 ? (
            <Ionicons
              name={title.iconName}
              size={20}
              color={listColor}
              style={{paddingTop: 5}}
            />
          ) : (
            <CustomIcon
              name={title.iconName}
              size={title.listId === 9 ? 14 : 18}
              color={listColor}
              style={{paddingTop: 5}}
            />
          )}
          <Text style={styles.listItem}>{title.listName}</Text>
          <Text>{[section.length]}</Text>

          {title.listId === 8 ? (
            <Switch
              value={this.state.isOnline}
              style={{marginStart: 10}}
              onValueChange={() =>
                this.setState({isOnline: !this.state.isOnline})
              }
            />
          ) : (
            <CustomIcon
              name={I18nManager.isRTL ? 'back' : 'next'}
              size={18}
              color={listColor}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  handleProfileNavigation = (id) => {
    if (id === 5) {
      this.props.navigation.navigate('Polls');
    } else if (id === 2) {
      this.props.navigation.navigate('Saved');
    } else if (id === 3) {
      this.props.navigation.navigate('MyInterest');
    } else if (id === 1) {
      this.props.navigation.navigate('PersonalProfile');
    } else if (id === 6) {
      this.props.navigation.navigate('Jobs');
    } else if (id === 12) {
      this.props.navigation.navigate('Settings');
    } else if (id === 7) {
      this.props.navigation.navigate('MyContracts');
    } else if (id === 14) {
      this.props.navigation.navigate('MyDispute');
    } else if (id === 11) {
      this.inviteFriends();
    } else if (id === 10) {
      this.becomeFreelancer();
    } else if (id === 9) {
      this.props.navigation.navigate('Payment');
    } else if (id === 4) {
      Freshchat.showConversations();
    } else if (id === 15) {
      this.showActionSheet();
    }
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };
  onActionSheetItemPress = (index) => {
    const {i18n} = this.props;

    if (index === 0 && i18n.language !== 'en') {
      i18n.changeLanguage((i18n.language = 'en')).then(() => {
        // I18nManager.forceRTL(i18n.language === 'ar');
        I18nManager.forceRTL(false);
        RNRestart.Restart();
      });
    }
    if (index === 1 && i18n.language !== 'ar') {
      i18n.changeLanguage((i18n.language = 'ar')).then(() => {
        I18nManager.forceRTL(true);

        RNRestart.Restart();
      });
    }
  };

  becomeFreelancer = () => {
    const freelancerUrl =
      Platform.OS === 'android' ? 'app://qaffFreelancer' : 'qaffFreelancer://';
    const playStoreUrl = 'https://play.google.com/';
    const appStoreUrl = 'https://www.apple.com/in/app-store/';
    Linking.canOpenURL(freelancerUrl)
      .then((supported) => {
        if (supported) {
          console.log('accepted');
          return Linking.openURL(freelancerUrl);
        } else {
          Linking.canOpenURL(
            Platform.OS === 'android' ? playStoreUrl : appStoreUrl,
          ).then((url) => {
            if (url) {
              return Linking.openURL(
                Platform.OS === 'android' ? playStoreUrl : appStoreUrl,
              );
            } else {
              alert(`Sorry,couldn't open app `);
            }
          });
        }
      })
      .catch((err) => console.log(' error occured', err));
  };

  inviteFriends = async () => {
    try {
      const result = await Share.share({
        url: 'Download app and join now',
        message: `Join Qaff and become part of the largest freelancer marketplace across Saudi Arabia and GCC \n Download app and join now`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type', result.activityType);
        } else {
          console.log('else share part', result);
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const {t} = this.props;
    // console.log(
    //   'Profile Data',
    //   JSON.stringify(this.props.profileData, null, 2),
    // );

    return (
      <>
        <Header
          title={t('profile.myProfile')}
          logo={true}
          notificationButton={true}
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          <SectionList
            style={{flex: 1, marginBottom: 20}}
            sections={this.PROFILE_ITEMS}
            keyExtractor={(item, index) => index}
            initialNumToRender={25}
            ListHeaderComponent={() => (
              <>
                {this.props.profile_image === null ? (
                  <LottieView
                    style={styles.profileImage}
                    source={
                      this.props.profileData?.gender === ''
                        ? require('./lottie-animation/male.json')
                        : this.props.profileData?.gender === 'male'
                        ? require('./lottie-animation/male.json')
                        : require('./lottie-animation/female.json')
                    }
                    autoPlay
                    loop
                  />
                ) : (
                  <FastImage
                    style={[styles.profileImage, {borderRadius: 70}]}
                    source={{
                      uri: this.props.profile_image,
                    }}
                    fadeDuration={300}
                    defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                  />
                )}
                <Text style={styles.profileOwnerName}>
                  {this.props.profileData?.first_name}{' '}
                  {this.props.profileData?.last_name}
                </Text>

                {this.props.location !== '' && (
                  <View style={styles.locationContainer}>
                    <CustomIcon
                      name="location"
                      color={colors.appGray}
                      size={15}
                    />
                    <Text
                      style={
                        styles.locationName
                      }>{`${this.props.profileData?.city},${this.props.profileData?.country}`}</Text>
                  </View>
                )}
              </>
            )}
            stickySectionHeadersEnabled={false}
            stickyHeaderIndices={[0]}
            ItemSeparatorComponent={() => (
              <Divider
                style={{
                  height: 1,
                  backgroundColor: colors.appGray1,
                  marginHorizontal: 15,
                }}
              />
            )}
            SectionSeparatorComponent={() => (
              <Divider style={{height: 1, backgroundColor: colors.appGray1}} />
            )}
            renderItem={({item, section}) => {
              return <this.Item title={item} section={section} />;
            }}
            renderSectionHeader={({section: {title, sectionId}}) => (
              <View style={styles.listItemHeader}>
                <Text
                  style={
                    sectionId === 2
                      ? [styles.listItemHeaderText, {color: colors.appViolet}]
                      : sectionId === 3
                      ? [styles.listItemHeaderText, {color: colors.skyBlue}]
                      : styles.listItemHeaderText
                  }>
                  {title}
                </Text>
              </View>
            )}
          />
        </View>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={t('profile.changeLanguage')}
          options={[
            t('profile.english'),
            t('profile.arabic'),
            t('profile.cancel'),
          ]}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={(index) => {
            this.onActionSheetItemPress(index);
          }}
        />
        <Modal visible={this.state.logoutLoading} transparent={true}>
          <View
            style={{
              height: Dimensions.get('screen').height,
              width: Dimensions.get('screen').width,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              backgroundColor: colors.appGray2,
              opacity: 0.7,
            }}>
            <ActivityIndicator color={colors.skyBlue} size={50} />
            <Text
              style={{
                color: colors.skyBlue,
                fontSize: 20,
                fontFamily: fonts.primarySB,
              }}>
              {t('profile.loggingOut')}
            </Text>
          </View>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  profileData: state.myReducer.user?.employer_profile,
  profile_image: state.myReducer.user?.employer_profile?.profile_image,
  location: state.myReducer.user?.employer_profile?.country,
  token: state.myReducer.user?.token,
});

export default connect(mapStateToProps)(withTranslation()(Profile));
