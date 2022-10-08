import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import styles from './Categories.styles';
import Header from 'src/components/header/Header';
import SegmentTab from 'react-native-segmented-control-tab';
import CategoriesCard from './categories-card/CategoriesCard';
import FreelancerCard from '../freelancer-card/FreelancerCard';
import {fetchPostByCategory, fetchFreelancer} from 'src/services/http.service';
import {useDispatch, useSelector} from 'react-redux';
import colors from 'src/styles/texts/colors';
import {
  LOADER,
  FETCH_FREELANCER,
  FETCH_MORE_FREELANCER,
} from 'src/actions/action';
import ShimmerNewsfeed from 'src/components/shimmer/ShimmerNewsfeed';
import ShimmerFreelancerCard from 'src/components/shimmer/ShimerFreelancerCard';
import {useTranslation} from 'react-i18next';
import {ADD_CONTACT, REMOVE_CONTACT} from 'src/actions/messages';
import FastImage from 'react-native-fast-image';
import fonts from 'src/styles/texts/fonts';

const Categories = (props) => {
  const {id, name} = props.route.params;
  const [selectedIndex, setselectedIndex] = React.useState(0);
  const [postData, setPostData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [moreCategorypage, setMoreCategoryPage] = React.useState(false);

  const [CategoryPageLoading, setCategoryPageLoading] = React.useState(false);
  const [Freelancerpage, setFreelancerPage] = React.useState(1);
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = React.useState(true);
  const [SearchTempData, setSearchTempData] = React.useState([]);

  const [search, setsearch] = React.useState('');
  const [initialCategoryLoading, setInitialCategoryLoading] = React.useState(
    false,
  );
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
  const dispatch = useDispatch();
  const {t} = useTranslation();
  useEffect(() => {
    onLoadCategoryData();
  }, []);
  const onLoadCategoryData = () => {
    setPage(1);
    // setCategoryLoading(true)
    setInitialCategoryLoading(true);
    // dispatch(LOADER(true));
    fetchPostByCategory({
      token: token,
      page: page,
      categoryId: id,
      search: search,
    })
      .then((res) => {
        // console.log('postCategory', res.data.data.posts.data);
        setPostData(res.data.data.posts.data);
        setInitialCategoryLoading(false);

        // setCategoryLoading(false)
        // dispatch(LOADER(false));
        if (res.data.data.posts.meta.has_more_pages) {
          setMoreCategoryPage(true);
          setPage(page + 1);
        }
      })
      .catch((error) => {
        // dispatch(LOADER(false));
        setInitialCategoryLoading(false);

        if (error.response) {
          console.log('errMessage', error.response.data.message);

          console.log('Errors=====', error.response.data.errors);
        } else {
          console.log('Error', error);
        }
      });
  };
  function onMoreLoadCategoryData(page1) {
    if (!onEndReachedCalledDuringMomentum) {
      setonEndReachedCalledDuringMomentum(true);
      if (moreCategorypage) {
        setCategoryPageLoading(true);
        fetchPostByCategory({
          token: token,
          page: page1,
          categoryId: id,
          search: search,
        })
          .then((res) => {
            // console.log('postCategory', res.data.data.posts.data);
            setPostData(postData.concat(res.data.data.posts.data));
            setCategoryPageLoading(false);
            setPage(page1);
          })
          .catch((error) => {
            if (error.response) {
              console.log('errMessage', error.response.data.message);

              console.log('Errors=====', error.response.data.errors);
            } else {
              console.log('Error', error);
            }
          });
      }
    }
  }
  const onLoadFreelancerData = () => {
    dispatch(LOADER(true));
    dispatch(
      FETCH_FREELANCER({
        page: 1,
        category_id: id,
        search: search,
      }),
    );
  };
  function onMoreLoadFreelancerData(nextPage) {
    if (!onEndReachedCalledDuringMomentum) {
      setonEndReachedCalledDuringMomentum(true);
      if (has_more_freelancers_page) {
        dispatch(
          FETCH_MORE_FREELANCER({
            page: nextPage,
            category_id: id,
            search: search,
          }),
        );
        setFreelancerPage(nextPage);
      }
    }
  }
  const SearchingCategoriesPost = async (text) => {
    setPage(1);
    await setsearch(text);
    onLoadCategoryData();
  };
  const SearchingFeelancer = async (text) => {
    setFreelancerPage(1);
    await setsearch(text);
    onLoadFreelancerData();
  };

  const addContact = (id) => {
    dispatch(ADD_CONTACT(id));
  };
  const removeContact = (contactId, itemId) => {
    dispatch(REMOVE_CONTACT({contactId: contactId, freelancerId: itemId}));
  };
  return (
    <>
      <Header
        title={t('categories.browse')}
        backButton={true}
        onSearch={
          selectedIndex === 0 ? SearchingCategoriesPost : SearchingFeelancer
        }
        navigation={props.navigation}
        searchButton={true}
        notificationButton={true}
      />
      <View style={styles.container}>
        <Text style={styles.titleText}>{name}</Text>
        <SegmentTab
          values={[t('categories.projects'), t('categories.freelancer')]}
          selectedIndex={selectedIndex}
          onTabPress={(index) => {
            setselectedIndex(index);
            index === 0 ? onLoadCategoryData() : onLoadFreelancerData();
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
        {selectedIndex === 0 ? (
          initialCategoryLoading === true ? (
            <ScrollView>
              {Array(postData.length || 3)
                .fill('')
                .map((item, i) => (
                  <ShimmerNewsfeed key={i} />
                ))}
            </ScrollView>
          ) : !postData.length && search ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{alignSelf: 'center'}}>
                {t('categories.noMatchFound')}{' '}
              </Text>
            </View>
          ) : initialCategoryLoading === false && postData.length == 0 ? (
            // <Text style={{alignSelf: 'center'}}>
            //   {t('categories.noProject')}{' '}
            // </Text>
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
                {t('categories.noProject')}
              </Text>
            </View>
          ) : (
            <>
              <FlatList
                data={SearchTempData.length === 0 ? postData : SearchTempData}
                renderItem={({item, index}) => (
                  <CategoriesCard
                    item={item}
                    index={index}
                    navigation={props.navigation}
                  />
                )}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item.id.toString()}
                style={{}}
                onEndReachedThreshold={0.2}
                onMomentumScrollBegin={() =>
                  setonEndReachedCalledDuringMomentum(false)
                }
                onEndReached={() => onMoreLoadCategoryData(page + 1)}
                ListFooterComponent={CategoryPageLoading && <ShimmerNewsfeed />}
              />
            </>
          )
        ) : loading === true ? (
          <ScrollView>
            {Array(3)
              .fill('')
              .map((item, i) => (
                <ShimmerFreelancerCard key={i} />
              ))}
          </ScrollView>
        ) : freelancers.length === 0 && search.length !== 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{alignSelf: 'center'}}>
              {t('categories.noMatchFound')}{' '}
            </Text>
          </View>
        ) : freelancers.length === 0 ? (
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
              {t('categories.noFreelancer')}
            </Text>
          </View>
        ) : (
          <View
            style={{
              paddingHorizontal: 9,
              height: Dimensions.get('screen').height * 0.65,
            }}>
            <FlatList
              data={freelancers}
              renderItem={({item, index}) => (
                <View
                  style={
                    freelancers.length - 1 === index && {marginBottom: 50}
                  }>
                  <FreelancerCard
                    key={index}
                    item={item}
                    index={index}
                    imagePress={() =>
                      props.navigation.navigate('ViewProfile', {id: item.id})
                    }
                    addContact={addContact}
                    removeContact={removeContact}
                    addContactLoading={addContactLoading}
                    removeContactLoading={removeContactLoading}
                    navigation={props.navigation}
                    contactId={contactId}
                  />
                </View>
              )}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.id.toString()}
              onEndReachedThreshold={0.2}
              onMomentumScrollBegin={() =>
                setonEndReachedCalledDuringMomentum(false)
              }
              onEndReached={() => onMoreLoadFreelancerData(Freelancerpage + 1)}
              ListFooterComponent={
                freelancers_page_loading && (
                  <ActivityIndicator
                    color={colors.skyBlue}
                    size="large"
                    style={{flex: 1}}
                  />
                )
              }
            />
          </View>
        )}
      </View>
    </>
  );
};
export default Categories;
