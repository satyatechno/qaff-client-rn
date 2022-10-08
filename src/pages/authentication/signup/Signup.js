import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {StackActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {useDispatch} from 'react-redux';
import {USER_ACTION} from 'src/actions/action';
import {socialLogin} from 'src/services/http.service';
import styles from './Signup.styles';

function Signup({navigation}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('initial State', JSON.stringify(state, null, 2));
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '624462542238-eomoquutg22qiu7k0jff91qvv8b8e35u.apps.googleusercontent.com',
      // client ID of type WEB for your server (needed to verify user ID and offline access)
      //  ,
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, []);

  const onGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      socialLogin({
        data: {
          provider_user_id: userInfo.user.id,
          email: userInfo.user.email,
          account_type: 'employer',
        },
        name: 'google',
      })
        .then((response) => {
          // console.log('api Login FB', response);
          dispatch(USER_ACTION(response.data.data));
          navigation.dispatch(StackActions.replace('Tabs'));
        })
        .catch((err) => {
          console.log('api login google error', err);
          if (err?.response?.data?.data?.registration_required === true) {
            navigation.navigate('SocialSignup', {
              user_first_name: userInfo.user.givenName,
              user_last_name: userInfo.user.familyName,
              userEmail: userInfo.user.email,
              provider_user_id: userInfo.user.id,
              site_name: 'google',
            });
          }
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.error('google error', error.code);
      }
    }
  };

  const onFacebookLogin = () => {
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]).then(
      (login) => {
        if (login.isCancelled) {
          console.log('Login Canceled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();

            const PROFILE_REQUEST_PARAMS = {
              fields: {
                string: 'id, name, first_name, last_name, birthday, email',
              },
            };
            const profileRequest = new GraphRequest(
              '/me',
              {accessToken, parameters: PROFILE_REQUEST_PARAMS},
              (error, result) => {
                if (error) {
                  console.log('Login Info has an error:', error);
                } else {
                  if (result.isCancelled) {
                    console.log('Login cancelled');
                  }
                  if (result.email === undefined) {
                    Alert.alert(
                      'Error',
                      'To contiune MyApp please allow access to your email',
                      'Ok',
                    );
                  } else {
                    socialLogin({
                      data: {
                        provider_user_id: result.id,
                        email: result.email,
                        // first_email: result.first_name,
                        // last_name: result.last_name,
                        account_type: 'employer',
                      },
                      name: 'facebook',
                    })
                      .then((response) => {
                        // console.log('api Login FB', response);
                        dispatch(USER_ACTION(response.data.data));
                        navigation.dispatch(StackActions.replace('Tabs'));
                      })
                      .catch((err) => {
                        console.error('api login fb error', err.response.data);
                        if (
                          err?.response?.data?.data?.registration_required ===
                          true
                        ) {
                          navigation.navigate('SocialSignup', {
                            user_first_name: result.first_name,
                            user_last_name: result.last_name,
                            userEmail: result.email,
                            provider_user_id: result.id,
                            site_name: 'facebook',
                          });
                        }
                      });
                  }
                }
              },
            );
            new GraphRequestManager().addRequest(profileRequest).start();
          });
        }
      },
      (error) => {
        console.log('Error in facebook social login ', error);
      },
    );
  };
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('./images/signup.png')}>
        <FastImage
          style={styles.logo}
          source={require('src/assets/images/Logo.png')}
        />
      </ImageBackground>
      <Text style={styles.welcomeText}>{t('signup.joinToQaff')}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CreateAccount');
        }}
        style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>
          {t('signup.signUpWithEmail')}
        </Text>
      </TouchableOpacity>
      <Text style={styles.orText}>{t('signup.orViaSocialAccounts')}</Text>
      <View style={styles.socialIcon}>
        <TouchableOpacity onPress={onGoogleLogin}>
          <View style={styles.footerLogoContainer}>
            <FastImage
              style={styles.socialIconAlign}
              source={require('src/assets/images/Google1.png')}
            />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <View style={styles.footerLogoContainer}>
            <FastIamge
              style={styles.socialIconAlign}
              source={require('src/assets/images/linkedin1.png')}
            />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onFacebookLogin}>
          <View style={styles.footerLogoContainer}>
            <FastImage
              style={styles.socialIconAlign}
              source={require('src/assets/images/facebook1.png')}
            />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <View style={styles.footerLogoContainer}>
            <FastImage
              style={styles.socialIconAlign}
              source={require('src/assets/images/twitter1.png')}
            />
          </View>
        </TouchableOpacity> */}
      </View>
      <Text style={styles.footerTopText}>{t('signup.bySigningUp')}</Text>
      <Text style={styles.footerBottomText}>{t('signup.termsConditions')}</Text>
    </ScrollView>
  );
  s;
}

export default Signup;
