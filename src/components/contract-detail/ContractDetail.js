import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DynamicColorIOS,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {fetchContractDetails} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import Header from '../header/Header';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import Snackbar from 'react-native-snackbar';
import {useFocusEffect} from '@react-navigation/core';
import i18n from 'src/locale/i18n';

const ContractDetail = ({navigation, route: {params}}) => {
  const [contractDetails, setContractDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.myReducer?.user?.token);
  useFocusEffect(
    useCallback(() => {
      fetchContractDetails(token, params?.contractId)
        .then((res) => {
          console.log('Contract Details', JSON.stringify(res?.data, null, 2));
          setContractDetails(res?.data?.data?.contract);
        })
        .catch((err) => {
          console.error('Contract details error', err);
        })
        .finally(() => setLoading(false));
    }, []),
  );
  const milestoneStatus = (value) => {
    switch (value) {
      case 'pending':
        return i18n.t('contractDetails.pending');

      case 'in_payment_request':
        return i18n.t('contractDetails.paymentInRequest');

      case 'payment_completed':
        return i18n.t('contractDetails.paymentCompleted');

      case 'milestone_completed':
        return i18n.t('contractDetails.milestoneCompleted');

      default:
        return '';
    }
  };
  if (loading) {
    return (
      <>
        <Header
          backButton
          notificationButton
          navigation={navigation}
          title={i18n.t('contractDetails.contractDetails')}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.skyBlue} />
        </View>
      </>
    );
  }
  return (
    <>
      <Header
        backButton
        notificationButton
        navigation={navigation}
        title={i18n.t('contractDetails.contractDetails')}
      />

      <View style={{paddingHorizontal: 10}}>
        <View
          style={[
            {
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}>
          <View style={styles.imageContainer}>
            <FastImage
              source={{uri: contractDetails?.freelancer?.profile_image}}
              style={styles.image}
            />
            <Text
              style={
                styles.freelancerName
              }>{`${contractDetails?.freelancer?.first_name} ${contractDetails?.freelancer?.last_name}`}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation?.navigate('Ratings', {contractData: contractDetails})
            }
            style={{
              borderWidth: 1,
              borderColor: colors.appGreen,
              height: 35,
              padding: 5,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.appGreen}}>
              {i18n.t('contractDetails.rateFreelancer')}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.contractTitle}>{contractDetails?.title}</Text>
        <Text style={styles.createdAt}>{`${i18n.t(
          'contractDetails.activeSince',
        )} ${moment
          .unix(contractDetails?.freelancer?.created_at)
          .format('MMMM DD, YYYY')}`}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProposalDetails', {
              projectId: contractDetails?.project?.id,
              id: contractDetails?.proposal_id,
            })
          }>
          <Text style={{color: colors.appViolet}}>
            {i18n.t('contractDetails.viewProposal')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.milestoneEarningsText}>
          {i18n.t('contractDetails.milestoneEarnings')}
        </Text>
        <View style={{flexDirection: 'row', paddingTop: 5}}>
          <Text style={{flex: 1, fontSize: 16}}>
            {i18n.t('contractDetails.budget')}
          </Text>
          <Text
            style={{
              fontSize: 15,
            }}>{`${contractDetails?.currency?.toUpperCase()} ${
            contractDetails?.amount
          }`}</Text>
        </View>
        <View style={{flexDirection: 'row', paddingTop: 5}}>
          <Text style={{flex: 1, fontSize: 16}}>
            {i18n.t('contractDetails.inEscrow')}
          </Text>
          <Text
            style={{
              fontSize: 15,
            }}>{`${contractDetails?.currency?.toUpperCase()} ${
            contractDetails?.amount_in_escrow
          }`}</Text>
        </View>
        <View style={{flexDirection: 'row', paddingTop: 5}}>
          <Text style={{flex: 1, fontSize: 16}}>
            {i18n.t('contractDetails.milestonePaid')}
          </Text>
          <Text
            style={{
              fontSize: 15,
            }}>{`${contractDetails?.currency?.toUpperCase()} ${
            contractDetails?.total_milestones_paid
          }`}</Text>
        </View>
        <View style={{flexDirection: 'row', paddingTop: 5}}>
          <Text style={{flex: 1, fontSize: 16}}>
            {i18n.t('contractDetails.remaining')}
          </Text>
          <Text
            style={{
              fontSize: 15,
            }}>{`${contractDetails?.currency?.toUpperCase()} ${
            contractDetails?.remaining_amount_for_freelancer
          }`}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 5,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: colors.appGray1,
          }}>
          <Text style={{flex: 1, fontSize: 16}}>
            {i18n.t('contractDetails.amount')}
          </Text>
          <Text
            style={{
              fontSize: 15,
            }}>{`${contractDetails?.currency?.toUpperCase()} ${
            contractDetails?.total_amount_paid
          }`}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.appGray1,
            paddingBottom: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: colors.appGreen}}>
            {i18n.t('contractDetails.remainingMilestones')}
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PaymentWithSavedCards', {
                contractData: contractDetails,
              })
            }
            style={{
              borderWidth: 1,
              borderColor: colors.appGreen,
              height: 35,
              padding: 5,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.appGreen}}>
              {i18n.t('contractDetails.addAmountInEscrow')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={
            {
              // flexDirection: 'row',
              // alignItems: 'center',
            }
          }>
          {contractDetails?.milestones?.map((x, i) => (
            <View
              style={{borderBottomWidth: 1, borderBottomColor: colors.appGray1}}
              key={x?.id}>
              <View
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',
                }}>
                <Text>{i + 1}.</Text>
                <Text style={{paddingStart: 5, fontSize: 14}}>{x.title}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.appGray,
                    paddingStart: 5,
                    marginTop: 3,
                    flex: 1,
                  }}>
                  {milestoneStatus(x?.status)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    paddingStart: 20,
                    fontSize: 14,
                    paddingVertical: 10,
                  }}>
                  {`${contractDetails?.currency?.toUpperCase()} ${x?.amount}`}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Milestone', {
                      contractData: contractDetails,
                      milestoneDetail: x,
                    });
                  }}
                  disabled={x.status === 'pending'}
                  style={{
                    backgroundColor:
                      x.status === 'pending'
                        ? colors.appGray
                        : colors.appViolet,
                    padding: 10,
                    borderRadius: 10,
                    marginTop: -20,
                  }}>
                  <Text style={{color: colors.defaultWhite}}>
                    {x.status === 'pending' || x.status === 'in_payment_request'
                      ? i18n.t('contractDetails.payNow')
                      : i18n.t('contractDetails.viewDetails')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  freelancerName: {
    fontSize: 14,
    color: colors.appBlack,
    textAlignVertical: 'center',
    paddingStart: 5,
  },
  contractTitle: {
    fontSize: 16,
    color: colors.appBlack,
  },
  createdAt: {
    fontSize: 12,
    color: colors.appGray,
  },
  milestoneEarningsText: {
    fontSize: 18,
    color: colors.appGreen,
    paddingTop: 10,
    borderBottomColor: colors.appGray1,
    borderBottomWidth: 1,
  },
});

export default ContractDetail;
