import React, {useEffect, useState, memo} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {GET_CONTRACTS} from 'src/actions/contracts';
import HireCard from 'src/components/hire-card/HireCard';
import i18n from 'src/locale/i18n';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const OffersTab = memo(({route: {params}, navigation}) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const pendingContracts = useSelector(
    (state) => state.contractsReducer?.pendingContracts,
  );
  const offerRefreshing = useSelector(
    (state) => state.contractsReducer?.offerRefreshing,
  );

  useEffect(() => {
    dispatch(
      GET_CONTRACTS({
        type: 'pending',
        projectId: params?.projectId,
        page: page,
        isOfferRefreshing: false,
      }),
    );
  }, []);
  const onRefresh = async () => {
    dispatch(
      GET_CONTRACTS({
        type: 'pending',
        projectId: params?.projectId,
        page: page,
        isOfferRefreshing: true,
      }),
    );
  };

  console.log('Pending Offers', JSON.stringify(pendingContracts, null, 2));
  // console.log('Pending Contracts', JSON.stringify(props, null, 2));
  return (
    <FlatList
      data={pendingContracts?.data}
      contentContainerStyle={{flexGrow: 1}}
      keyExtractor={(item) => item?.id?.toString()}
      renderItem={({item}) => {
        return <HireCard data={item} navigation={navigation} />;
      }}
      ListEmptyComponent={
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <FastImage
            style={{height: 200, width: 200}}
            source={require('src/assets/images/no-jobs.png')}
            resizeMode="contain"
          />
          <Text style={{fontFamily: fonts.primary, fontSize: 16}}>
            {i18n.t('offersTab.noData')}
          </Text>
        </View>
      }
      refreshControl={
        <RefreshControl
          refreshing={offerRefreshing}
          onRefresh={onRefresh}
          tintColor={colors.skyBlue}
          colors={[colors.skyBlue, colors.appGreen]}
        />
      }
    />
  );
});

export default OffersTab;
