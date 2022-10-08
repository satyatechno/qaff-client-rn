import React, {useRef, useState} from 'react';
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
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {LOADER, MODAL_VISIBLE} from 'src/actions/action';
import CityContainer from 'src/components/city/CityContainer';
import Countries from 'src/components/countries/Countries';
import CustomButton from 'src/components/custom-button/CustomButton';
import ErrorText from 'src/components/error-text/ErrorText';
import ShowCities from 'src/components/show-cities/ShowCities';
import ShowCountries from 'src/components/show-countries/ShowCountries';
import {register} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './CreateAccount.styles';

function CreateAccount({navigation}) {
  let redux_data = useSelector((state) => state.myReducer);
  const loading = redux_data.loading;
  const {t} = useTranslation();

  // const [country, setCountry] = useState({name: 'India', callingCode: ['91']});
  // const [cca2, setCca2] = useState('IN');
  // const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [gender, setgender] = useState('male');

  const [error, setError] = useState('');
  const [country, setCountry] = useState({
    id: 194,
    name: 'Saudi Arabia',
    iso: 'SA',
    iso3: 'SAU',
    phonecode: '966',
    flag: 'https://dev.qaff.com/back-dev/images/flags/sa.svg',
  });
  const [countrySearch, setCountrySearch] = useState('');
  const [city, setCity] = useState(null);
  const [citySearch, setCitySearch] = useState('');

  const RBCountryRef = useRef();
  const RBCityRef = useRef();

  const dispatch = useDispatch();
  const validate = () => {
    let emreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailError = '';
    let firstNameError = '';
    let lastNameError = '';
    let cityError = '';
    let countryError = '';
    if (!email.length) {
      emailError = [t('createAccount.emailRequired')];
    } else if (!emreg.test(email)) {
      emailError = [t('createAccount.pleaseEnterVailidEmail')];
    } else {
      emailError = [];
    }
    if (!firstName.length) {
      firstNameError = [t('createAccount.required')];
    } else {
      firstNameError = [];
    }
    if (!lastName.length) {
      lastNameError = [t('createAccount.required')];
    } else {
      lastNameError = [];
    }
    if (!city) {
      cityError = t('createAccount.pleaseSelectCity');
    } else {
      cityError = '';
    }

    if (!country) {
      countryError = t('createAccount.pleaseSelectCountry');
    } else {
      countryError = '';
    }

    if (
      emailError.length ||
      firstNameError.length ||
      lastNameError.length ||
      cityError.length ||
      countryError.length
    ) {
      setError({
        ...error,
        email: emailError,
        first_name: firstNameError,
        last_name: lastNameError,
        city: cityError,
        country: countryError,
      });
      return false;
    }
    return true;
  };

  const onCreateAccount = () => {
    const isValid = validate();
    if (isValid) {
      dispatch(LOADER(true));

      register({
        first_name: firstName,
        last_name: lastName,
        email: email,
        gender: gender,
        country_id: country?.id,
        city_id: city?.id,
      })
        .then((res) => {
          console.log('registerResponse1', JSON.stringify(res.data));

          setError('');

          dispatch(LOADER(false));

          setFirstName('');
          setLastName('');
          setEmail('');

          setgender('');
          dispatch(
            MODAL_VISIBLE({
              visible: true,
              type: 1,
              message: t('createAccount.accountCreateSuccess'),
            }),
          );
          navigation.navigate('EmailVerification', {
            token: res.data.data.token,
          });
        })
        .catch((error) => {
          dispatch(LOADER(false));
          if (error?.response?.data) {
            console.log('errMessage', error.response.data.message);

            console.log('Errors=====', error.response.data.errors);

            if (
              email.length > 0 &&
              error.response.data.errors
                ?.account_found_nd_verification_required === true
            ) {
              // dispatch(
              //   MODAL_VISIBLE({
              //     visible: true,
              //     type: 2,
              //     message: t('createAccount.verificationRequire'),
              //   }),
              // );
              navigation.navigate('EmailVerification', {
                token: error.response.data.data.token,
              });
            }

            setError(error.response.data.errors);
          } else {
            console.log('Errormessage', error);
          }
        });
    }
  };

  const handleCountrySelect = (country) => {
    setCountry(country);
    error?.country && (error.country = null);
    RBCountryRef.current.close();
  };
  const handleCitySelect = (city) => {
    setCity(city);
    error?.city && (error.city = null);
    RBCityRef.current.close();
  };

  const handleCountrySearch = (text) => {
    setCountrySearch(text);
  };
  const handleCitySearch = (text) => {
    setCitySearch(text);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <ScrollView style={styles.container}>
        <ImageBackground
          style={styles.banner}
          source={require('./images/header.png')}>
          <FastImage
            style={styles.logo}
            source={require('src/assets/images/Logo.png')}
          />
        </ImageBackground>

        <View style={styles.childContainer}>
          <Text style={styles.createAccountText}>
            {t('createAccount.createAccount')}
          </Text>
          <View style={styles.nameContainer}>
            <View>
              <Text style={styles.fnameText}>
                {t('createAccount.firstName')}
              </Text>
              <TextInput
                value={firstName}
                onChangeText={(text) => {
                  setFirstName(text),
                    error?.first_name && (error.first_name = null);
                }}
                style={[
                  styles.fnameInput,
                  error?.first_name && {borderColor: colors.appRed},
                ]}
              />
              {error?.first_name && (
                <ErrorText name={error?.first_name[0]} fontSize={10} />
              )}
            </View>
            <View>
              <Text style={styles.lnameText}>
                {t('createAccount.lastName')}
              </Text>
              <TextInput
                value={lastName}
                onChangeText={(text) => {
                  setLastName(text),
                    error?.last_name && (error.last_name = null);
                }}
                style={[
                  styles.lnameInput,
                  error?.last_name && {borderColor: colors.appRed},
                ]}
              />
              {error?.last_name && (
                <View style={{marginStart: -20}}>
                  <ErrorText name={error?.last_name[0]} fontSize={10} />
                </View>
              )}
            </View>
          </View>
          <View></View>
          <Text style={styles.genderText}>{t('createAccount.gender')}</Text>
          <View style={styles.genderTypeContainer}>
            <TouchableOpacity onPress={() => setgender('male')}>
              <View style={styles.genderBox}>
                <FastImage
                  style={styles.genderImage}
                  source={require('./images/Male.png')}
                />
              </View>
              {gender === 'male' ? (
                <Ionicons
                  name="checkmark"
                  size={18}
                  color={colors.defaultWhite}
                  style={styles.checkIcon}
                />
              ) : (
                <></>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setgender('female')}>
              <View style={styles.genderBox}>
                <FastImage
                  style={styles.genderImage}
                  source={require('./images/Female.png')}
                />
              </View>
              {gender === 'female' ? (
                <Ionicons
                  name="checkmark"
                  size={18}
                  color={colors.defaultWhite}
                  style={styles.checkIcon}
                />
              ) : (
                <></>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.emailText}>{t('createAccount.email')}</Text>
          <TextInput
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text), error?.email && (error.email = null);
            }}
            style={[
              styles.emailInput,
              error?.email && {borderColor: colors.appRed},
            ]}
          />
          {error?.email && <ErrorText name={error?.email[0]} />}

          <Text style={[styles.emailText, {marginTop: 10}]}>
            {t('createAccount.country')}
          </Text>

          <TouchableOpacity
            disabled
            delayPressIn={0}
            delayPressOut={0}
            onPress={() => RBCountryRef.current.open()}
            activeOpacity={0.5}
            style={{
              marginHorizontal: 20,
              height: 40,
              paddingHorizontal: 10,
              backgroundColor: colors.appBackground,
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: error?.country ? colors.appRed : colors.skyBlue,
            }}>
            <Text style={{fontSize: 16, color: colors.appBlack}}>
              {country?.name ?? t('createAccount.selectCountry')}
            </Text>
          </TouchableOpacity>
          {error?.country ? <ErrorText name={error.country} /> : null}

          <Text style={[styles.emailText, {marginTop: 10}]}>
            {t('createAccount.city')}
          </Text>

          <TouchableOpacity
            disabled={!country}
            delayPressIn={0}
            delayPressOut={0}
            onPress={() => RBCityRef.current.open()}
            activeOpacity={0.5}
            style={{
              marginHorizontal: 20,
              height: 40,
              paddingHorizontal: 10,
              backgroundColor: !country
                ? colors.appGray1
                : colors.appBackground,
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: error?.city ? colors.appRed : colors.skyBlue,
            }}>
            <Text style={{fontSize: 16, color: colors.appBlack}}>
              {city?.name ?? t('createAccount.selectCity')}
            </Text>
          </TouchableOpacity>
          {error?.city ? <ErrorText name={error.city} /> : null}

          {/* <Text style={styles.phoneText}>{t('enter-phno')}</Text>
        <View style={[styles.phoneContainer, error?.phone && {borderColor: colors.appRed},]}>
          <View style={styles.countryPicker}>
            <TouchableOpacity onPress={() => setShowCountryPicker(true)}>
              <CountryPicker
                countryCode={cca2}
                onSelect={(value) => (setCountry(value), setCca2(value.cca2))}
                cca2={cca2}
                withFlagButton={true}
                withCallingCodeButton={true}
                withFilter={true}
                withAlphaFilter={true}
                visible={showCountryPicker}
                onClose={() => setShowCountryPicker(false)}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            value={phoneNo}
            onChangeText={(text) => setPhoneNo(text)}
            style={styles.phoneInput}
            placeholder={t('phone-number')}
          />
        </View>
        {error?.phone && <ErrorText name={error?.phone[0]} />} */}

          <CustomButton
            title={t('createAccount.next')}
            isLoading={loading}
            handlePress={onCreateAccount}
          />
          <View style={styles.footer}>
            <Text style={styles.footerLeftText}>
              {t('createAccount.alreadyHaveAnAccount')}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.footerRightText}>
                {t('createAccount.signin')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <RBSheet
        closeOnDragDown
        closeOnPressBack
        closeDuration={10}
        closeOnPressMask
        children={
          <Countries search={countrySearch}>
            {(isCountriesLoading, countries) => (
              <ShowCountries
                handleCountrySearch={handleCountrySearch}
                countrySearch={countrySearch}
                loading={isCountriesLoading}
                countries={countries}
                handleCountrySelect={handleCountrySelect}
              />
            )}
          </Countries>
        }
        animationType="slide"
        // onClose={this.closeDatePicker}
        ref={RBCountryRef}
        height={350}
        openDuration={100}
      />
      <RBSheet
        closeOnDragDown
        closeOnPressBack
        closeDuration={0}
        closeOnPressMask
        children={
          <CityContainer search={citySearch} countryId={country?.id}>
            {(loading, error, cities) => (
              <ShowCities
                handleCitySearch={handleCitySearch}
                citySearch={citySearch}
                loading={loading}
                cities={cities}
                handleCitySelect={handleCitySelect}
                error={error}
              />
            )}
          </CityContainer>
        }
        animationType="slide"
        // onClose={this.closeDatePicker}
        ref={RBCityRef}
        height={350}
        openDuration={100}
      />
    </KeyboardAvoidingView>
  );
}

export default CreateAccount;
