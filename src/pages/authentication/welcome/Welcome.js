import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './Welcome.styles';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';

function Welcome({navigation}) {
  const {t, i18n} = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('./images/girl-header.png')}>
        <FastImage
          style={styles.logo}
          source={require('src/assets/images/Logo.png')}
        />
      </ImageBackground>

      <Text style={styles.welcomeText}>{t('welcome.welcome')}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Signup');
        }}
        style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>{t('welcome.signup')}</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>{t('welcome.or')}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
        style={styles.logInButton}>
        <Text style={styles.logInButtonText}>{t('welcome.login')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Welcome;
