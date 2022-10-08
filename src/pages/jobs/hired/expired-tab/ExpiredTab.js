import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {GET_CONTRACTS} from 'src/actions/contracts';
import HireCard from 'src/components/hire-card/HireCard';
import i18n from 'src/locale/i18n';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const ExpiredTab = ({route: {params}, navigation}) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const expiredContracts = useSelector(
    (state) => state.contractsReducer?.expiredContracts,
  );
  const expiredRefreshing = useSelector(
    (state) => state.contractsReducer?.expiredRefreshing,
  );
  useEffect(() => {
    dispatch(
      GET_CONTRACTS({
        type: 'expired',
        projectId: params?.projectId,
        page: page,
        isExpiredRefreshing: false,
      }),
    );
  }, []);
  const onRefresh = async () => {
    dispatch(
      GET_CONTRACTS({
        type: 'expired',
        projectId: params?.projectId,
        page: page,
        isExpiredRefreshing: true,
      }),
    );
  };
  console.log('Expired Contracts', JSON.stringify(expiredContracts, null, 2));
  return (
    <FlatList
      data={expiredContracts?.data}
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
            {i18n.t('expiredTab.noData')}
          </Text>
        </View>
      }
      refreshControl={
        <RefreshControl
          refreshing={expiredRefreshing}
          onRefresh={onRefresh}
          tintColor={colors.skyBlue}
          colors={[colors.skyBlue, colors.appGreen]}
        />
      }
    />
  );
};

export default ExpiredTab;
