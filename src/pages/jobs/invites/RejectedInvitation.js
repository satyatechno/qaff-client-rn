import React, {memo, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import InvitationCard from 'src/components/invitation-card/InvitationCard';
import i18n from 'src/locale/i18n';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import {useInvitation} from './useInvitation';

const RejectedInvitation = ({route: {params}, navigation}) => {
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {loading, error, invitation, hasMorePage} = useInvitation(
    page,
    'rejected',
    params?.projectId,
    isRefreshing,
  );
  // console.log(' 🚑', JSON.stringify(invitation, null, 2));

  const listEmpty = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.skyBlue} />
        ) : error ? (
          <Text>{error?.response?.data?.message}</Text>
        ) : (
          <>
            <FastImage
              style={{height: 200, width: 200}}
              source={require('src/assets/images/no-jobs.png')}
              resizeMode="contain"
            />
            <Text style={{fontFamily: fonts.primary, fontSize: 16}}>
              {i18n.t('rejectedInvitation.noData')}
            </Text>
          </>
        )}
      </View>
    );
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
  };
  useEffect(() => {
    if (loading === false) setIsRefreshing(false);
  }, [loading]);
  console.log('ll', hasMorePage);

  return (
    <FlatList
      style={{flex: 1}}
      keyExtractor={(item) => item?.id?.toString()}
      ListEmptyComponent={listEmpty}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      data={invitation}
      renderItem={({item}) => {
        return <InvitationCard data={item} navigation={navigation} />;
      }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={colors.skyBlue}
          colors={[colors.skyBlue, colors.appGreen]}
        />
      }
    />
  );
};

export default memo(RejectedInvitation);
