import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import Header from 'src/components/header/Header';
import i18n from 'src/locale/i18n';
import {
  createOrderToPayment,
  paymentWithSavedCard,
} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';

const Escrow = ({navigation, route}) => {
  const {contractData} = route?.params;

  let alreadyPaid = false;
  let notPaid = false;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedMileStones, setSelectedMilestones] = useState([]);
  let token = useSelector((state) => state.myReducer?.user?.token);

  contractData?.milestones.map((item) => {
    if (
      item.related_order !== null &&
      item?.related_order?.status === 'payment_completed'
    ) {
      alreadyPaid = true;
    } else {
      notPaid = true;
    }
  });

  console.log('Escrow contract detail', alreadyPaid);

  const onSelectMileStone = (id) => {
    let newArray = selectedMileStones;
    if (newArray.includes(id)) {
      newArray = newArray.filter((item) => item !== id);
      console.log('found');
    } else {
      newArray.push(id);
      console.log('not found');
    }
    setSelectedMilestones([...newArray]);
  };

  const addAmountInEscrow = () => {
    const {paymentCards, selectedCardIndex, contractData} = route?.params;
    console.log(' 💯 ', selectedMileStones);
    const ids = selectedMileStones;
    if (ids.length === 0) {
      return alert(i18n.t('escrow.pleaseSelectMilestone'));
    }
    // } else if (
    //   this.state.selectSaveCard === "" ||
    //   this.state.selectSaveCard === undefined
    // ) {
    //   return errorToast("You don't have any payment method for payment.");
    // }
    else {
      //   console.log('ids', ids, this.selectSaveCard);
      //   this.setState({apiLoading: true});
      setButtonLoading(true);
      createOrderToPayment({
        id: contractData?.id,
        token: token,

        data: {contract_detail_ids: selectedMileStones},
      })
        .then((data) => {
          console.log(data);
          paymentWithSavedCard({
            token: token,
            data: {
              registration_id: paymentCards[selectedCardIndex].registration_id,
              order_id: data.data.data.order.id,
            },
          })
            .then((res) => {
              const response = res.data.data.redirect;
              let tempUrl = `${response.url}`;
              response.parameters.map((item, index) => {
                index === 0 &&
                  (tempUrl = tempUrl.concat(`?${item.name}=${item.value}`));
                index > 0 &&
                  (tempUrl = tempUrl.concat(`&${item.name}=${item.value}`));
              });
              //   window.location.href = tempUrl;
              // this.paymentModalToggle();
              navigation.replace('PaymentWebView', {
                url: tempUrl,
              });
            })
            .catch((err) => {
              console.log('err on payment', err);
              navigation.replace('ContractDetails', {
                contractId: contractData?.id,
              });
            });
        })
        .catch((err) => {
          console.log(' 🥈 ', err?.response?.data);
          //   this.setState({apiLoading: false});
        })
        .finally(() => setButtonLoading(false));
    }
  };

  return (
    <>
      <Header
        backButton
        notificationButton
        navigation={navigation}
        title={i18n.t('escrow.escrow')}
      />
      <View
        style={{
          flex: 1,
        }}>
        {alreadyPaid && (
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              borderBottomColor: colors.appGray1,
              borderBottomWidth: 1,
            }}>
            {i18n.t('escrow.alreadyPaid')}
          </Text>
        )}
        {contractData?.milestones?.map(
          (item, index) =>
            item.related_order !== null &&
            item?.related_order?.status === 'payment_completed' && (
              <View
                key={item?.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor: colors.appGreen,
                  marginHorizontal: 10,
                  marginVertical: 5,
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 16, color: colors.defaultWhite}}>
                  {item?.title}
                </Text>
                <Text style={{fontSize: 16, color: colors.defaultWhite}}>
                  {item?.amount}
                </Text>
              </View>
            ),
        )}

        {notPaid && (
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              borderBottomColor: colors.appGray1,
              borderBottomWidth: 1,
            }}>
            {i18n.t('escrow.selectMilestone')}
          </Text>
        )}

        {contractData?.milestones?.map(
          (item, index) =>
            (item.related_order === null ||
              item?.related_order?.status !== 'payment_completed') && (
              <TouchableOpacity
                onPress={() => onSelectMileStone(item?.id)}
                activeOpacity={0.5}
                key={item?.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor: selectedMileStones?.includes(item?.id)
                    ? colors.appGreen
                    : colors.appGray,
                  marginHorizontal: 10,
                  marginVertical: 5,
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 16, color: colors.defaultWhite}}>
                  {item?.title}
                </Text>
                <Text style={{fontSize: 16, color: colors.defaultWhite}}>
                  {item?.amount}
                </Text>
              </TouchableOpacity>
            ),
        )}
      </View>
      {notPaid && (
        <TouchableOpacity
          onPress={addAmountInEscrow}
          style={{
            backgroundColor: colors.skyBlue,
            marginHorizontal: 10,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            borderRadius: 10,
          }}>
          {!buttonLoading ? (
            <Text style={{fontSize: 16, color: colors.defaultWhite}}>
              {i18n.t('escrow.proceedToPayment')}
            </Text>
          ) : (
            <ActivityIndicator size="large" color={colors.defaultWhite} />
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default Escrow;
