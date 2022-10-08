import {StackActions} from '@react-navigation/native';
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
import {LOADER, USER_ACTION} from 'src/actions/action';
import {FETCH_NOTIFICATIONS} from 'src/actions/notification';
import CityContainer from 'src/components/city/CityContainer';
import Countries from 'src/components/countries/Countries';
import CustomButton from 'src/components/custom-button/CustomButton';
import ErrorText from 'src/components/error-text/ErrorText';
import ShowCities from 'src/components/show-cities/ShowCities';
import ShowCountries from 'src/components/show-countries/ShowCountries';
import {createFreelancerProfile} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './CreateProfile.styles';

function CreateProfile({navigation, route}) {
  let redux_data = useSelector((state) => state.myReducer);
  const loading = redux_data.loading;
  const {t} = useTranslation();

  // const [country, setCountry] = useState({name: 'India', callingCode: ['91']});
  // const [cca2, setCca2] = useState('IN');
  // const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState('');

  const [gender, setgender] = useState('');

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
    let cityError = '';
    let countryError = '';

    if (!city) {
      cityError = t('createProfile.pleaseSelectCity');
    } else {
      cityError = '';
    }

    if (!country) {
      countryError = t('createProfile.pleaseSelectCountry');
    } else {
      countryError = '';
    }

    if (cityError.length || countryError.length) {
      setError({
        ...error,
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
      createFreelancerProfile({
        data: {
          first_name:
            firstName !== null
              ? firstName
              : route.params?.freelancer_first_name,
          last_name:
            lastName !== null ? lastName : route.params?.freelancer_last_name,
          gender: gender,
          country_id: country?.id,
          city_id: city?.id,
        },
        token: route.params?.token,
      })
        .then((res) => {
          console.log(
            'create Freelancer profile response',
            JSON.stringify(res.data),
          );

          setError('');

          dispatch(LOADER(false));

          setFirstName('');
          setLastName('');
          setEmail('');

          setgender('');

          dispatch(USER_ACTION(res.data.data));
          dispatch(FETCH_NOTIFICATIONS());
          navigation.dispatch(StackActions.replace('Tabs'));
        })
        .catch((error) => {
          dispatch(LOADER(false));
          if (error?.response?.data) {
            console.log('errMessage', error.response.data.message);

            console.log('Errors=====', error.response.data.errors);

            setError(error.response.data.errors);
          } else {
            console.log('create profile Errormessage', error);
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
            {t('createProfile.createProfile')}
          </Text>
          <View style={styles.nameContainer}>
            <View>
              <Text style={styles.fnameText}>
                {t('createProfile.firstName')}
              </Text>
              <TextInput
                value={
                  firstName !== null
                    ? firstName
                    : route.params?.freelancer_first_name
                }
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
                {t('createProfile.lastName')}
              </Text>
              <TextInput
                value={
                  lastName !== null
                    ? lastName
                    : route.params?.freelancer_last_name
                }
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
          <Text style={styles.genderText}>{t('createProfile.gender')}</Text>
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
                  size={23}
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
                  size={23}
                  color={colors.defaultWhite}
                  style={styles.checkIcon}
                />
              ) : (
                <></>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.emailText}>{t('createProfile.email')}</Text>
          <TextInput
            editable={false}
            keyboardType="email-address"
            value={route.params?.freelancer_email}
            onChangeText={(text) => {
              setEmail(text), error?.email && (error.email = null);
            }}
            style={[
              styles.emailInput,
              error?.email && {borderColor: colors.appRed},
            ]}
          />

          <Text style={[styles.emailText, {marginTop: 10}]}>
            {t('createProfile.country')}
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
              {country?.name ?? t('createProfile.selectCountry')}
            </Text>
          </TouchableOpacity>
          {error?.country ? <ErrorText name={error.country} /> : null}

          <Text style={[styles.emailText, {marginTop: 10}]}>
            {t('createProfile.city')}
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
              {city?.name ?? t('createProfile.selectCity')}
            </Text>
          </TouchableOpacity>
          {error?.city ? <ErrorText name={error.city} /> : null}
          <CustomButton
            title={t('createProfile.createProfileButton')}
            isLoading={loading}
            handlePress={onCreateAccount}
          />
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

export default CreateProfile;
