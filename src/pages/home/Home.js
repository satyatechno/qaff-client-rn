import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import styles from './Home.styles';

import Header from 'src/components/header/Header';

import InfoCards from 'src/pages/home/info-cards/InfoCards';
import Carousel from 'react-native-snap-carousel';
import Newsfeed from 'src/components/news-feed/Newsfeed';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {fetchCarouselData, fetchNewsFeedData} from 'src/services/http.service';
import moment from 'moment';
import colors from 'src/styles/texts/colors';
import {
  FETCH_NEWSFEED,
  FETCH_MORE_NEWSFEED,
  UPDATE_SAVE_STATUS,
  UPDATE_LIKE_STATUS,
  LOADER,
  HOME_INITIAL_LOADING,
} from 'src/actions/action';
import {saveUnsave, likeUnlike} from 'src/services/http.service';

import ShimmerBanner from 'src/components/shimmer/ShimmerBanner';
import ShimmerNewsfeed from 'src/components/shimmer/ShimmerNewsfeed';
import {withTranslation} from 'react-i18next';
import Snackbar from 'react-native-snackbar';
import FastImage from 'react-native-fast-image';
import fonts from 'src/styles/texts/fonts';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      activeIndex: 1,
      carouselItems: [],
      searchNewsFeed: [],
      searchError: false,
      isLoading: true,
      haveMorePages: false,
      page: 1,
      isRefreshing: false,
      onEndReachedCalledDuringMomentum: true,
      search: '',
      saveLoading: false,
      likeLoading: false,
      activeLikeId: '',
      activeSaveId: '',
    };
  }

  componentDidMount() {
    this.onLoadData();
    this.onLoadDataCarousel();
  }
  onLoadData = () => {
    this.props.dispatch(HOME_INITIAL_LOADING(true));
    this.props.dispatch(
      FETCH_NEWSFEED({page: this.state.page, search: this.state.search}),
    );
  };

  onLoadDataCarousel = () => {
    fetchCarouselData({token: this.props.token})
      .then((res) => {
        this.setState({isLoading: false});
        this.setState({carouselItems: res.data.data.banner_images});
      })
      .catch((error) => {
        this.setState({isLoading: false});

        console.log('error_Carousel', error);
      });
  };
  onLoadMoreNewsfeed = (page1) => {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true});
      if (this.props.has_more_newsfeed_page === true) {
        this.props.dispatch(
          FETCH_MORE_NEWSFEED({page: page1 + 1, search: this.state.search}),
        );

        this.setState({page: page1 + 1});
      }
    }
  };
  handleSaved = async (id, status) => {
    this.setState({saveLoading: true, activeSaveId: id});
    try {
      const res = await saveUnsave({
        id: id,
        status: status ? 'unsave' : 'save',
        token: this.props.token,
      });
      await this.props.dispatch(UPDATE_SAVE_STATUS({id: id, value: !status}));
      this.setState({saveLoading: false});

      Snackbar.show({
        text: res.data?.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appGreen,
      });
    } catch (error) {
      this.setState({saveLoading: false});

      if (error.response) {
        console.log('errorMessage', error.response.data.message);
        console.log("'ErrorResponseErrors", error.response.data.errors);
        console.log("'ErrorResponseData", error.response.data);
        console.log("'ErrorResponse", error.response);
      } else {
        console.log('erroe', error);
      }
    }
  };
  handleLike = async (id, status) => {
    this.setState({likeLoading: true, activeLikeId: id});
    try {
      const res = await likeUnlike({
        id: id,
        status: status ? 'unlike' : 'like',
        token: this.props.token,
      });
      console.log('respomse', res.data);
      await this.props.dispatch(UPDATE_LIKE_STATUS({id: id, value: !status}));
      this.setState({likeLoading: false});

      Snackbar.show({
        text: res.data?.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appGreen,
      });
    } catch (error) {
      this.setState({likeLoading: false});

      if (error.response) {
        console.log('errorMessage', error.response.data.message);
        // console.log("'ErrorResponseErrors", error.response.data.errors);
        // console.log("'ErrorResponse", error.response);
      } else {
        console.log('erroe', error);
      }
    }
  };
  _renderItem({item, index}) {
    return (
      <View>
        <InfoCards bgImage={item.image} username={item.title} />
      </View>
    );
  }

  HomeHeader = () => {
    return (
      <>
        <View>
          <Carousel
            layout={'default'}
            // ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={SLIDER_WIDTH}
            sliderHeight={ITEM_HEIGHT}
            itemWidth={ITEM_WIDTH}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({activeIndex: index + 1})}
          />
        </View>

        <Text style={styles.newsfeedText}>{this.props.t('home.newsfeed')}</Text>
      </>
    );
  };
  onRefresh = async () => {
    this.setState({isRefreshing: true});
    await this.onLoadDataCarousel();
    await this.onLoadData();
    this.setState({isRefreshing: false});
  };
  SearchingNewsfeed = async (text) => {
    await this.setState({search: text, page: 1});
    this.onLoadData();
  };

  render() {
    const {t} = this.props;
    // console.log("quickblox", this.props.quickbloxUser)
    return (
      <>
        <StatusBar backgroundColor="#00C7D4" />
        <Header
          title={t('home.home')}
          logo={true}
          searchButton
          notificationButton
          onSearch={this.SearchingNewsfeed}
          navigation={this.props.navigation}
        />

        {this.props.homeInitialLoading ? (
          <ScrollView>
            <ShimmerBanner />
            <Text style={styles.newsfeedText}>{t('home.newsfeed')}</Text>
            {Array(3)
              .fill('')
              .map((item, i) => (
                <ShimmerNewsfeed key={i} />
              ))}
          </ScrollView>
        ) : (
          <View style={styles.container}>
            <FlatList
              ListHeaderComponent={this.HomeHeader}
              data={this.props.newsfeed}
              ListEmptyComponent={() => (
                <View
                  style={{
                    height: Dimensions.get('screen').height * 0.3,
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
                      marginTop: 10
                    }}>
                    {t('home.noNewsfeed')}
                  </Text>
                </View>
              )}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={
                      index === this.props.newsfeed?.length - 1 && {
                        marginBottom: 30,
                      }
                    }>
                    <Newsfeed
                      navigation={this.props.navigation}
                      // avatar={'https://dummyimage.com/600x400/71c8f0/fff.png'}
                      title={item.title}
                      budget={
                        // item.currency == 'sar'
                        //   ?
                        item.budget?.sar.to === null
                          ? `>${item.budget?.sar.from} SR`
                          : item.budget?.sar.from === null
                          ? `<${item.budget?.sar.to} SR`
                          : `${item.budget?.sar.from}-${item.budget?.sar.to} SR`
                        // : item.budget?.usd?.to === null
                        // ? `>${item.budget?.usd?.from} USD`
                        // : item.budget?.usd?.from === null
                        // ? `<${item.budget?.usd?.to} USD`
                        // : `${item.budget?.usd?.from}-${item.budget?.usd?.to} USD`
                      }
                      time={moment.unix(item.published_at).fromNow()}
                      description={item.description}
                      user={item.posted_by}
                      isLike={item.is_liked}
                      isSave={item.is_saved}
                      id={item?.id}
                      handleSaved={this.handleSaved}
                      handleLike={this.handleLike}
                      saveLoading={this.state.saveLoading}
                      likeLoading={this.state.likeLoading}
                      activeLikeId={this.state.activeLikeId}
                      activeSaveId={this.state.activeSaveId}
                    />
                    {this.props.home_page_loading &&
                      index === this.props.newsfeed?.length - 1 && (
                        <ShimmerNewsfeed />
                      )}
                  </View>
                );
              }}
              initialNumToRender={5}
              keyExtractor={(item, index) => item?.id.toString()}
              onEndReachedThreshold={0.2}
              onMomentumScrollBegin={() =>
                this.setState({onEndReachedCalledDuringMomentum: false})
              }
              onEndReached={() => this.onLoadMoreNewsfeed(this.state.page)}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={() => this.onRefresh()}
                  tintColor={colors.skyBlue}
                  colors={[colors.skyBlue, colors.appGreen]}
                />
              }
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.4}
          onPress={() => {
            this.props.navigation.navigate('Jobs');
            setTimeout(() => {
              this.props.navigation.navigate('Jobs', {screen: 'ProjectAdd'});
            }, 1);
          }}>
          <Ionicons
            style={styles.addButtonText}
            name="add-outline"
            size={35}
            color="white"
          />
        </TouchableOpacity>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.myReducer.user?.token,
  newsfeed: state.myReducer.newsfeed,
  home_page_loading: state.myReducer.home_page_loading,
  homeInitialLoading: state.myReducer.homeInitialLoading,
  has_more_newsfeed_page: state.myReducer.has_more_newsfeed_page,
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(withTranslation()(Home));
