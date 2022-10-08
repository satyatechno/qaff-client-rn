import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {recoverPassword} from 'src/services/http.service';
import styles from './RecoverPassword.styles';
import CustomButton from 'src/components/custom-button/CustomButton';
import ErrorText from 'src/components/error-text/ErrorText';
import colors from 'src/styles/texts/colors';
import {useTranslation} from 'react-i18next';
import {LOADER} from 'src/actions/action';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

function RecoverPassword({navigation}) {
  let redux_data = useSelector((state) => state.myReducer);
  const loading = redux_data.loading;
  const {t, i18n} = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const validate = () => {
    let emreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailError = '';
    if (!email.length) {
      emailError = [t('recoverPassword.emailRequired')];
    } else if (!emreg.test(email)) {
      emailError = [t('recoverPassword.pleaseEnterVailidEmail')];
    } else {
      emailError = [];
    }
    if (emailError.length) {
      setError({...error, email: emailError});
      return false;
    }
    return true;
  };

  const onSend = () => {
    const isValid = validate();
    if (isValid) {
      dispatch(LOADER(true));
      recoverPassword({email: email})
        .then((res) => {
          console.log('result', res.data.message);

          dispatch(LOADER(false));
          navigation.navigate('OtpVerification', {email: email});
        })
        .catch((error) => {
          if (error.response) {
            console.log('errorrecovery', error.response.data.errors);
            setError(error.response.data.errors);
            dispatch(LOADER(false));
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
          style={styles.image}
          source={require('./images/recoverPassword.png')}>
          <FastImage
            style={styles.logo}
            source={require('src/assets/images/Logo.png')}
          />
        </ImageBackground>
        <Text style={styles.recoverText}>
          {t('recoverPassword.recoverPassword')}
        </Text>

        <Text style={styles.label}>{t('recoverPassword.enterAnEmail')}</Text>
        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text), error?.email && (error.email = null);
          }}
          style={[styles.input, error?.email && {borderColor: colors.appRed}]}
          keyboardType="email-address"
        />
        {error?.email && <ErrorText name={error?.email[0]} />}
        <CustomButton
          title={t('recoverPassword.send')}
          isLoading={loading}
          handlePress={onSend}
        />

        <View style={styles.footer}>
          <Text style={styles.noAccountText}>
            {' '}
            {t('recoverPassword.dontHaveAnAccount')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={styles.signUpText}>
              {' '}
              {t('recoverPassword.signup')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
  s;
}

export default RecoverPassword;
