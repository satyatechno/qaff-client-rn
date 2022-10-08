import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import OneSignal from 'react-native-onesignal';
import SegmentTab from 'react-native-segmented-control-tab';
import {useDispatch, useSelector} from 'react-redux';
import {
  FETCH_FREELANCER,
  FETCH_MORE_FREELANCER,
  LOADER,
} from 'src/actions/action';
import {SETUP_FRESHCHAT_USER} from 'src/actions/freshchat';
import {ADD_CONTACT, REMOVE_CONTACT} from 'src/actions/messages';
import {SETUP_NOTIFICATION_EVENTS} from 'src/actions/notification';
import {SETUP_QUICKBLOX} from 'src/actions/quickblox';
import Header from 'src/components/header/Header';
import ShimmerFreelancerCard from 'src/components/shimmer/ShimerFreelancerCard';
import ShimmerCategoryCard from 'src/components/shimmer/ShimmerCategoryCard';
import {loginFirebase} from 'src/firebase';
import {
  jobCategory,
  oneSignalPlayerIdRegister,
} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import FreelancerCard from './freelancer-card/FreelancerCard';
import SearchCard from './search-card/SearchCard';
import styles from './Search.styles';

function Search(props) {
  let token = useSelector((state) => state.myReducer.user.token);
  let loading = useSelector((state) => state.myReducer.loading);
  let has_more_freelancers_page = useSelector(
    (state) => state.myReducer.has_more_freelancers_page,
  );
  let freelancers_page_loading = useSelector(
    (state) => state.myReducer.freelancers_page_loading,
  );
  let freelancers = useSelector((state) => state.myReducer.freelancers);
  let addContactLoading = useSelector(
    (state) => state.messagesReducer.addContactLoading,
  );
  let removeContactLoading = useSelector(
    (state) => state.messagesReducer.removeContactLoading,
  );
  let contactId = useSelector((state) => state.messagesReducer.contactId);

  const [selectedIndex, setselectedIndex] = React.useState(0);
  const [categoryLoading, setCategoryLoading] = React.useState(false);
  const [Error, setError] = React.useState(false);
  const [SearchData, setSearchData] = React.useState([]);
  const [FreelancerSearchData, setFreelancerSearchData] = React.useState([]);
  const [SearchTempData, setSearchTempData] = React.useState([]);
  const [Freelancerpage, setFreelancerPage] = React.useState(1);
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = React.useState(true);
  const [search, setsearch] = React.useState('');
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    OneSignal.setSubscription(true);
    OneSignal.addEventListener('ids', onIds);
    // dispatch(SETUP_QUICKBLOX());

    onLoadSearchData();
    loginFirebase();
    dispatch(SETUP_FRESHCHAT_USER());
    dispatch(SETUP_NOTIFICATION_EVENTS());
  }, []);

  const onIds = (device) => {
    console.log('Device info: ', device);

    OneSignal.getPermissionSubscriptionState((subs) => {
      if (subs.userSubscriptionEnabled) {
        console.log('one sub permission', subs.userSubscriptionEnabled);
        oneSignalPlayerIdRegister({
          data: {player_id: device.userId, device_type: Platform.OS},
          token: token,
        })
          .then((res) => {})
          .catch((err) => {
            console.error('omnesignalPlayerIdeerr', err.response);
          });
      }
    });
  };

  const onLoadSearchData = () => {
    setCategoryLoading(true);
    jobCategory()
      .then((response) => {
        // console.log('JOB_CATEGORY111', response.data.data.categories.data);
        setSearchData(response.data.data.categories.data);
        setCategoryLoading(false);
      })
      .catch((error) => {
        if (error.response.data) {
          console.log('errMessage', error.response.data.message);

          console.log('Errors=====', error.response.data.errors);
        } else {
          console.log('Error', error);
        }
        setCategoryLoading(false);
        // setSearchLoading(false)
        console.log(error);
      });
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    onLoadFreelancerData();
    setIsRefreshing(false);
  };

  const onLoadFreelancerData = () => {
    dispatch(LOADER(true));
    dispatch(
      FETCH_FREELANCER({
        page: Freelancerpage,
        search: search,
      }),
    );
  };
  function onMoreLoadFreelancerData(nextPage) {
    console.log('more search', search);
    if (!onEndReachedCalledDuringMomentum) {
      setonEndReachedCalledDuringMomentum(true);
      if (has_more_freelancers_page === true) {
        dispatch(
          FETCH_MORE_FREELANCER({
            page: nextPage,
            search: search,
          }),
        );
        setFreelancerPage(nextPage);
      }
    }
  }
  const SearchingCategories = (text) => {
    jobCategory({
      search: text,
    })
      .then((response) => {
        setSearchTempData(response.data.data.categories.data);
        if (text && response.data.data.categories.data.length === 0) {
          setError(true);
        } else {
          setError(false);
        }
      })
      .catch((error) => {
        if (error.response.data) {
          console.log('errMessage', error.response.data.message);

          console.log('Errors=====', error.response.data.errors);
        } else {
          console.log('Error', error);
        }

        console.log(error);
      });
  };
  const SearchingFeelancer = async (text) => {
    setFreelancerPage(1);

    onLoadFreelancerData(text);
  };
  const addContact = (id) => {
    dispatch(ADD_CONTACT(id));
  };
  const removeContact = (contactId, itemId) => {
    dispatch(REMOVE_CONTACT({contactId: contactId, freelancerId: itemId}));
  };

  const handleSearch = async (text) => {
    setsearch(text);
  };
  useEffect(() => {
    selectedIndex === 0 ? SearchingCategories() : SearchingFeelancer();
  }, [search]);

  const handleImagePress = (item) => {
    props.navigation.navigate('ViewProfile', {
      id: item.id,
      freelancerData: item,
    });
  };

  return (
    <>
      <Header
        title={t('search.browse')}
        logo={true}
        searchButton={true}
        notificationButton={true}
        onSearch={handleSearch}
        navigation={props.navigation}
      />
      <View style={styles.container}>
        <SegmentTab
          values={[t('search.categories'), t('search.freelancer')]}
          selectedIndex={selectedIndex}
          onTabPress={(index) => {
            setselectedIndex(index);
            index === 0 ? onLoadSearchData() : onLoadFreelancerData();
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />

        {selectedIndex === 0 ? (
          categoryLoading === true ? (
            <ScrollView>
              {Array(3)
                .fill('')
                .map((item, i) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}
                    key={i}>
                    <ShimmerCategoryCard />
                    <ShimmerCategoryCard />
                  </View>
                ))}
            </ScrollView>
          ) : SearchData.length === 0 && !categoryLoading ? (
            <Text style={{alignSelf: 'center'}}>
              {t('search.noCategories')}{' '}
            </Text>
          ) : Error ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{alignSelf: 'center'}}>
                {t('search.noMatchFound')}{' '}
              </Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.categoriesRow}>
                {SearchTempData.length === 0
                  ? SearchData.map((item, index) => (
                      <SearchCard
                        key={index}
                        item={item}
                        index={index}
                        navigation={props.navigation}
                      />
                    ))
                  : SearchTempData.map((item, index) => (
                      <SearchCard
                        key={index}
                        item={item}
                        index={index}
                        navigation={props.navigation}
                      />
                    ))}
              </View>
            </ScrollView>
          )
        ) : loading === true ? (
          <ScrollView>
            {Array(3)
              .fill('')
              .map((item, i) => (
                <ShimmerFreelancerCard key={i} />
              ))}
          </ScrollView>
        ) : !freelancers.length && search.length ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{alignSelf: 'center'}}>
              {t('search.noMatchFound')}{' '}
            </Text>
          </View>
        ) : (
          // : !freelancers.length ? (
          //   <Text style={{alignSelf: 'center'}}>{t('search.noFreelancer')} </Text>
          // )
          <View style={{marginBottom: 100}}>
            <FlatList
              ListEmptyComponent={() => (
                <View
                  style={{
                    height: Dimensions.get('screen').height * 0.5,
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
                    {t('search.noFreelancer')}
                  </Text>
                </View>
              )}
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
                  navigation={props.navigation}
                  contactId={contactId}
                />
              )}
              initialNumToRender={5}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item?.id?.toString()}
              onEndReachedThreshold={0.2}
              onEndReached={() => onMoreLoadFreelancerData(Freelancerpage + 1)}
              onMomentumScrollBegin={() =>
                setonEndReachedCalledDuringMomentum(false)
              }
              ListFooterComponent={
                freelancers_page_loading && (
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
          </View>
        )}
      </View>
    </>
  );
}
export default Search;
