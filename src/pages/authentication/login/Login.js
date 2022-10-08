import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {StackActions} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
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
import {useDispatch, useSelector} from 'react-redux';
import {LOADER, MODAL_VISIBLE, USER_ACTION} from 'src/actions/action';
import {FETCH_NOTIFICATIONS} from 'src/actions/notification';
import CustomButton from 'src/components/custom-button/CustomButton';
import ErrorText from 'src/components/error-text/ErrorText';
import {login, socialLogin} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './Login.styles';

function Login({navigation}) {
  let redux_data = useSelector((state) => state.myReducer);
  const loading = redux_data.loading;
  // let state = useSelector((state) => state);

  const {t, i18n} = useTranslation();

  const [showPassward, setShowPassward] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordNote, setPasswordNote] = useState(false);
  const passwordInputRef = useRef();

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
  useEffect(() => {
    dispatch(LOADER(false));
  }, []);

  const validate = () => {
    let emreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailError = '';
    let passwordError = '';
    if (!email.length) {
      emailError = [t('login.emailRequired')];
    } else if (!emreg.test(email)) {
      emailError = [t('login.pleaseEnterVailidEmail')];
    } else {
      emailError = [];
    }
    if (!password.length) {
      passwordError = [t('login.passwordRequired')];
    } else if (password.length < 8) {
      passwordError = [t('login.passwordinvailid')];
    } else {
      passwordError = [];
    }

    if (emailError.length || passwordError.length) {
      setError({...error, email: emailError, password: passwordError});
      return false;
    }
    return true;
  };

  const onLogin = () => {
    const isValid = validate();
    if (isValid) {
      dispatch(LOADER(true));
      login({email: email, password: password})
        .then((response) => {
          console.log('response', JSON.stringify(response.data, null, 2));
          dispatch(LOADER(false));

          if (response.data.data?.account_security.length > 0) {
            if (
              response.data.data?.account_security.find(
                (x) => x.name === 'two_step_otp_text',
              )
            ) {
              navigation.navigate('TwoStepWithOtp', {
                token: response.data.data.token,
                isFinalStep: response.data.data?.account_security.length === 1,
                account_security: response.data.data?.account_security,
              });
            } else if (
              response.data.data?.account_security.find(
                (x) => x.name === 'two_step_security_question',
              )
            ) {
              navigation.navigate('SecurityQuestion', {
                token: response.data.data.token,
                isFinalStep: response.data.data?.account_security.length === 1,
                question:
                  response.data.data?.account_security[
                    response.data.data?.account_security.findIndex(
                      (x) => x.name === 'two_step_security_question',
                    )
                  ].question,
              });
            }
          } else {
            dispatch(USER_ACTION(response.data.data));
            dispatch(FETCH_NOTIFICATIONS());
            // dispatch(UNREAD_NOTIFICATION(response.data.data.unread_notificaiton_count))
            navigation.dispatch(StackActions.replace('Tabs'));
          }
          // console.log('testing>>in confirmpasswod', response);
        })
        .catch((error) => {
          dispatch(LOADER(false));
          if (error?.response?.data) {
            if (
              email.length > 0 &&
              password.length >= 8 &&
              error.response.data.message !== '' &&
              !error.response?.data.data.account_found_nd_profile_not_created
            ) {
              // console.log("messeage", error.response.data.message)
              dispatch(
                MODAL_VISIBLE({
                  visible: true,
                  type: 2,
                  message: error.response.data.message,
                }),
              );
            }

            if (
              email.length > 0 &&
              password.length > 0 &&
              error.response.data.errors
                ?.account_found_nd_verification_required === true
            ) {
              console.log('messeage', error.response.data);

              // dispatch(
              //   MODAL_VISIBLE({
              //     visible: true,
              //     type: 2,
              //     message: 'Account found and verification required',
              //   }),
              // );
              navigation.navigate('EmailVerification', {
                token: error.response.data.data.token,
              });
            }

            if (
              error.response?.data.data.account_found_nd_profile_not_created ===
              true
            ) {
              navigation.navigate('CreateProfile', {
                freelancer_email:
                  error.response.data.data.freelancer_profile?.email,
                freelancer_first_name:
                  error.response.data.data.freelancer_profile?.first_name,
                freelancer_last_name:
                  error.response.data.data.freelancer_profile?.last_name,
                token: error.response.data.data?.token,
              });
            }

            console.log(
              'errrrrrr',
              JSON.stringify(error.response.data.data, null, 2),
            );
            setError(error.response.data.errors);
          } else {
            console.log('Errormessage', error);
          }
        });
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
                        if (response.data.data?.account_security.length > 0) {
                          if (
                            response.data.data?.account_security.find(
                              (x) => x.name === 'two_step_otp_text',
                            )
                          ) {
                            navigation.navigate('TwoStepWithOtp', {
                              token: response.data.data.token,
                              isFinalStep:
                                response.data.data?.account_security.length ===
                                1,
                              account_security:
                                response.data.data?.account_security,
                            });
                          } else if (
                            response.data.data?.account_security.find(
                              (x) => x.name === 'two_step_security_question',
                            )
                          ) {
                            navigation.navigate('SecurityQuestion', {
                              token: response.data.data.token,
                              isFinalStep:
                                response.data.data?.account_security.length ===
                                1,
                              question:
                                response.data.data?.account_security[
                                  response.data.data?.account_security.findIndex(
                                    (x) =>
                                      x.name === 'two_step_security_question',
                                  )
                                ].question,
                            });
                          }
                        } else {
                          dispatch(USER_ACTION(response.data.data));
                          dispatch(FETCH_NOTIFICATIONS());
                          navigation.dispatch(StackActions.replace('Tabs'));
                        }
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
          console.log('api Login Google', response);

          if (response.data.data?.account_security.length > 0) {
            if (
              response.data.data?.account_security.find(
                (x) => x.name === 'two_step_otp_text',
              )
            ) {
              navigation.navigate('TwoStepWithOtp', {
                token: response.data.data.token,
                isFinalStep: response.data.data?.account_security.length === 1,
                account_security: response.data.data?.account_security,
              });
            } else if (
              response.data.data?.account_security.find(
                (x) => x.name === 'two_step_security_question',
              )
            ) {
              navigation.navigate('SecurityQuestion', {
                token: response.data.data.token,
                isFinalStep: response.data.data?.account_security.length === 1,
                question:
                  response.data.data?.account_security[
                    response.data.data?.account_security.findIndex(
                      (x) => x.name === 'two_step_security_question',
                    )
                  ].question,
              });
            }
          } else {
            dispatch(USER_ACTION(response.data.data));
            dispatch(FETCH_NOTIFICATIONS());
            navigation.dispatch(StackActions.replace('Tabs'));
          }
        })
        .catch((err) => {
          console.log('api login google error', err.response.data);
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

  // console.log('login ref' , passwordInputRef)

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* <NetInfoStatus /> */}

      <ScrollView style={styles.container}>
        <ImageBackground
          style={styles.banner}
          source={require('./images/login-header.png')}>
          <FastImage
            style={styles.logo}
            source={require('src/assets/images/Logo.png')}
          />
        </ImageBackground>

        <Text style={styles.logIn}>{t('login.loginText')}</Text>
        <Text style={styles.label}>{t('login.emailAddress')}</Text>
        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text), error?.email && (error.email = null);
          }}
          style={[
            styles.input,
            error?.email?.length > 0 && {borderColor: colors.appRed},
          ]}
          keyboardType="email-address"
          onSubmitEditing={() => passwordInputRef.current.focus()}
        />
        {error?.email?.length > 0 && <ErrorText name={error?.email[0]} />}
        <Text style={styles.label}>{t('login.password')}</Text>
        <View
          style={[
            styles.passwardContainer,
            error?.password?.length > 0 && {borderColor: colors.appRed},
          ]}>
          <TextInput
            value={password}
            ref={passwordInputRef}
            onChangeText={(text) => {
              setPassword(text);
              error?.password && (error.password = null);
              setPasswordNote(true);
            }}
            style={styles.passwardInput}
            keyboardType="default"
            secureTextEntry={showPassward}
            onBlur={() => setPasswordNote(false)}
          />
          <TouchableOpacity
            onPress={() => setShowPassward(!showPassward)}
            style={{alignSelf: 'center', paddingHorizontal: 5}}>
            {showPassward ? (
              <FontAwesomeIcon icon={faEyeSlash} size={22} color="#919191" />
            ) : (
              <FontAwesomeIcon icon={faEye} size={22} color="#919191" />
            )}
          </TouchableOpacity>
        </View>

        {error?.password?.length > 0 && <ErrorText name={error?.password[0]} />}
        <TouchableOpacity
          onPress={() => navigation.navigate('RecoverPassword')}>
          <Text style={styles.forgotPassword}>{t('login.forgotPassword')}</Text>
        </TouchableOpacity>
        <CustomButton
          title={t('login.loginButtonText')}
          isLoading={loading}
          handlePress={onLogin}
        />
        <Text style={styles.socialNetworkText}>
          {t('login.orViaSocialNetworks')}
        </Text>
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
              <FastImage
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
        <View style={styles.footer}>
          <Text style={styles.noAccountText}>
            {t('login.dontHaveAnAccount')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={styles.signUpText}>{t('login.signup')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Login;
