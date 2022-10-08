import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Header from 'src/components/header/Header';
import colors from 'src/styles/texts/colors';
import styles from './InviteToJob.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QB from 'quickblox-react-native-sdk';
import {createInvitation} from 'src/services/http.service';
import {useDispatch, useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import {SEND_INVITATION_MESSAGE} from 'src/actions/invitation';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';

const InviteToJob = ({navigation, route: {params}}) => {
  const {t} = useTranslation();

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [jobError, setJobError] = useState(false);
  const token = useSelector((state) => state.myReducer.user.token);
  const dispatch = useDispatch();

  const validate = () => {
    if (!message.length || !params?.job?.id) {
      if (!message.length) setMessageError(true);
      else setMessageError(false);
      if (!params?.job?.id) setJobError(true);
      else setJobError(false);

      return false;
    } else return true;
  };

  const handleInvite = () => {
    if (validate()) {
      setLoading(true);
      QB.chat
        .isConnected()
        .then((connected) => {
          createInvitation({
            data: {
              project_id: params?.job?.id,
              freelancer_id: params?.freelancerData?.id,
              message: message,
            },
            token: token,
          })
            .then((response) => {
              setLoading(false);
              // console.log(
              //   'Invitation sent successfully',
              //   JSON.stringify(response?.data, null, 2),
              // );
              let extraData = {
                sendType: 'Invitation',
                sendId: presponse.data.data?.invitation?.id,
                projectName: params?.job?.title,
              };
              sendExtraMessage(
                message,
                [],
                extraData,
                params?.freelancerData?.firebase_user_id,
              );

              // dispatch(
              //   SEND_INVITATION_MESSAGE({
              //     invitationId: response.data.data?.invitation?.id,
              //     message: message,
              //     freelancerQbId: params?.freelancerData?.quickblox?.qb_id,
              //     freelancerName: `${params?.freelancerData?.first_name} ${params?.freelancerData?.last_name}`,
              //   }),
              // );
              setMessageError(false);
              setJobError(false);
              navigation.goBack();
              Snackbar.show({
                text: response.data?.message,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: colors.appGreen,
              });
            })
            .catch((err) => {
              setLoading(false);
              console.error(
                'Couldnot send invitation ',
                JSON.stringify(err?.response, null, 2),
              );
            });
        })
        .catch((err) => {
          setLoading(false);

          console.error('Not connected to chat server', err);
          alert('Not connected to chat server', err);
        });
    }
  };
  // console.log('dd', JSON.stringify(params?.job?.id, null, 2));
  return (
    <>
      <Header
        title={t('inviteToJob.inviteToJob')}
        backButton
        navigation={navigation}
        notificationButton
      />
      <View style={{flex: 1, backgroundColor: colors.appBackground}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 20,
          }}>
          {params?.freelancerData?.profile_image ? (
            <FastImage
              source={{uri: params?.freelancerData?.profile_image}}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
          ) : params?.freelancerData?.gender === 'male' ||
            params?.freelancerData?.gender === null ? (
            <FastImage
              style={{height: 50, width: 50, borderRadius: 25}}
              source={require('src/assets/images/menAvatar.png')}
            />
          ) : (
            <FastImage
              style={{height: 50, width: 50, borderRadius: 25}}
              source={require('src/assets/images/femaleAvatar.png')}
            />
          )}
          <View style={{marginHorizontal: 10}}>
            <Text
              style={{
                color: colors.appGreen,
                fontWeight: '800',
                fontSize: 16,
              }}>{`${params?.freelancerData?.first_name} ${params?.freelancerData?.last_name}`}</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{flexDirection: 'row'}}>
              {params?.freelancerData?.skills?.map((skill, index) =>
                index === params?.freelancerData?.skills?.length - 1 ? (
                  <Text
                    key={index}
                    style={{fontSize: 14, color: colors.appViolet}}>
                    {skill}
                  </Text>
                ) : (
                  <Text
                    key={index}
                    style={{fontSize: 14, color: colors.appViolet}}>
                    {skill}/
                  </Text>
                ),
              )}
            </ScrollView>
          </View>
        </View>
        <Text
          style={{
            marginStart: 10,
            fontSize: 16,
            color: colors.appBlack,
            marginTop: 30,
          }}>
          {t('inviteToJob.message')}
        </Text>
        <TextInput
          onChangeText={(message) => setMessage(message)}
          multiline={true}
          style={{
            borderWidth: 1.5,
            borderColor: !messageError ? colors.appViolet : colors.appRed,
            marginHorizontal: 10,
            marginTop: 10,
            height: 150,
            borderRadius: 10,
            textAlignVertical: 'top',
            fontSize: 16,
            paddingStart: 10,
          }}
        />
        {messageError && (
          <Text style={{marginStart: 10, color: colors.appRed}}>
            {t('inviteToJob.required')}
          </Text>
        )}
        <Text
          style={{
            marginStart: 10,
            fontSize: 16,
            color: colors.appBlack,
            marginTop: 20,
          }}>
          {t('inviteToJob.chooseAJob')}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ShowJobs')}
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            backgroundColor: colors.defaultWhite,
            height: 40,
            justifyContent: 'space-between',
            paddingStart: 10,
            flexDirection: 'row',
            alignItems: 'center',
            elevation: 1,
            borderWidth: 1,
            borderColor: jobError ? colors.appRed : colors.defaultWhite,
          }}>
          <Text style={{fontSize: 16}}>
            {!params?.job ? t('inviteToJob.selectAJob') : params?.job?.title}
          </Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        {jobError && (
          <Text style={{marginStart: 10, color: colors.appRed}}>
            {t('inviteToJob.required')}
          </Text>
        )}
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={handleInvite}
        style={{
          backgroundColor: colors.appGreen,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}>
        {!loading ? (
          <Text style={{fontSize: 16, color: colors.defaultWhite}}>
            {t('inviteToJob.sendInvitation')}
          </Text>
        ) : (
          <ActivityIndicator size={25} color={colors.defaultWhite} />
        )}
      </TouchableOpacity>
    </>
  );
};

export default InviteToJob;
