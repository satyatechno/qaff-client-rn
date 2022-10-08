import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomButton from 'src/components/custom-button/CustomButton';
import Header from 'src/components/header/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import {approveMilestone} from 'src/services/http.service';
import {useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import {downloadFile} from 'src/helpers/downloadFile';
import ShowFileType from 'src/components/show-file-type/ShowFileType';
import i18n from 'src/locale/i18n';

const Milestone = ({navigation, route}) => {
  const {contractData, milestoneDetail} = route?.params;
  console.log(' 👍 ', JSON.stringify(milestoneDetail, null, 2));
  const [buttonLoading, setButtonLoading] = useState(false);

  const token = useSelector((state) => state.myReducer?.user?.token);

  const onPay = () => {
    setButtonLoading(true);
    approveMilestone({
      id: contractData?.id,
      data: {milestone_id: milestoneDetail?.id},
      token: token,
    })
      .then((res) => {
        console.log('milestone approve success');
        setButtonLoading(false);
        Snackbar.show({
          text: res.data.message,
          duration: 1200,
          backgroundColor: colors.appGreen,
          textColor: colors.defaultWhite,
        });
        navigation.goBack();
      })
      .catch((err) => {
        console.log('Error in milestone approve', err?.response?.data?.message);
        if (err?.response?.data?.message?.length) {
          Snackbar.show({
            text: err?.response?.data?.message,
            duration: 1000,
            backgroundColor: colors.appRed,
            textColor: colors.defaultWhite,
          });
        }
        setButtonLoading(false);
      });
  };
  return (
    <>
      <Header
        title={i18n.t('milestone.milestone')}
        backButton
        notificationButton
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {milestoneDetail?.description ? (
          <View style={styles.row}>
            <Text
              style={[
                styles.commonFontSize,
                {color: colors.appViolet, fontWeight: 'bold', paddingEnd: 5},
              ]}>
              {i18n.t('milestone.description')}:
            </Text>
            <Text style={styles.commonFontSize}>
              {milestoneDetail?.description}
            </Text>
          </View>
        ) : null}
        {milestoneDetail?.freelancer_message ? (
          <View style={styles.row}>
            <Text
              style={[
                styles.commonFontSize,
                {color: colors.appViolet, fontWeight: 'bold', paddingEnd: 5},
              ]}>
              {i18n.t('milestone.message')}
            </Text>
            <Text
              style={[
                styles.commonFontSize,
                {flex: 1, textAlign: 'right', flexWrap: 'wrap'},
              ]}>
              {milestoneDetail?.freelancer_message}
            </Text>
          </View>
        ) : null}
        {milestoneDetail?.freelancer_submitted_files?.length ? (
          <>
            <Text
              style={[
                styles.commonFontSize,
                {
                  color: colors.appViolet,
                  fontWeight: 'bold',
                  paddingEnd: 5,
                  paddingTop: 5,
                },
              ]}>
              {i18n.t('milestone.attachments')}
            </Text>
            {/* {milestoneDetail?.freelancer_submitted_files?.map((file) => (
              <View
                key={file?.id}
                style={[
                  styles.row,
                  {
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 5,
                  },
                ]}>
                <FastImage
                  source={{uri: file?.path}}
                  style={{height: 50, width: 50}}
                />
                <Text
                  style={{
                    color: colors.appGray,
                    fontSize: 16,
                    paddingStart: 10,
                  }}>
                  {file.name}
                </Text>
              </View>
            ))} */}
            <View style={styles.attachmentOuterContainer}>
              {milestoneDetail?.freelancer_submitted_files?.map((item, i) => {
                // console.log('item', item);
                return (
                  <View style={styles.attachmentContainer} key={i}>
                    {item?.mime_type.includes('image') ? (
                      <TouchableOpacity
                        delayPressIn={0}
                        delayPressOut={0}
                        onPress={() =>
                          navigation.navigate('ImageViewer', {
                            uri: milestoneDetail?.freelancer_submitted_files,
                            id: item?.id,
                          })
                        }>
                        <FastImage
                          style={styles.attachmentImage}
                          source={{uri: item.path}}
                          fadeDuration={300}
                          defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          downloadFile({...item, type: item?.mime_type})
                        }
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',

                          flex: 0.2,
                        }}>
                        <ShowFileType file={{...item, type: item?.mime_type}} />
                      </TouchableOpacity>
                    )}
                    <Text style={styles.attachmentName}></Text>
                  </View>
                );
              })}
            </View>
          </>
        ) : null}
        <Text
          style={[
            styles.commonFontSize,
            {
              color: colors.appViolet,
              fontWeight: 'bold',
              paddingEnd: 5,
              paddingTop: 5,
              textDecorationLine: 'underline',
            },
          ]}>
          {i18n.t('milestone.payment')}:
        </Text>
        {milestoneDetail?.status ? (
          <View style={styles.row}>
            <Text
              style={[
                styles.commonFontSize,
                {color: colors.appViolet, fontWeight: 'bold', paddingEnd: 5},
              ]}>
              {i18n.t('milestone.status')}:
            </Text>
            <Text
              style={[
                styles.commonFontSize,
                {flex: 1, textAlign: 'right', flexWrap: 'wrap'},
              ]}>
              {milestoneDetail?.status.replace('_', ' ')}
            </Text>
          </View>
        ) : null}

        <View style={styles.row}>
          <Text
            style={[
              styles.commonFontSize,
              {color: colors.appViolet, fontWeight: 'bold', paddingEnd: 5},
            ]}>
            {i18n.t('milestone.amountInEscrow')}:
          </Text>
          <Text
            style={[
              styles.commonFontSize,
              {flex: 1, textAlign: 'right', flexWrap: 'wrap'},
            ]}>
            SAR {contractData?.amount_in_escrow}
          </Text>
        </View>

        {milestoneDetail?.status === 'in_payment_request' && (
          <TouchableOpacity
            disabled={buttonLoading}
            onPress={() => {
              if (
                parseFloat(contractData?.amount_in_escrow) <
                parseFloat(milestoneDetail?.amount)
              ) {
                Snackbar.show({
                  text: 'Insufficient balance, Add amount in Escrow first!.',
                  duration: 1000,
                  backgroundColor: colors.appRed,
                  textColor: colors.defaultWhite,
                });
              } else {
                onPay();
              }
            }}
            style={[styles.button, {flex: 1}]}>
            {buttonLoading ? (
              <ActivityIndicator color={colors.defaultWhite} size={30} />
            ) : (
              <>
                <Text style={styles.buttonText}>{i18n.t('milestone.pay')}</Text>
                <Icon name="check" size={16} color={colors.defaultWhite} />
              </>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomColor: colors.appGray1,
    borderBottomWidth: 1,
  },
  commonFontSize: {
    fontSize: 18,
    color: colors.appBlack,
  },
  button: {
    backgroundColor: colors.appViolet,
    marginHorizontal: 15,
    // paddingVertical: 15,
    height: 45,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    flexDirection: 'row',
  },

  buttonText: {
    color: colors.defaultWhite,
    fontSize: 16,
    fontFamily: fonts.primarySB,
  },
  attachmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    // justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
  },
  attachmentImage: {
    width: 60,
    height: 60,
  },
  attachmentOuterContainer: {
    paddingBottom: 10,
  },
  attachmentName: {
    marginStart: 20,
    textAlign: 'left',
    flex: 1,
  },
});

export default Milestone;
