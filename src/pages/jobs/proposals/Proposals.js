import moment from 'moment';
import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {FlatList, RefreshControl, ScrollView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import {FETCH_MORE_PROPOSALS, FETCH_PROPOSALS} from 'src/actions/proposal';
import Header from 'src/components/header/Header';
import ProposalsCard from 'src/components/proposal-card/ProposalCard';
import ShimmerCard from 'src/components/shimmer/ShimmerCard';
import colors from 'src/styles/texts/colors';
import styles from './Proposals.styles';

class Proposals extends Component {
  constructor(props) {
    super();
    this.state = {
      page: 1,
      onEndReachedCalledDuringMomentum: true,
      isRefreshing: false,
    };
  }
  onRefresh = () => {
    this.setState({isRefreshing: true});
    this.onLoadData();
    this.setState({isRefreshing: false});
  };

  componentDidMount() {
    this.onLoadData();
  }
  onLoadData() {
    this.props.dispatch(LOADER(true));
    this.props.dispatch(
      FETCH_PROPOSALS({
        id: this.props.route.params?.projectId,
        page: 1,
        type: this.props.route.params?.type,
      }),
    );
  }
  onMoreLoadData(type, page1) {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true});
      if (this.props.has_more_proposals_page === true) {
        this.props.dispatch(
          FETCH_MORE_PROPOSALS({
            id: this.props.route.params.projectId,
            page: page1 + 1,
            type: this.props.route.params?.type,
          }),
        );
        this.setState({page: page1 + 1});
      }
    }
  }
  viewProfile = (freelancerID) => {
    this.props.navigation.navigate('ViewProfile', {
      id: freelancerID,
      hideInviteButton: true,
    });
  };
  render() {
    const {
      t,
      proposals,
      shortlistedProposals,
      has_more_proposals_page,
      proposal_page_loading,
      shortlist_proposal_page_loading,
      loading,

      route: {
        params: {projectDetails, type},
      },
    } = this.props;

    return (
      <>
        <Header
          title={t('proposals.proposals')}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        <View style={styles.container}>
          <View style={styles.proposalDetailContainer}>
            <Text style={styles.title}>{projectDetails?.title}</Text>
            <Text style={styles.budget}>
              {
                // projectDetails?.currency == 'sar'
                //   ?
                projectDetails?.budget.sar.to === null
                  ? `>${projectDetails?.budget.sar.from} SR`
                  : projectDetails?.budget.sar.from === null
                  ? `<${projectDetails?.budget.sar.to} SR`
                  : `${projectDetails?.budget.sar.from}-${projectDetails?.budget.sar.to} SR`
                // : projectDetails?.budget.usd.to === null
                // ? `>${projectDetails?.budget.usd.from} USD`
                // : projectDetails?.budget.usd.from === null
                // ? `<${projectDetails?.budget.usd.to} USD`
                // : `${projectDetails?.budget.usd.from}-${projectDetails?.budget.usd.to} USD`
              }
            </Text>
            <Text style={styles.time}>
              {moment.unix(projectDetails?.published_at).fromNow()}
            </Text>
          </View>

          {loading ? (
            <ScrollView>
              {Array(
                projectDetails?.proposal_count
                  ? projectDetails?.proposal_count
                  : 1,
              )
                .fill('')
                .map((item, i) => (
                  <ShimmerCard key={i} />
                ))}
            </ScrollView>
          ) : (
            <FlatList
              data={type === 'all' ? proposals : shortlistedProposals}
              contentContainerStyle={{flexGrow: 1}}
              ListEmptyComponent={() => (
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
                  <Text style={styles.noJobsText}>
                    {t('proposals.noProposals')}
                  </Text>
                </View>
              )}
              renderItem={({item, index}) => {
                // console.log('dd', JSON.stringify(item, null, 2));
                return (
                  <View>
                    <ProposalsCard
                      image={item?.freelancer?.profile_image}
                      freelancerName={
                        item.freelancer.first_name +
                        ' ' +
                        item.freelancer.last_name
                      }
                      freelancerRate={item.freelancer.hourly_rate.amount}
                      freelancerInfo={item.freelancer.title}
                      locationName={item.freelancer?.country}
                      successRate={item.freelancer.success_rate}
                      rating={parseFloat(item.freelancer.rating)}
                      speciality={item.freelancer.title}
                      description={item.descripiton}
                      viewProfile={() => this.viewProfile(item.freelancer.id)}
                      navigation={this.props.navigation}
                      id={item.id}
                      projectId={this.props.route.params.projectId}
                      quickblox={item?.freelancer?.quickblox}
                      isShortlist={item?.is_shortlisted}
                      contractId={this.props?.route?.params?.contractId}
                      bidAmount={item?.price}
                      firebaseUserId = {item?.firebase_user_id}
                    />
                    {proposal_page_loading &&
                    index === proposals?.length - 1 ? (
                      <ShimmerCard />
                    ) : shortlist_proposal_page_loading &&
                      index === shortlistedProposals?.length - 1 ? (
                      <ShimmerCard />
                    ) : null}
                  </View>
                );
              }}
              keyExtractor={(item, index) => item.id.toString()}
              onEndReachedThreshold={0.2}
              onMomentumScrollBegin={() =>
                this.setState({onEndReachedCalledDuringMomentum: false})
              }
              onEndReached={() => {
                this.onMoreLoadData(this.state.page);
              }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={() => this.onRefresh()}
                  tintColor={colors.skyBlue}
                  colors={[colors.skyBlue, colors.appGreen]}
                />
              }
            />
          )}
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
  proposals: state.proposalReducer.proposals,
  shortlistedProposals: state.proposalReducer.shortlistedProposals,

  has_more_proposals_page: state.proposalReducer.has_more_proposals_page,
  proposal_page_loading: state.proposalReducer.proposal_page_loading,
  shortlist_proposal_page_loading:
    state.proposalReducer.shortlist_proposal_page_loading,
});
export default connect(mapStateToProps)(withTranslation()(Proposals));
