import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './EmailVerification.styles';
import {useTranslation} from 'react-i18next';
import colors from 'src/styles/texts/colors';
import ErrorText from 'src/components/error-text/ErrorText';
import CustomButton from 'src/components/custom-button/CustomButton';
import {emailVerification, resendOTP} from 'src/services/http.service';
import ConfirmationDialog from 'src/components/confirmation-dialog/ConfirmationDialog';
import ErrorDialog from 'src/components/error-dialog/ErrorDialog';
import {LOADER, MODAL_VISIBLE} from 'src/actions/action';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

function EmailVerification({navigation, route}) {
  let redux_data = useSelector((state) => state.myReducer);
  const loading = redux_data.loading;
  const {t} = useTranslation();
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  // const [input5, setInput5] = useState('');
  // const [input6, setInput6] = useState('');
  const [error, setError] = useState(false);

  const ref_input1 = useRef();

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const dispatch = useDispatch();
  // const ref_input5 = useRef();
  // const ref_input6 = useRef();

  const onVerifyOTP = () => {
    input1 === '' || input2 === '' || input3 === '' || input4 === ''
      ? setError(true)
      : setError(false);
    if (!error) {
      dispatch(LOADER(true));
      console.log('PARAMS TOKEN', route.params?.token);
      console.log('OTP===', input1 + input2 + input3 + input4);
      var otp = input1 + input2 + input3 + input4;
      emailVerification({
        otp: otp,
        token: route.params?.token,
      })
        .then((response) => {
          dispatch(LOADER(false));
          console.log('testing>>', response.status);
          if (response.status === 200) {
            dispatch(
              MODAL_VISIBLE({
                visible: true,
                type: 1,
                message: response.data.message,
              }),
            );
            navigation.navigate('CreatePassword', {
              otp: otp,
              token: route.params?.token,
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
  const onResend = () => {
    // console.log("token",route.params?.token);
    // setModalVisible(false)
    resendOTP({
      token: route.params?.token,
    })
      .then((response) => {
        console.log('result', response.data.message);
        dispatch(
          MODAL_VISIBLE({
            visible: true,
            type: 1,
            message: response.data.message,
          }),
        );
      })
      .catch((error) => {
        if (error.response.data) {
          console.log('errMessage', error.response.data.message);
        } else {
          console.log('error in testing >>', error);
        }
      });
  };

  return (
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
          {t('emailVerification.createAccount')}
        </Text>

        <Text style={styles.enterOtpText}>
          {t('emailVerification.enterTheOpt')}
        </Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={[styles.input, error && {borderColor: colors.appRed}]}
            keyboardType="numeric"
            maxLength={1}
            value={input1}
            ref={ref_input1}
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
            style={[styles.input, error && {borderColor: colors.appRed}]}
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
            style={[styles.input, error && {borderColor: colors.appRed}]}
            keyboardType="numeric"
            // maxLength={1}
            value={input6}
            ref={ref_input6}
            onKeyPress={(e) =>
              e.nativeEvent.key === 'Backspace' && ref_input5.current.focus()
            }
            onChangeText={(text) => setInput6(text)}
          /> */}
        </View>
        {error && <ErrorText name={t('emailVerification.otpRequire')} />}

        <View style={styles.resendContainer}>
          <TouchableOpacity onPress={onResend}>
            <Text style={styles.resendText}>
              {t('emailVerification.resendOtp')}
            </Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          title={t('emailVerification.verify')}
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

export default EmailVerification;
