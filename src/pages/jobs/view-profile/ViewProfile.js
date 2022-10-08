import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import styles from './ViewProfile.styles';
import Header from 'src/components/header/Header';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from 'src/icon-configs/config.json';
import colors from 'src/styles/texts/colors';
const CustomIcon = createIconSetFromFontello(fontelloConfig);
import {Rating} from 'react-native-ratings';
import SegmentTab from 'react-native-segmented-control-tab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getFreelancerReviews,
  viewFreelancerProfile,
} from 'src/services/http.service';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import StarRating from 'react-native-star-rating';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

const ReviewsCard = ({item}) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewContainer_Top}>
        <Text style={styles.reviewerName}>{item?.reviewed_by?.name}</Text>
        <Text style={styles.reviewTime}>
          {moment.unix(item?.created_at).fromNow()}
        </Text>
      </View>
      <View style={styles.reviewRatingContainer}>
        <Rating
          ratingCount={5}
          imageSize={12}
          startingValue={parseFloat(item?.overall_rating)}
          readonly
        />
        <Text style={styles.ratingText}>{item?.overall_rating}</Text>
      </View>
      <Text style={styles.reviewDescription}>{item?.review}</Text>
    </View>
  );
};

const RANDOM_COLORS = [
  colors.appRed,
  colors.appViolet,
  colors.appBlue,
  colors.appGreen,
  colors.appYellow,
];

let skillColor = 0;

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
      headerTransulate: true,
      loading: false,
      profile: {
        profile_image: null,
        portfolio: [],
        skills: [],
        exams: [],
      },
      readMore: false,
      reviews: [],
    };
  }
  componentDidMount() {
    // this.props.dispatch(LOADER(true));
    this.setState({loading: true});

    viewFreelancerProfile({
      token: this.props.token,
      id: this.props.route.params.id,
    })
      .then((res) => {
        console.log('hiiii', JSON.stringify(res.data.data.profile, null, 2));
        this.setState({loading: false});
        this.setState({profile: res.data.data.profile});
        // this.props.dispatch(LOADER(false));
      })
      .catch((err) => {
        // this.props.dispatch(LOADER(false));
        this.setState({loading: false});

        console.log('hello', err);
      });
    this.fetchReviews();
  }

  fetchReviews = () => {
    this.setState({loading: true});
    getFreelancerReviews({
      token: this.props.token,
      id: this.props.route.params.id,
    })
      .then((res) => {
        // console.log('hiiii', res.data.data?.reviews?.data);
        this.setState({loading: false});
        this.setState({reviews: res.data.data?.reviews?.data});
        // this.props.dispatch(LOADER(false));
      })
      .catch((err) => {
        // this.props.dispatch(LOADER(false));
        this.setState({loading: false});

        console.log('hello', err);
      });
  };
  componentWillUnmount() {
    this.setState({headerTransulate: false});
  }

  render() {
    const {t} = this.props;
    const {hideInviteButton} = this.props?.route?.params;
    if (this.state.loading)
      return (
        <ActivityIndicator
          color={colors.skyBlue}
          size="large"
          style={{flex: 1}}
        />
      );
    else
      return (
        <View style={styles.container}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={colors.defaultWhite}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header
              backButton={true}
              title={t('viewProfile.viewProfile')}
              transparent={this.state.headerTransulate}
              navigation={this.props.navigation}
              notificationButton={true}
            />
            <ImageBackground
              style={styles.profileBackground}
              // source={{ uri: this.state.profile.cover_image }}
              source={require('./images/view-profile-background.png')}>
              <View style={styles.profileContainer}>
                {this.state.profile.profile_image ? (
                  <FastImage
                    source={{
                      uri: this.state.profile.profile_image,
                    }}
                    defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                    style={styles.profileImage}
                  />
                ) : this.state.profile?.gender === 'male' ||
                  this.state.profile?.gender === null ? (
                  <FastImage
                    style={styles.profileImage}
                    source={require('src/assets/images/menAvatar.png')}
                  />
                ) : (
                  <FastImage
                    style={styles.profileImage}
                    source={require('src/assets/images/femaleAvatar.png')}
                  />
                )}
                <Text style={styles.freelancerName}>
                  {this.state.profile?.first_name}{' '}
                  {this.state.profile?.last_name}
                </Text>
                <Text style={styles.freelancerInfo}>
                  {this.state.profile?.title}
                </Text>
                {this.state.profile?.country ? (
                  <View style={styles.locationContainer}>
                    <CustomIcon
                      name="location"
                      color={colors.defaultWhite}
                      size={15}
                      style={{textShadowRadius: 2}}
                    />
                    <Text style={styles.locationName}>
                      {this.state.profile?.country}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
                <View style={styles.ratingContainer}>
                  <StarRating
                    rating={parseFloat(this.state.profile?.rating)}
                    selectedStar={(rating) => {}}
                    starSize={20}
                    fullStarColor={colors.appYellow}
                    emptyStarColor={colors.appYellow}
                    disabled={true}
                  />
                  <Text style={styles.profileRatingText}>
                    {this.state.profile?.rating}
                  </Text>
                </View>
              </View>
            </ImageBackground>
            <SegmentTab
              values={[t('viewProfile.about'), t('viewProfile.reviews')]}
              selectedIndex={this.state.selectedTabIndex}
              onTabPress={(index) => {
                this.setState({selectedTabIndex: index});
              }}
              tabsContainerStyle={styles.tabsContainerStyle}
              tabStyle={styles.tabStyle}
              tabTextStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTabTextStyle={styles.activeTabTextStyle}
            />

            {this.state.selectedTabIndex === 0 ? (
              <>
                {this.state.profile?.about?.length > 0 && (
                  <View style={styles.aboutFreelancer}>
                    <Text style={styles.aboutFreelancer_Name}>
                      {this.state.profile?.first_name}{' '}
                      {this.state.profile?.last_name}
                    </Text>
                    <Text
                      style={styles.aboutFreelancer_Description}
                      numberOfLines={this.state.readMore ? null : 5}>
                      {this.state.profile?.about}
                    </Text>
                    {this.state.profile?.about?.length > 200 && (
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({readMore: !this.state.readMore})
                        }>
                        <Text style={styles.readMoreText}>
                          {this.state.readMore
                            ? t('viewProfile.readLess')
                            : t('viewProfile.readMore')}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                {this.state.profile.portfolio.length > 0 && (
                  <View style={styles.portfolioContainer}>
                    <View style={styles.portfolioHeader}>
                      <Text style={styles.portfolioText}>
                        {t('viewProfile.portfolio')}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Portfolio', {
                            id: this.state.profile.id,
                          })
                        }>
                        <Text style={styles.seeAllText}>
                          {t('viewProfile.seeAll')}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      // style={{
                      //   flexDirection: 'row',

                      //   justifyContent: 'space-between',
                      // }}
                    >
                      {this.state.profile.portfolio?.[0]?.images.map(
                        (item, i) => {
                          console.log('imdddddd', item);
                          return (
                            <TouchableOpacity
                              onPress={() =>
                                this.props.navigation.navigate('ImageViewer', {
                                  uri: this.state.profile.portfolio?.[0]
                                    ?.images,
                                  id: item?.id,
                                })
                              }
                              key={i}
                              style={styles.portfolioDetails}>
                              <FastImage
                                style={styles.portfolioImage}
                                source={{
                                  uri: item.path,
                                }}
                                defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                              />
                              <Text style={styles.portfolioTitle}>
                                {item.title}
                              </Text>
                            </TouchableOpacity>
                          );
                        },
                      )}
                    </ScrollView>
                  </View>
                )}

                {this.state.profile.skills.length > 0 && (
                  <View style={styles.skillsContainer}>
                    <Text style={styles.skillsText}>
                      {t('viewProfile.skills')}
                    </Text>
                    <View style={styles.skillsInfoContainer}>
                      {this.state.profile.skills.map((item, i) => {
                        return (
                          <View
                            key={i}
                            style={[
                              styles.skill,
                              {
                                backgroundColor:
                                  RANDOM_COLORS[
                                    skillColor === RANDOM_COLORS.length - 1
                                      ? (skillColor = 0)
                                      : ++skillColor
                                  ],
                              },
                            ]}>
                            <Text style={styles.skillName}>{item}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
                {this.state.profile?.educations?.length > 0 && (
                  <View style={styles.examContainer}>
                    <Text style={styles.examsText}>
                      {t('viewProfile.educations')}
                    </Text>
                    {this.state.profile?.educations.map((item, i) => {
                      return (
                        <View key={i} style={styles.examInfoContainer}>
                          <Text style={styles.examName}>
                            {item?.school_name}
                          </Text>
                          <Text style={styles.examPercentage}>
                            {moment(item?.date_from, 'YYYY-MM-DD').format(
                              'Do MMM Y',
                            )}{' '}
                            -{' '}
                            {item?.date_to
                              ? moment(item?.date_to, 'YYYY-MM-DD').format(
                                  'Do MMM Y',
                                )
                              : t('viewProfile.present')}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
                {this.state.profile?.employments?.length > 0 && (
                  <View style={styles.examContainer}>
                    <Text style={[styles.examsText, {color: colors.appGreen}]}>
                      {t('viewProfile.employments')}
                    </Text>
                    {this.state.profile?.employments.map((item, i) => {
                      return (
                        <View key={i} style={styles.examInfoContainer}>
                          <Text style={styles.examName}>
                            {item?.company_name}
                          </Text>
                          <Text style={styles.examPercentage}>
                            {moment(item?.from_month_year, 'YYYY-MM-DD').format(
                              'Do MMM Y',
                            )}{' '}
                            -{' '}
                            {item?.date_to
                              ? moment(
                                  item?.to_month_year,
                                  'YYYY-MM-DD',
                                ).format('Do MMM Y')
                              : t('viewProfile.present')}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
                {/* {this.state.profile.exams.length > 0 && (
                  <View style={styles.examContainer}>
                    <Text style={styles.examsText}>
                      {t('viewProfile.exams')}
                    </Text>
                    {this.state.profile.exams.map((item, i) => {
                      return (
                        <View key={i} style={styles.examInfoContainer}>
                          <Text style={styles.examName}>{item}</Text>
                          <Text style={styles.examPercentage}>
                      {item.percentage}
                    </Text>
                        </View>
                      );
                    })}
                  </View>
                )} */}

                {/* <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('InviteToJob', {
                      freelancerData: this.props.route?.params?.freelancerData,
                    })
                  }
                  style={styles.hireButton}>
                  <Text
                    style={styles.hireButtonText}
                    numberOfLines={1}
                    // onPress={() => { this.props.navigation.navigate("Contract") }}
                  >
                    {t('viewProfile.invite')} {this.state.profile?.first_name}{' '}
                    {this.state.profile?.last_name} {t('viewProfile.toJob')}
                  </Text>
                  <Ionicons
                    name="checkmark"
                    color={colors.defaultWhite}
                    size={25}
                    style={{marginStart: 10, marginBottom: 5}}
                  />
                </TouchableOpacity> */}
              </>
            ) : (
              <View>
                {this.state.reviews.map((item, i) => {
                  return <ReviewsCard key={i} item={item} />;
                })}

                {/* <TouchableOpacity
                  style={styles.hireButton}
                  // onPress={() => { this.props.navigation.navigate("Contract") }}
                  onPress={() =>
                    this.props.navigation.navigate('InviteToJob', {
                      freelancerData: this.props.route?.params?.freelancerData,
                    })
                  }>
                  <Text style={styles.hireButtonText} numberOfLines={1}>
                    {t('viewProfile.invite')} {this.state.profile?.first_name}{' '}
                    {this.state.profile?.last_name} {t('viewProfile.toJob')}
                  </Text>

                  <Ionicons
                    name="checkmark"
                    color={colors.defaultWhite}
                    size={25}
                    style={{marginBottom: 5}}
                  />
                </TouchableOpacity> */}
              </View>
            )}
            {hideInviteButton === undefined ? (
              <TouchableOpacity
                disabled={this.props?.route?.params?.showHireButton}
                style={[
                  styles.hireButton,
                  this.props?.route?.params?.showHireButton && {
                    backgroundColor: colors.appGray4,
                  },
                ]}
                // onPress={() => { this.props.navigation.navigate("Contract") }}
                onPress={() =>
                  this.props.navigation.navigate('InviteToJob', {
                    freelancerData: this.state.profile,
                  })
                }>
                <Text style={styles.hireButtonText} numberOfLines={1}>
                  {t('viewProfile.invite')} {this.state.profile?.first_name}{' '}
                  {this.state.profile?.last_name} {t('viewProfile.toJob')}
                </Text>

                <Ionicons
                  name="checkmark"
                  color={colors.defaultWhite}
                  size={25}
                  style={{marginBottom: 5}}
                />
              </TouchableOpacity>
            ) : null}
          </ScrollView>
        </View>
      );
  }
}
const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(withTranslation()(ViewProfile));
