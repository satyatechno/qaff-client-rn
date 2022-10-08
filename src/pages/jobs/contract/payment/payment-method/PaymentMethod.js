import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from 'src/components/header/Header';
import styles from './PaymentMethod.styles';
import LottieView from 'lottie-react-native';
import colors from 'src/styles/texts/colors';

export default function PaymentMethod({navigation, route}) {
  const {t} = useTranslation();
  const card = [
    {
      id: 1,
      name: 'MADA',
      payment_brand: 'MADA',
    },
    {
      id: 2,
      name: 'Credit/Debit Card',
      payment_brand: 'Credit/Debit Card',
    },
  ];

  const addPayment = (item) => {
    navigation.navigate('PaymentDetails', {
      id: item?.id,
      name: item?.name,
      myNavigation: route?.params?.myNavigation,
    });
  };
  return (
    <>
      <Header
        backButton
        title={t('paymentMethod.payment')}
        notificationButton
        navigation={navigation}
      />
      <View style={{flex: 1}}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={card}
          ListHeaderComponent={
            <View style={{alignItems: 'center', paddingTop: 10}}>
              <LottieView
                style={{height: 200, width: 200}}
                source={require('src/assets/lottie-animation/payment-method.json')}
                autoPlay
                loop
              />

              <Text style={styles.choosePaymentText}>
                {t('paymentMethod.choosePaymentMethod')}
              </Text>
            </View>
          }
          // renderItem={({item}) => (
          //   <TouchableOpacity
          //     onPress={() => addPayment(item)}
          //     style={styles.cardContainer}>
          //     <FastImage
          //       style={styles.image}
          //       source={require('src/assets/images/imagePlaceHolder.png')}
          //     />
          //     <Text style={styles.cardName}>{item.name}</Text>
          //     <Ionicons
          //       name="chevron-forward-outline"
          //       size={20}
          //       style={{alignSelf: 'center'}}
          //     />
          //   </TouchableOpacity>
          // )}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => addPayment(item)}
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
                }}></View>
              {item?.payment_brand === 'MADA' ? (
                <View style={[styles.cardCenter]}>
                  <FastImage
                    source={require('src/assets/images/mada.png')}
                    style={{height: 55, width: 195}}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <View style={styles.cardCenter}>
                  <FastImage
                    source={require('src/assets/images/visa.png')}
                    style={{
                      height: 45,
                      width: 100,
                    }}
                    resizeMode="contain"
                  />

                  <FastImage
                    source={require('src/assets/images/mastercard.png')}
                    style={{
                      height: 55,
                      width: 100,
                    }}
                    resizeMode="contain"
                  />
                  <FastImage
                    source={require('src/assets/images/maestro.png')}
                    style={{
                      height: 55,
                      width: 100,
                    }}
                    resizeMode="contain"
                  />
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}
