import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {GET_CONTRACTS} from 'src/actions/contracts';
import HireCard from 'src/components/hire-card/HireCard';
import i18n from 'src/locale/i18n';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const RejectedTab = ({route: {params}, navigation}) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const rejectedContracts = useSelector(
    (state) => state.contractsReducer?.rejectedContracts,
  );
  const rejectedRefreshing = useSelector(
    (state) => state.contractsReducer?.rejectedRefreshing,
  );
  useEffect(() => {
    dispatch(
      GET_CONTRACTS({
        type: 'rejected',
        projectId: params?.projectId,
        page: page,
        isRejectedRefreshing: false,
      }),
    );
  }, []);
  const onRefresh = async () => {
    dispatch(
      GET_CONTRACTS({
        type: 'rejected',
        projectId: params?.projectId,
        page: page,
        isRejectedRefreshing: true,
      }),
    );
  };
  console.log('Rejected Contracts', JSON.stringify(rejectedContracts, null, 2));

  return (
    <FlatList
      data={rejectedContracts?.data}
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
            {i18n.t('rejectedTab.noData')}
          </Text>
        </View>
      }
      refreshControl={
        <RefreshControl
          refreshing={rejectedRefreshing}
          onRefresh={onRefresh}
          tintColor={colors.skyBlue}
          colors={[colors.skyBlue, colors.appGreen]}
        />
      }
    />
  );
};

export default RejectedTab;
