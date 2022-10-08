import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import styles from './CreateNewPassword.styles';
import {useTranslation} from 'react-i18next';
import colors from 'src/styles/texts/colors';
import ErrorText from 'src/components/error-text/ErrorText';
import CustomButton from 'src/components/custom-button/CustomButton';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {LOADER, MODAL_VISIBLE} from 'src/actions/action';
import {useDispatch, useSelector} from 'react-redux';
import {createNewPassword} from 'src/services/http.service';
import FastImage from 'react-native-fast-image';

function CreateNewPassword({navigation, route}) {
  let redux_data = useSelector((state) => state.myReducer);
  const loading = redux_data.loading;
  const {t} = useTranslation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [showPassward, setShowPassward] = useState(true);
  const [showConfirmPassward, setShowConfirmPassward] = useState(true);
  const [passwordNote, setPasswordNote] = useState(false);
  const dispatch = useDispatch();

  const validate = () => {
    let capitalAndSmallLetterRegex = /(?=.*[a-z])(?=.*[A-Z])/;
    let specialCharacterRegex = /[@$!%*?&]/;
    let numberRegex = /\d/;
    let errorPassword = '';
    let confirmPasswordError = false;
    if (!password.length) {
      errorPassword = [t('createNewPassword.passwordRequired')];
    } else if (!capitalAndSmallLetterRegex.test(password)) {
      errorPassword = [t('createNewPassword.passUperLower')];
    } else if (!specialCharacterRegex.test(password)) {
      errorPassword = [t('createNewPassword.passSpecial')];
    } else if (!numberRegex.test(password)) {
      errorPassword = [t('createNewPassword.passNumber')];
    } else if (password.length < 8) {
      errorPassword = [t('createNewPassword.passwordinvailid')];
    } else {
      errorPassword = [];
      if (password !== confirmPassword) {
        confirmPasswordError = t('createNewPassword.passwordError');
      } else {
        confirmPasswordError = '';
      }
    }
    if (errorPassword.length || confirmPasswordError.length) {
      setError({...error, password: errorPassword});
      setPasswordError(confirmPasswordError);

      return false;
    }
    return true;
  };

  const onCreatePassword = () => {
    setPasswordNote(false);
    const isValid = validate();
    if (isValid) {
      dispatch(LOADER(true));

      setPasswordError('');

      createNewPassword({
        password: password,
        otp: route.params?.otp,
        email: route.params?.email,
      })
        .then((response) => {
          dispatch(LOADER(false));
          console.log('testing>>in confirmpasswod', response.data);
          dispatch(
            MODAL_VISIBLE({
              visible: true,
              type: 1,
              message: response.data.message,
            }),
          );

          navigation.navigate('Login');
        })
        .catch((error) => {
          if (error?.response?.data) {
            dispatch(LOADER(false));
            setError(error?.response?.data?.errors);
            // console.log('errMessage', error.response);
            if (error?.response?.data?.message === 'Otp declined.') {
              dispatch(
                MODAL_VISIBLE({
                  visible: true,
                  type: 2,
                  message: t('createNewPassword.timeOut'),
                }),
              );
              // alert('Time Out!');
              navigation.navigate('RecoverPassword');
            }

            // console.log('Errors=====', error.response.data.errors);
          } else {
            console.log('error in testing >>', error);
          }
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <ScrollView style={styles.container}>
        <ImageBackground
          style={styles.banner}
          source={require('../images/headerImage.png')}>
          <FastImage
            style={styles.logo}
            source={require('src/assets/images/Logo.png')}
          />
        </ImageBackground>

        <View style={styles.childContainer}>
          <Text style={styles.createAccountText}>
            {t('createNewPassword.recoverPassword')}
          </Text>

          <Text style={styles.passwordText}>
            {t('createNewPassword.createPassword')}
          </Text>

          <View
            style={[
              styles.passwardContainer,
              error?.password?.length && {borderColor: colors.appRed},
            ]}>
            <TextInput
              value={password}
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
          {passwordNote && (
            <Text
              style={{
                fontSize: 12,
                color: colors.appGray,
                marginHorizontal: 30,
              }}>
              {t('createNewPassword.passwordNote')}
            </Text>
          )}
          {error?.password && <ErrorText name={error?.password[0]} />}
          <Text style={styles.passwordText}>
            {t('createNewPassword.confirmPassword')}
          </Text>
          <View
            style={[
              styles.passwardContainer,
              // error?.password && {borderColor: colors.appRed},
              passwordError && {borderColor: colors.appRed},
            ]}>
            <TextInput
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text),
                  passwordError !== '' && setPasswordError('');
              }}
              style={styles.passwardInput}
              keyboardType="default"
              secureTextEntry={showConfirmPassward}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassward(!showConfirmPassward)}
              style={{alignSelf: 'center', paddingHorizontal: 5}}>
              {showConfirmPassward ? (
                <FontAwesomeIcon icon={faEyeSlash} size={22} color="#919191" />
              ) : (
                <FontAwesomeIcon icon={faEye} size={22} color="#919191" />
              )}
            </TouchableOpacity>
          </View>
          {passwordError !== '' && <ErrorText name={passwordError} />}

          <CustomButton
            title={t('createNewPassword.change')}
            isLoading={loading}
            handlePress={onCreatePassword}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default CreateNewPassword;
