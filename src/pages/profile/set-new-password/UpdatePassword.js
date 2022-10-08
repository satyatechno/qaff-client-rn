import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from 'src/components/custom-button/CustomButton';
import Header from 'src/components/header/Header';
import colors from 'src/styles/texts/colors';
import {updateUserPassword} from 'src/services/http.service';
import {MODAL_VISIBLE} from 'src/actions/action';
import Snackbar from 'react-native-snackbar';
import i18n from 'src/locale/i18n';

const UpdatePassword = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.myReducer?.user?.token);
  const dispatch = useDispatch();

  const updatePassword = () => {
    // let newPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    let capitalAndSmallLetterRegex = /(?=.*[a-z])(?=.*[A-Z])/;
    let specialCharacterRegex = /[@$!%*?&]/;
    let numberRegex = /\d/;
    if (!currentPassword.length) {
      setCurrentPasswordError(true);
      Snackbar.show({
        text: i18n.t('updatePassword.pleaseEnterCurrentPassword'),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appRed,
      });
    } else if (!capitalAndSmallLetterRegex.test(newPassword)) {
      setNewPasswordError(true);
      Snackbar.show({
        text: i18n.t('updatePassword.passUperLower'),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appRed,
      });
    } else if (!specialCharacterRegex.test(newPassword)) {
      setNewPasswordError(true);
      Snackbar.show({
        text: i18n.t('updatePassword.passSpecial'),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appRed,
      });
    } else if (!numberRegex.test(newPassword)) {
      setNewPasswordError(true);
      Snackbar.show({
        text: i18n.t('updatePassword.passNumber'),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appRed,
      });
    } else if (newPassword.length < 8) {
      Snackbar.show({
        text: i18n.t('updatePassword.passwordinvailid'),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appRed,
      });
    } else if (newPassword.length !== confirmPassword.length) {
      setConfirmPasswordError(true);
    } else {
      setLoading(true);
      updateUserPassword({
        token: token,
        data: {
          account_type: 'freelancer',
          current_password: currentPassword,
          new_password: newPassword,
        },
      })
        .then((res) => {
          setLoading(false);
          setCurrentPasswordError(false);
          setNewPasswordError(false);
          setCurrentPasswordError(false);
          dispatch(
            MODAL_VISIBLE({
              visible: true,
              type: 1,
              message: res.data.message,
            }),
          );
          navigation.pop();
        })
        .catch((err) => {
          setLoading(false);
          dispatch(
            MODAL_VISIBLE({
              visible: true,
              type: 2,
              message: err.response?.data?.message,
            }),
          );
        });
    }
  };
  console.log('aa', currentPassword, newPassword);
  return (
    <>
      <Header
        title={i18n.t('updatePassword.updatePassword')}
        notificationButton
        backButton
        navigation={navigation}
      />
      <View
        style={{
          backgroundColor: colors.appBackground,
          flex: 1,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, color: colors.appGray, paddingTop: 20}}>
          {i18n.t('updatePassword.enterCurrent')}
        </Text>
        <TextInput
          onFocus={() => setCurrentPasswordError(false)}
          style={{
            borderWidth: 1.5,
            borderColor: !currentPasswordError ? colors.skyBlue : colors.appRed,
            height: 40,
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
            fontSize: 16,
          }}
          secureTextEntry={true}
          onChangeText={(text) => setCurrentPassword(text)}
        />
        <Text style={{fontSize: 16, color: colors.appGray, paddingTop: 20}}>
          {i18n.t('updatePassword.updatePassword')}
        </Text>
        <TextInput
          onFocus={() => setNewPasswordError(false)}
          style={{
            borderWidth: 1.5,
            borderColor: !newPasswordError ? colors.skyBlue : colors.appRed,
            height: 40,
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
            fontSize: 16,
          }}
          secureTextEntry={true}
          onChangeText={(text) => setNewPassword(text)}
        />
        <Text style={{color: colors.appGray, fontSize: 12}}>
          {i18n.t('updatePassword.passwordNote')}
        </Text>
        <Text style={{fontSize: 16, color: colors.appGray, paddingTop: 20}}>
          {i18n.t('updatePassword.confirmPassword')}
        </Text>
        <TextInput
          onFocus={() => setNewPasswordError(false)}
          style={{
            borderWidth: 1.5,
            borderColor: !confirmPasswordError ? colors.skyBlue : colors.appRed,
            height: 40,
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
            fontSize: 16,
          }}
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        {confirmPasswordError && (
          <Text style={{color: colors.appRed}}>
            {i18n.t('updatePassword.mismatchPassword')}
          </Text>
        )}

        <TouchableOpacity
          isLoading={loading}
          mode={1}
          onPress={updatePassword}
          style={{
            marginTop: 30,
            backgroundColor: colors.skyBlue,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          {loading ? (
            <ActivityIndicator color={colors.defaultWhite} size="large" />
          ) : (
            <Text
              style={{
                fontSize: 16,
                color: colors.defaultWhite,
                fontWeight: 'bold',
              }}>
              {i18n.t('updatePassword.updatePassword')}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default UpdatePassword;
