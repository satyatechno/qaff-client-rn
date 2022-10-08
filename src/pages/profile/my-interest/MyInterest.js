import React, {Component} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './MyInterest.styles';

import Header from 'src/components/header/Header';
import Newsfeed from 'src/components/news-feed/Newsfeed';
import {connect} from 'react-redux';
import moment from 'moment';
import colors from 'src/styles/texts/colors';
import {saveUnsave, likeUnlike} from 'src/services/http.service';
import {
  LOADER,
  UPDATE_SAVE_STATUS,
  UPDATE_LIKE_STATUS,
  FETCH_LIKED_POST,
  FETCH_MORE_LIKED_POST,
} from 'src/actions/action';
import ShimmerNewsfeed from 'src/components/shimmer/ShimmerNewsfeed';
import {withTranslation} from 'react-i18next';
import Snackbar from 'react-native-snackbar';
import FastImage from 'react-native-fast-image';

class MyInterest extends Component {
  constructor(props) {
    super();
    this.state = {
      activeIndex: 1,

      LikedData: [],
      isLoading: true,
      haveMorePages: false,
      page: 1,
      onEndReachedCalledDuringMomentum: false,
    };
  }

  componentDidMount() {
    this.onLoadData();
  }
  onLoadData = () => {
    this.props.dispatch(LOADER(true));
    this.props.dispatch(FETCH_LIKED_POST({page: 1}));
  };

  onMoreLoadData = (page1) => {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true});
      if (this.props.has_more_liked_page === true) {
        this.props.dispatch(FETCH_MORE_LIKED_POST({page: page1 + 1}));

        this.setState({page: page1 + 1});
      }
    }
  };
  handleSaved = async (id, status) => {
    try {
      const res = await saveUnsave({
        id: id,
        status: status ? 'unsave' : 'save',
        token: this.props.token,
      });
      await this.props.dispatch(UPDATE_SAVE_STATUS({id: id, value: !status}));
      Snackbar.show({
        text: res.data?.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appGreen,
      });
    } catch (error) {
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
    // console.log("resss",this.props.token)
    try {
      const res = await likeUnlike({
        id: id,
        status: status ? 'unlike' : 'like',
        token: this.props.token,
      });
      await this.props.dispatch(UPDATE_LIKE_STATUS({id: id, value: !status}));
      Snackbar.show({
        text: res.data?.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appGreen,
      });
    } catch (error) {
      if (error.response) {
        console.log('errorMessage', error.response.data.message);
        // console.log("'ErrorResponseErrors", error.response.data.errors);
        // console.log("'ErrorResponse", error.response);
      } else {
        console.log('erroe', error);
      }
    }
  };
  render() {
    const {t} = this.props;
    return (
      <>
        <StatusBar backgroundColor="#00C7D4" />
        <Header
          title={t('myInterests.myInterests')}
          backButton={true}
          navigation={this.props.navigation}
          // searchButton={true}
          notificationButton={true}
        />
        {this.props.loading ? (
          <ScrollView>
            {Array(3)
              .fill('')
              .map((item, i) => (
                <ShimmerNewsfeed key={i} />
              ))}
          </ScrollView>
        ) : this.props.likedPosts?.length === 0 ? (
          <ScrollView>
            <FastImage
              style={styles.noJobsImage}
              source={require('./images/no-jobs.png')}
              resizeMode="contain"
            />
            <Text style={styles.noJobsText}>{t('myInterests.noData')}</Text>
          </ScrollView>
        ) : (
          <View style={styles.container}>
            <FlatList
              data={this.props.likedPosts}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={
                      index === this.props.likedPosts.length - 1 && {
                        marginBottom: 30,
                      }
                    }>
                    <Newsfeed
                      navigation={this.props.navigation}
                      // avatar={'https://dummyimage.com/600x400/71c8f0/fff.png'}
                      title={item?.title}
                      budget={
                        // item.currency == 'sar'
                        //   ?
                        item?.budget?.sar.to === null
                          ? `>${item?.budget?.sar.from} SR`
                          : item?.budget?.sar.from === null
                          ? `<${item?.budget?.sar.to} SR`
                          : `${item?.budget?.sar.from}-${item?.budget?.sar.to} SR`
                        // : item.budget?.usd?.to === null
                        //   ? `>${item.budget?.usd?.from} USD`
                        //   : item.budget?.usd?.from === null
                        //     ? `<${item.budget?.usd?.to} USD`
                        //     : `${item.budget?.usd?.from}-${item.budget?.usd?.to} USD`
                      }
                      time={moment.unix(item?.published_at).fromNow()}
                      description={item?.description}
                      user={item?.posted_by}
                      isLike={item?.is_liked}
                      isSave={item?.is_saved}
                      id={item?.id}
                      handleSaved={this.handleSaved}
                      handleLike={this.handleLike}
                    />
                    {this.props.liked_page_loading &&
                      index === this.props.likedPosts.length - 1 && (
                        <ShimmerNewsfeed />
                      )}
                  </View>
                );
              }}
              keyExtractor={(item, index) => item?.id.toString()}
              onEndReachedThreshold={0.2}
              onMomentumScrollBegin={() =>
                this.setState({onEndReachedCalledDuringMomentum: false})
              }
              onEndReached={() => this.onMoreLoadData(this.state.page)}
            />
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
  likedPosts: state.myReducer.likedPosts,
  loading: state.myReducer.loading,
  liked_page_loading: state.myReducer.liked_page_loading,
  has_more_liked_page: state.myReducer.has_more_liked_page,
});

export default connect(mapStateToProps)(withTranslation()(MyInterest));
