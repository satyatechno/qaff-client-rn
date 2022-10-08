import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MonthPicker from 'react-native-month-year-picker';
import {useSelector} from 'react-redux';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import {cardType} from 'src/helpers/cardType';
import {saveCard} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './PaymentDetails.styles';

export default function PaymentDetails({navigation, route}) {
  const {t} = useTranslation();

  const [cardNo, setCardNo] = useState('');
  const [date, setDate] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [cvvError, setCvvError] = useState(false);
  const [cardTypeError, setCardTypeError] = useState(false);
  const token = useSelector((state) => state.myReducer?.user?.token);
  const showPicker = useCallback((value) => setShowDate(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  const openDatePicker = () => {
    setShowDate(true);
  };

  const closeDatePicker = () => {};
  const cc_format = (value) => {
    let newValue = value;
    var v = newValue.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = v.match(/\d{4,16}/g);
    var match = (matches && matches[0]) || '';
    var parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const onSaveCard = () => {
    setLoading(true);
    const {id, myNavigation} = route?.params;
    saveCard({
      data: {
        paymentBrand: id === 0 ? 'MADA' : cardType(cardNo),
        card: {
          number: cardNo.replace(/\s/g, ''),
          holder: cardHolderName,
          expiryMonth: moment(date).format('MM'),
          expiryYear: moment(date).format('YYYY'),
          cvv: cvv,
        },
      },
      token: token,
    })
      .then((res) => {
        setLoading(false);
        console.log('Card successfully saved', res?.data?.data);

        if (myNavigation) {
          navigation.navigate(myNavigation, {success: res?.data?.data});
        } else {
          navigation.navigate('Payment', {
            success: res?.data?.data,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error('Couldnot save card', JSON.stringify(err, null, 2));
        if (err.response.data) {
          alert(err.response.data.message);
        }
      });
  };
  const checkValidation = () => {
    const {id} = route?.params;
    if (cardHolderName === '' || cardNo === '' || date === '' || cvv === '') {
      if (cardHolderName === '') {
        setNameError(true);
      } else {
        setNameError(false);
      }
      if (cardNo === '') {
        setCardNumberError(true);
      } else {
        setCardNumberError(false);
      }
      if (date === '') {
        setDateError(true);
      } else {
        setDateError(false);
      }
      if (cvv === '') {
        setCvvError(true);
      } else {
        setCvvError(false);
      }
    } else {
      setCvvError(false);
      setDateError(false);
      setCardNumberError(false);
      setNameError(false);
      onSaveCard();
    }
  };

  const getCardType = () => {
    const {id, name} = route?.params;
    if (id === 1) return 'MADA';
    else if (id === 2) {
      const card = cardType(cardNo);
      if (card === 'UNKNOWN') return name;
      else return card;
    }
  };
  const CardImage = () => {
    if (getCardType() === 'MADA')
      return (
        <FastImage
          source={require('src/assets/images/mada.png')}
          style={{height: 22, width: 66}}
        />
      );
    else if (getCardType() === 'MASTER')
      return (
        <FastImage
          source={require('src/assets/images/mastercard.png')}
          style={{height: 25, width: 42}}
        />
      );
    else if (getCardType() === 'VISA')
      return (
        <FastImage
          source={require('src/assets/images/visa.png')}
          style={{
            height: 25,
            width: 66,
            backgroundColor: colors.skyBlue,
            borderRadius: 5,
          }}
        />
      );
    else if (getCardType() === 'MAESTRO')
      return (
        <FastImage
          source={require('src/assets/images/maestro.png')}
          style={{
            height: 25,
            width: 42,
          }}
        />
      );
    else
      return (
        <Text style={[styles.cardType, {height: 25}]}>{getCardType()}</Text>
      );
  };
  return (
    <View style={{backgroundColor: colors.defaultWhite, flex: 1}}>
      <Header
        backButton
        title={t('paymentDetails.paymentDetails')}
        notificationButton
        navigation={navigation}
      />
      <View style={styles.cardTypeContainer}>
        <Text style={styles.cardTypeText}>{t('paymentDetails.cardType')}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CardImage />
        </View>
      </View>
      <Text style={styles.cardNumberText}>{t('paymentDetails.name')}</Text>
      <View style={styles.cardNoInputContainer}>
        <TextInput
          style={styles.cardNoInput}
          value={cardHolderName}
          onChangeText={(text) => setCardHolderName(text)}
        />
      </View>
      {nameError && (
        <View style={{marginStart: -10, marginTop: -10, marginBottom: 10}}>
          <ErrorText name={t('paymentDetails.nameRequired')} />
        </View>
      )}
      <Text style={styles.cardNumberText}>
        {t('paymentDetails.cardNumber')}
      </Text>

      <View style={styles.cardNoInputContainer}>
        <TextInput
          maxLength={19}
          style={styles.cardNoInput}
          keyboardType="number-pad"
          value={cc_format(cardNo)}
          onChangeText={(text) => setCardNo(text)}
        />
      </View>
      {cardNumberError && (
        <View style={{marginStart: -10, marginTop: -10, marginBottom: 10}}>
          <ErrorText name={t('paymentDetails.cardNoRequired')} />
        </View>
      )}
      <View style={styles.expAndCvvContainer}>
        <View style={styles.expContainer}>
          <Text style={styles.expText}>{t('paymentDetails.expDate')}</Text>
          <TouchableOpacity
            onPress={() => {
              showPicker(true);
              Keyboard.dismiss();
            }}
            style={styles.expButton}>
            <Text style={styles.expValue}>
              {date !== '' && moment(date).format('MM/YYYY')}
            </Text>
          </TouchableOpacity>
          {dateError && (
            <View style={{marginStart: -20}}>
              <ErrorText name={t('paymentDetails.dateRequired')} />
            </View>
          )}
        </View>
        <View style={styles.cvvContainer}>
          <Text style={styles.cvvText}>{t('paymentDetails.cvv')}</Text>
          <TextInput
            returnKeyType="done"
            value={cvv}
            onChangeText={(cvv) => setCvv(cvv)}
            style={styles.cvvNoInput}
            keyboardType="number-pad"
          />
          {cvvError && (
            <View style={{marginStart: -20}}>
              <ErrorText name={t('paymentDetails.cvvRequired')} />
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity onPress={checkValidation} style={styles.saveCardButton}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.defaultWhite} />
        ) : (
          <Text style={styles.saveCardText}>
            {t('paymentDetails.saveCard')}
          </Text>
        )}
      </TouchableOpacity>
      {showDate && (
        <MonthPicker
          onChange={onValueChange}
          value={new Date()}
          minimumDate={new Date()}
          mode="number"
        />
      )}
    </View>
  );
}
