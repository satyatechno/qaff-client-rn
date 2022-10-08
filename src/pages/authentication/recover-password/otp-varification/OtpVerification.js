import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './OtpVerification.styles';
import {useTranslation} from 'react-i18next';
import colors from 'src/styles/texts/colors';
import ErrorText from 'src/components/error-text/ErrorText';
import CustomButton from 'src/components/custom-button/CustomButton';
import {otpVerification, recoverPassword} from 'src/services/http.service';
import {LOADER, MODAL_VISIBLE} from 'src/actions/action';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

function OtpVerification({navigation, route}) {
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
      console.log('PARAMS TOKEN', route.params?.email);
      console.log('OTP===', input1 + input2 + input3 + input4);
      var otp = input1 + input2 + input3 + input4;
      otpVerification({
        otp: otp,
        email: route.params?.email,
      })
        .then((response) => {
          dispatch(LOADER(false));
          console.log('testing>>', response.data.message);
          if (response.status === 200) {
            dispatch(
              MODAL_VISIBLE({
                visible: true,
                type: 1,
                message: response.data.message,
              }),
            );
            navigation.navigate('CreateNewPassword', {
              otp: otp,
              email: route.params?.email,
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
  const onResendOTP = () => {
    // setIsLoading(true)
    recoverPassword({email: route.params?.email})
      .then((res) => {
        console.log('result', res.data.message);
        dispatch(
          MODAL_VISIBLE({
            visible: true,
            type: 1,
            message: res.data.message,
          }),
        );
        setModal;
      })
      .catch((error) => {
        if (error.response) {
          console.log('errorrecovery', error.response.data.errors);
          setError(error.response.data.errors);
          // setIsLoading(false)
        }
      });
  };

  return (
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
          {t('otpVerification.recoverPassword')}
        </Text>

        <Text style={styles.enterOtpText}>
          {t('otpVerification.enterTheOpt')}
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
          {/* <TextInput
           style={[styles.input,error&&{borderColor:colors.appRed}]}
            keyboardType="numeric"
            // maxLength={1}
            value={input5}
            ref={ref_input5}
            onChangeText={(text) => {
              setInput5(text);
              input5.length > 0 ||
                (input5.length !== null && ref_input6.current.focus());
            }}
            onKeyPress={(e) =>
                e.nativeEvent.key === 'Backspace' && ref_input4.current.focus()
              }
          />
          <TextInput
           style={[styles.input,error&&{borderColor:colors.appRed}]}
            keyboardType="numeric"
            // maxLength={1}
            value={input6}
            ref={ref_input6}
            onChangeText={(text) => setInput6(text)}
            onKeyPress={(e) =>
                e.nativeEvent.key === 'Backspace' && ref_input5.current.focus()
              }
          /> */}
        </View>
        {error && <ErrorText name={t('otpVerification.otpRequire')} />}

        <View style={styles.resendContainer}>
          <TouchableOpacity onPress={onResendOTP}>
            <Text style={styles.resendText}>
              {t('otpVerification.resendOtp')}
            </Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          title={t('otpVerification.verify')}
          isLoading={loading}
          handlePress={onVerifyOTP}
        />
        {/* <View style={styles.footer}>
          <Text style={styles.footerLeftText}>
            {t('already-have-an-account')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.footerRightText}>{t('sign-in')}</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  );
}

export default OtpVerification;
