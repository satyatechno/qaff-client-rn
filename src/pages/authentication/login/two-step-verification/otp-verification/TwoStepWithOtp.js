import React, {useState, useRef} from 'react';
import {View, Text, ImageBackground, TextInput, ScrollView} from 'react-native';
import styles from './TwoStepWithOtp.styles';
import {useTranslation} from 'react-i18next';
import colors from 'src/styles/texts/colors';
import ErrorText from 'src/components/error-text/ErrorText';
import CustomButton from 'src/components/custom-button/CustomButton';
import {TwoStepLogin} from 'src/services/http.service';
import {LOADER, MODAL_VISIBLE, USER_ACTION} from 'src/actions/action';
import {useDispatch, useSelector} from 'react-redux';
import {FETCH_NOTIFICATIONS} from 'src/actions/notification';
import {StackActions} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

function TwoStepWithOtp({navigation, route}) {
  let redux_data = useSelector((state) => state.myReducer);
  const loading = redux_data.loading;
  const {t} = useTranslation();
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  // const [input5, setInput5] = useState('');
  // const [input6, setInput6] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const ref_input1 = useRef();

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  // const ref_input5 = useRef();
  // const ref_input6 = useRef();
  const dispatch = useDispatch();
  const onVerifyOTP = () => {
    input1 === '' || input2 === '' || input3 === '' || input4 === ''
      ? setError(true)
      : setError(false);
    if (!error) {
      dispatch(LOADER(true));
      //   console.log('PARAMS TOKEN', route?.params?.account_security);
      //   console.log('OTP===', input1 + input2 + input3 + input4);
      var otp = input1 + input2 + input3 + input4;
      TwoStepLogin({
        token: route.params?.token,
        data: {
          two_step_otp_text: otp,
          is_final_step: JSON.stringify(route.params?.isFinalStep),
        },
      })
        .then((response) => {
          dispatch(LOADER(false));
          if (route.params?.isFinalStep) {
            dispatch(USER_ACTION(response.data.data));
            dispatch(FETCH_NOTIFICATIONS());
            navigation.dispatch(StackActions.replace('Tabs'));
          } else {
            navigation.navigate('SecurityQuestion', {
              token: route.params?.token,
              otp: otp,
              isFinalStep: true,
              question:
                route?.params?.account_security[
                  route?.params?.account_security.findIndex(
                    (x) => x.name === 'two_step_security_question',
                  )
                ].question,
            });
          }
        })
        .catch((error) => {
          if (error.response.data) {
            dispatch(LOADER(false));
            console.log('errMessage', error.response.data.message);
            if (error.response.data.message.length > 0 && otp.length === 4) {
              dispatch(
                MODAL_VISIBLE({
                  visible: true,
                  type: 2,
                  message: error.response.data.message,
                }),
              );
            }
          } else {
            console.log('error in testing >>', error);
          }
        });
    }
  };
  const onResendOTP = () => {};

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.banner}
        source={require('../../images/login-header.png')}>
        <FastImage
          style={styles.logo}
          source={require('src/assets/images/Logo.png')}
        />
      </ImageBackground>

      <View style={styles.childContainer}>
        <Text style={styles.createAccountText}>
          {t('twoStepWithOTP.login')}
        </Text>

        <Text style={styles.enterOtpText}>
          {t('twoStepWithOTP.enterTheOpt')}
        </Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={[styles.input, error && {borderColor: colors.appRed}]}
            keyboardType="numeric"
            maxLength={1}
            ref={ref_input1}
            value={input1}
            onChangeText={(text) => {
              setInput1(text);
              input1.length > 0 ||
                (input1.length !== null && ref_input2.current.focus());
            }}
          />
          <TextInput
            style={[styles.input, error && {borderColor: colors.appRed}]}
            keyboardType="numeric"
            maxLength={1}
            value={input2}
            ref={ref_input2}
            onChangeText={(text) => {
              setInput2(text);
              input2.length > 0 ||
                (input2.length !== null && ref_input3.current.focus());
            }}
            onKeyPress={(e) =>
              e.nativeEvent.key === 'Backspace' && ref_input1.current.focus()
            }
          />
          <TextInput
            style={[styles.input, error && {borderColor: colors.appRed}]}
            keyboardType="numeric"
            maxLength={1}
            value={input3}
            ref={ref_input3}
            onChangeText={(text) => {
              setInput3(text);
              input3.length > 0 ||
                (input3.length !== null && ref_input4.current.focus());
            }}
            onKeyPress={(e) =>
              e.nativeEvent.key === 'Backspace' && ref_input2.current.focus()
            }
          />
          <TextInput
            style={[styles.input, error && {borderColor: colors.appRed}]}
            keyboardType="numeric"
            maxLength={1}
            value={input4}
            ref={ref_input4}
            onChangeText={(text) => {
              setInput4(text);

              // input4.length > 0 ||
              //   (input4.length !== null && ref_input5.current.focus());
            }}
            onKeyPress={(e) =>
              e.nativeEvent.key === 'Backspace' && ref_input3.current.focus()
            }
          />
        </View>
        {error && <ErrorText name={t('twoStepWithOTP.otpRequire')} />}

        {/* <View style={styles.resendContainer}>
          <TouchableOpacity onPress={onResendOTP}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        </View> */}

        <CustomButton
          title={t('twoStepWithOTP.verify')}
          isLoading={loading}
          handlePress={onVerifyOTP}
        />
      </View>
    </ScrollView>
  );
}

export default TwoStepWithOtp;
