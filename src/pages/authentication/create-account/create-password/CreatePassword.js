import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import styles from './CreatePassword.styles';
import {useTranslation} from 'react-i18next';
import colors from 'src/styles/texts/colors';
import ErrorText from 'src/components/error-text/ErrorText';
import CustomButton from 'src/components/custom-button/CustomButton';
import {createPassword} from 'src/services/http.service';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {USER_ACTION, LOADER} from 'src/actions/action';
import {useDispatch, useSelector} from 'react-redux';
import {StackActions} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

function CreatePassword({navigation, route}) {
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
      errorPassword = [t('createPassword.passwordRequired')];
    } else if (!capitalAndSmallLetterRegex.test(password)) {
      errorPassword = [t('createPassword.passUperLower')];
    } else if (!specialCharacterRegex.test(password)) {
      errorPassword = [t('createPassword.passSpecial')];
    } else if (!numberRegex.test(password)) {
      errorPassword = [t('createPassword.passNumber')];
    } else if (password.length < 8) {
      errorPassword = [t('createPassword.passwordinvailid')];
    } else {
      errorPassword = [];
      if (password !== confirmPassword) {
        confirmPasswordError = t('createPassword.passwordError');
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
    const isValid = validate();
    if (isValid) {
      dispatch(LOADER(true));
      setPasswordError('');

      createPassword({
        password: password,
        otp: route.params?.otp,
        token: route.params?.token,
      })
        .then((response) => {
          dispatch(LOADER(false));
          console.log('testing>>in confirmpasswod', response.data);
          dispatch(USER_ACTION(response.data.data));
          navigation.dispatch(StackActions.replace('Tabs'));
        })
        .catch((error) => {
          if (error.response.data) {
            dispatch(LOADER(false));

            setError(error.response.data.errors);
            console.log('errMessage', error.response.data.message);

            console.log('Errors=====', error.response.data.errors);
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
          source={require('../images/header.png')}>
          <FastImage
            style={styles.logo}
            source={require('src/assets/images/Logo.png')}
          />
        </ImageBackground>

        <View style={styles.childContainer}>
          <Text style={styles.createAccountText}>
            {t('createPassword.createAccount')}
          </Text>

          <Text style={styles.passwordText}>
            {t('createPassword.createPassword')}
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
                marginHorizontal: 20,
              }}>
              {t('createPassword.passwordNote')}
            </Text>
          )}
          {error?.password && <ErrorText name={error?.password[0]} />}
          <Text style={styles.passwordText}>
            {t('createPassword.confirmPassword')}
          </Text>
          <View
            style={[
              styles.passwardContainer,
              passwordError?.length && {borderColor: colors.appRed},
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
            title={t('createPassword.createAccountButton')}
            isLoading={loading}
            handlePress={onCreatePassword}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default CreatePassword;
