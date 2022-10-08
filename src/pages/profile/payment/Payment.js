import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import Header from 'src/components/header/Header';

import styles from './Payment.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {deleteSavedCard, fetchPaymentCards} from 'src/services/http.service';
import {useSelector} from 'react-redux';
import colors from 'src/styles/texts/colors';
import FastImage from 'react-native-fast-image';
import i18n from 'src/locale/i18n';

export default function Payment({navigation, route}) {
  const [paymmentCards, setPaymentCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.myReducer?.user?.token);

  useEffect(() => {
    fetchPaymentCards({token: token})
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 2));
        setPaymentCards(res.data?.data?.saved_methods);
      })
      .catch((err) => {
        console.error('Paymenet cards fetching err', err);
      });
  }, [route?.params?.success]);

  const addPaymentCard = () => {
    navigation.navigate('PaymentMethod');
  };

  const onDeleteCard = (id, index) => {
    setLoading(true);
    deleteSavedCard({id: id, token: token})
      .then((res) => {
        console.log(
          'Card deleted successfully',
          JSON.stringify(res?.data, null, 2),
        );
        let temp = [...paymmentCards];
        temp.splice(index, 1);
        setPaymentCards(temp);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Couldnot delete card', err);
        setLoading(false);
      });
  };

  const getCardImage = (type) => {
    let cardImage = '';
    if (type === 'MADA') cardImage = require('src/assets/images/mada.png');
    if (type === 'VISA') cardImage = require('src/assets/images/visa.png');
    if (type === 'MASTER')
      cardImage = require('src/assets/images/mastercard.png');
    if (type === 'MAESTRO')
      cardImage = require('src/assets/images/maestro.png');
    return cardImage;
  };

  return (
    <>
      <Header
        backButton
        title={i18n.t('profilePayment.payment')}
        notificationButton
        navigation={navigation}
      />
      <View style={{flex: 1}}>
        <Text style={styles.choosePaymentText}>
          {i18n.t('profilePayment.choosePaymentMethod')}
        </Text>
        <FlatList
          data={paymmentCards}
          renderItem={({item, index}) => (
            <View
              style={[
                styles.cardContainer,
                {
                  backgroundColor:
                    item?.payment_brand === 'MADA'
                      ? colors.defaultWhite
                      : colors.skyBlue,
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingTop: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.cardHolderName,
                    {
                      color:
                        item?.payment_brand === 'MADA'
                          ? colors.appBlack
                          : colors.defaultWhite,
                    },
                  ]}>
                  {item?.data?.card?.holder}
                </Text>
                <TouchableOpacity onPress={() => onDeleteCard(item.id, index)}>
                  {loading ? (
                    <ActivityIndicator size="small" color={colors.appGreen} />
                  ) : (
                    <Ionicons
                      name="trash-outline"
                      size={20}
                      style={{alignSelf: 'center'}}
                      color={
                        item?.payment_brand === 'MADA'
                          ? colors.appBlack
                          : colors.defaultWhite
                      }
                    />
                  )}
                </TouchableOpacity>
              </View>
              {item?.payment_brand === 'MADA' ? (
                <View style={[styles.cardCenter, {paddingVertical: 25}]}>
                  <FastImage
                    source={require('src/assets/images/mada.png')}
                    style={{height: 65, width: 195}}
                  />
                </View>
              ) : (
                <View style={styles.cardCenter}>
                  {/* <View style={{width: 130, height: 60, overflow: 'hidden'}}> */}
                  <FastImage
                    source={getCardImage(item?.payment_brand)}
                    style={{height: 65, width: 195}}
                    resizeMode="contain"
                  />
                  {/* </View> */}
                  {/* <View style={{width: 125, height: 75, overflow: 'hidden'}}>
                    <FastImage
                      source={require('src/assets/images/mastercard.png')}
                      style={styles.cardImage}
                    />
                  </View> */}
                  {/* <Text style={styles.cardName}>{item?.data?.type}</Text> */}
                </View>
              )}
              {/* <Text style={styles.paymentBrand}>{item?.payment_brand}</Text> */}
              <Text
                style={[
                  styles.cardNo,
                  {
                    color:
                      item?.payment_brand === 'MADA'
                        ? colors.appBlack
                        : colors.defaultWhite,
                  },
                ]}>
                ****{item.data?.card?.last4Digits}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => item?.id + index.toString()}
        />

        {!paymmentCards.length && (
          <View style={styles.noCard}>
            <Text>{i18n.t('profilePayment.noSavedCard')}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.4}
          onPress={addPaymentCard}>
          <Ionicons name="add-outline" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}
