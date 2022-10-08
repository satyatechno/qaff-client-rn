import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from 'react-native';
import styles from './SecurityQuestion.styles';

import CustomButton from 'src/components/custom-button/CustomButton';

import {useDispatch, useSelector} from 'react-redux';

import NetInfoStatus from 'src/components/net-info-status/NetInfoStatus';
import {TwoStepLogin} from 'src/services/http.service';
import {LOADER, MODAL_VISIBLE, USER_ACTION} from 'src/actions/action';
import {FETCH_NOTIFICATIONS} from 'src/actions/notification';
import {StackActions} from '@react-navigation/native';
import ErrorText from 'src/components/error-text/ErrorText';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';

function SecurityQuestion({navigation, route}) {
  const {t} = useTranslation();

  let redux_data = useSelector((state) => state.myReducer);
  const loading = redux_data.loading;

  const [answer, setAnswer] = useState('');
  const [Error, setError] = useState('');

  const dispatch = useDispatch();
  const onConfirm = () => {
    if (answer === '') {
      setError(t('twoStepWithSecurityQue.required'));
    } else {
      setError('');
      dispatch(LOADER(true));
      TwoStepLogin({
        token: route.params?.token,
        data: {
          two_step_otp_text: route.params?.otp,
          two_step_security_question: answer,
          is_final_step: JSON.stringify(route.params?.isFinalStep),
        },
      })
        .then((response) => {
          dispatch(LOADER(false));
          dispatch(USER_ACTION(response.data.data));
          dispatch(FETCH_NOTIFICATIONS());
          navigation.dispatch(StackActions.replace('Tabs'));
        })
        .catch((error) => {
          if (error.response.data) {
            dispatch(LOADER(false));
            console.log('errMessage', error.response.data.message);
            if (error.response.data.message.length > 0) {
              dispatch(
                MODAL_VISIBLE({
                  visible: true,
                  type: 2,
                  message: error.response.data.message,
                }),
                setAnswer(''),
              );
            }
          } else {
            console.log('Error at Security Question', error);
          }
        });
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <NetInfoStatus />

      <ScrollView style={styles.container}>
        <ImageBackground
          style={styles.banner}
          source={require('../../images/login-header.png')}>
          <FastImage
            style={styles.logo}
            source={require('src/assets/images/Logo.png')}
          />
        </ImageBackground>

        <Text style={styles.logIn}> {t('twoStepWithSecurityQue.login')}</Text>
        <Text style={styles.queText}>
          {t('twoStepWithSecurityQue.pleaseProvideText')}
        </Text>
        <Text style={styles.label}>{route?.params?.question}</Text>
        <TextInput
          value={answer}
          onChangeText={(text) => {
            setAnswer(text);
          }}
          style={[styles.input]}
          keyboardType="default"
        />
        {Error.length > 0 && <ErrorText name={Error} />}
        <CustomButton
          title={t('twoStepWithSecurityQue.submit')}
          isLoading={loading}
          handlePress={onConfirm}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SecurityQuestion;
