import {useFocusEffect} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {FETCH_FREELANCER_BY_PROJECT} from 'src/actions/action';
import {ADD_CONTACT, REMOVE_CONTACT} from 'src/actions/messages';
import Header from 'src/components/header/Header';
import FreelancerCard from 'src/pages/jobs/freelancer/freelancer-card/FreelancerCard';
import {browseFreelancerByProject} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const Freelancer = ({navigation, route: {params}}) => {
  const {t} = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [Freelancerpage, setFreelancerPage] = useState(1);
  const [freelancerPageLoading, setFreelancerPageLoading] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = React.useState(true);
  const token = useSelector((state) => state.myReducer?.user?.token);
  const freelancers = useSelector(
    (state) => state.myReducer?.freelancerByProject,
  );
  let has_more_freelancers_page = useSelector(
    (state) => state.myReducer.hasMoreFreelancerProjectPage,
  );
  let addContactLoading = useSelector(
    (state) => state.messagesReducer.addContactLoading,
  );
  let removeContactLoading = useSelector(
    (state) => state.messagesReducer.removeContactLoading,
  );
  let contactId = useSelector((state) => state.messagesReducer?.contactId);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      fetchFreelancer();
    }, []),
  );

  const fetchFreelancer = (nextPage) => {
    console.log('aaar');
    const projectId = params?.project?.id;

    browseFreelancerByProject(token, projectId, nextPage ?? 1)
      .then((freelancer) => {
        setIsLoading(false);
        setIsRefreshing(false);
        setFreelancerPageLoading(false);
        dispatch(
          FETCH_FREELANCER_BY_PROJECT({
            freelancer: freelancer?.data?.data?.freelancers?.data,
            hasMorePage:
              freelancer.data?.data?.freelancers?.meta?.has_more_pages,
            currentPage:
              freelancer.data?.data?.freelancers?.meta?.current_page_number,
          }),
        );
        console.log(
          'freelancers',
          JSON.stringify(freelancer.data.data.freelancers.data[0], null, 2),
        );
      })
      .catch((err) => {
        setIsLoading(false);
        setIsRefreshing(false);
        setFreelancerPageLoading(false);

        console.error('fetch freelancer by project err', err);
      });
  };
  const handleImagePress = (item) => {
    navigation.navigate('ViewProfile', {
      id: item.id,
      freelancerData: item,
      showHireButton: item?.is_invited || item?.is_proposed,
    });
  };
  const addContact = (id) => {
    dispatch(ADD_CONTACT(id));
  };
  const removeContact = (contactId, itemId) => {
    dispatch(REMOVE_CONTACT({contactId: contactId, freelancerId: itemId}));
  };
  const onRefresh = () => {
    setIsRefreshing(true);
    setFreelancerPage(1);
    fetchFreelancer();
  };

  const EmptyList = () =>
    isLoading ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.skyBlue} />
      </View>
    ) : (
      <View
        style={{
          flex: 0.8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastImage
          style={{height: '50%', width: '50%'}}
          source={require('src/assets/images/no-jobs.png')}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 16,
            color: colors.appBlack,
            fontFamily: fonts.primary,
          }}>
          {t('freelancer.noFreelancer')}
        </Text>
      </View>
    );

  const onMoreLoadFreelancerData = (nextPage) => {
    if (!onEndReachedCalledDuringMomentum) {
      setonEndReachedCalledDuringMomentum(true);
      if (has_more_freelancers_page === true) {
        console.log('nn', nextPage);
        setFreelancerPageLoading(true);
        setFreelancerPage((state) => state + 1);
        fetchFreelancer(nextPage);
      }
    }
  };

  return (
    <>
      <Header
        backButton
        notificationButton
        navigation={navigation}
        title={t('freelancer.freelancer')}
      />
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        ListEmptyComponent={<EmptyList />}
        data={freelancers}
        renderItem={({item, index}) => (
          <FreelancerCard
            key={item?.id}
            item={item}
            imagePress={handleImagePress}
            addContact={addContact}
            removeContact={removeContact}
            addContactLoading={addContactLoading}
            removeContactLoading={removeContactLoading}
            navigation={navigation}
            contactId={contactId}
            job={params?.project}
          />
        )}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item?.id?.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={() => onMoreLoadFreelancerData(Freelancerpage + 1)}
        onMomentumScrollBegin={() => setonEndReachedCalledDuringMomentum(false)}
        ListFooterComponent={
          freelancerPageLoading && (
            <ActivityIndicator
              color={colors.skyBlue}
              size="large"
              style={{flex: 1}}
            />
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => onRefresh()}
            tintColor={colors.skyBlue}
            colors={[colors.skyBlue, colors.appGreen]}
          />
        }
      />
    </>
  );
};

export default Freelancer;

const styles = StyleSheet.create({});
