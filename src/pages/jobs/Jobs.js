import moment from 'moment';
import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import FastImage from 'react-native-fast-image';
import SegmentTab from 'react-native-segmented-control-tab';
import Snackbar from 'react-native-snackbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {
  FETCH_MORE_PROJECTS,
  FETCH_PROJECTS,
  MODAL_VISIBLE,
  UPDATE_PROJECTS,
} from 'src/actions/action.js';
import Header from 'src/components/header/Header';
import ShimmerCard from 'src/components/shimmer/ShimmerCard';
import JobCard from 'src/pages/jobs/job-card/JobCard';
import {deleteProject} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './Jobs.styles';

class Jobs extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedTabIndex: 0,
      jobsType: 'progress',
      jobsData: [],
      jobCardIndex: null,
      isLoading: false,
      page: 1,
      onEndReachedCalledDuringMomentum: true,
      jobCardData: null,
      wipSegmentMargin: 0,
      isRefreshing: false,
      deleteDraftLoading: false,
      searchText : ''
    };
  }

  onRefresh = async () => {
    this.setState({isRefreshing: true});
    await this.onLoadData(
      this.state.selectedTabIndex === 0
        ? 'progress'
        : this.state.selectedTabIndex === 1
        ? 'past'
        : 'draft',
    );
    this.setState({isRefreshing: false});
  };

  componentDidMount() {
    this.onLoadData('progress');
  }
  // inital project loading
  onLoadData = (type) => {
    this.setState({page: 1});
    this.props.dispatch(FETCH_PROJECTS({type: type, page: 1}));
  };
  LoadMoreProjects = (Page1) => {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true});
      if (this.props.hasMorePage === true) {
        this.props.dispatch(
          FETCH_MORE_PROJECTS({
            type:
              this.state.selectedTabIndex === 0
                ? 'progress'
                : this.state.selectedTabIndex === 1
                ? 'past'
                : 'draft',
            page: Page1 + 1,
          }),
        );
        this.setState({page: Page1 + 1});
      }
    }
  };
  showActionSheet = (jobCardIndex, item) => {
    this.setState({jobCardIndex: jobCardIndex, jobCardData: item});
    this.ActionSheet.show(item);
  };

  onActionSheetItemPress = (index, item) => {
    if (index === 0) {
      this.props.navigation.navigate('Proposals', {
        projectId: this.state.jobCardData.id,
        projectDetails: this.state.jobCardData,
        type: 'all',
      });
    } else if (index === 5) {
      this.DeleteActionSheet.show();
    } else if (index === 3) {
      this.props.navigation.navigate('ProjectEdit', {
        data: this.state.jobCardData,
      });
    } else if (index === 2) {
      this.props.navigation.navigate('ProjectDetails', {
        projectId: this.state.jobCardData.id,
        showModal: false,
      });
    } else if (index === 1) {
      this.props.navigation.navigate('Proposals', {
        projectId: this.state.jobCardData.id,
        projectDetails: this.state.jobCardData,
        type: 'shortlisted',
      });
    } else if (index === 4) {
      this.props.navigation.navigate('Freelancer', {
        project: this.state.jobCardData,
      });
    }
  };

  onDeleteActionSheetItemPress = (index, type, draftId) => {
    let projectData = [...this.props.projects];
    let postIndex;
    if (type !== 'draft') {
      if (index === 0) {
        postIndex = projectData.findIndex(
          (i) => i.id === this.state.jobCardData.id,
        );
      }
    } else {
      this.setState({deleteDraftLoading: true});
    }
    if (index === 0 || type === 'draft') {
      deleteProject(
        type === 'draft' ? draftId : this.state.jobCardData.id,
        this.props.token,
      )
        .then((response) => {
          if (type !== 'draft') {
            projectData.splice(postIndex, 1);
            this.props.dispatch(UPDATE_PROJECTS([...projectData]));
            this.props.dispatch(
              MODAL_VISIBLE({
                visible: true,
                type: 1,
                message: response.data.message,
              }),
            );
          } else {
            this.setState({deleteDraftLoading: false});

            this.props.dispatch(FETCH_PROJECTS({type: 'draft', page: 1}));
          }
        })
        .catch((err) => {
          if (type !== 'draft') {
            console.error('delete project err', err);
            Snackbar.show({
              text: err?.response?.data?.message,
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: colors.appRed,
            });
          } else {
            this.setState({deleteDraftLoading: false});
          }
        });
    }
  };


  searchJobs = (searchText) => {
    const {selectedTabIndex} = this.state
    this.setState({searchText: searchText})
if(selectedTabIndex===0) {
  this.props.dispatch(FETCH_PROJECTS({type: 'progress', page: 1, search: searchText}));
}
else if(selectedTabIndex===1) {
  this.props.dispatch(FETCH_PROJECTS({type: 'past', page: 1, search: searchText}));
} else {
  this.props.dispatch(FETCH_PROJECTS({type: 'draft', page: 1, search: searchText}));
}
  }

  render() {
    const {t} = this.props;
    // console.log('draft', JSON.stringify(this.props?.draftProjects[0], null, 2));
    return (
      <>
        <View style={[styles.container]}>
          <Header
            title={t('jobs.projects')}
            logo={true}
            searchButton={true}
            notificationButton={true}
            navigation={this.props.navigation}
            onSearch={this.searchJobs}
          />

          <SegmentTab
            values={[t('jobs.workInProgress'), t('jobs.past'), t('jobs.draft')]}
            selectedIndex={this.state.selectedTabIndex}
            onTabPress={(index) => {
              this.setState({selectedTabIndex: index});
              this.onLoadData(
                index === 0 ? 'progress' : index === 1 ? 'past' : 'draft',
              );
            }}
            tabsContainerStyle={styles.tabsContainerStyle}
            tabStyle={styles.tabStyle}
            tabTextStyle={styles.tabTextStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTabTextStyle={styles.activeTabTextStyle}
            firstTabStyle={{
              flex: 1,
              borderTopStartRadius: 10,
              borderBottomStartRadius: 10,
            }}
          />

          {this.props.job_initial_loading ? (
            <ScrollView>
              {Array(3)
                .fill('')
                .map((item, i) => (
                  <ShimmerCard key={i} />
                ))}
            </ScrollView>
          
          ) : this.state.selectedTabIndex === 0 ? (
            <View style={styles.jobCards}>
              <FlatList

              ListEmptyComponent = {
                <View>
                <FastImage
                  style={styles.noJobsImage}
                  source={require('./images/no-jobs.png')}
                  resizeMode="contain"
                />
               {this.state.searchText?.length> 0 ? <Text style={styles.noJobsText}>{t('jobs.noMatchFound')}</Text> 
               :<>
               <Text style={styles.noJobsText}>{t('jobs.nojobs')}</Text>
  
                <TouchableOpacity
                  style={styles.postProjectButton}
                  onPress={() => this.props.navigation.navigate('ProjectAdd')}>
                  <Text style={styles.postProjectText}>
                    {t('jobs.postProjectNow')}
                  </Text>
                </TouchableOpacity>
                </>
                }
               
              </View>
              }
                data={this.props.projects}
                initialNumToRender={5}
                renderItem={({item, index}) => (
                  <View
                    style={
                      index === this.props.projects.length - 1 && {
                        marginBottom: 20,
                      }
                    }>
                    <JobCard
                      projectId={item.id}
                      navigation={this.props.navigation}
                      title={item.title}
                      budget={
                        // item.currency == 'sar'
                        //   ?
                        item.budget.sar.to === null
                          ? `>${item.budget.sar.from} SR`
                          : item.budget.sar.from === null
                          ? `<${item.budget.sar.to} SR`
                          : `${item.budget.sar.from}-${item.budget.sar.to} SR`
                        // : item.budget.usd.to === null
                        // ? `>${item.budget.usd.from} USD`
                        // : item.budget.usd.from === null
                        // ? `<${item.budget.usd.to} USD`
                        // : `${item.budget.usd.from}-${item.budget.usd.to} USD`
                      }
                      // item.currency === "sar"?`${item.budget.sar.from}-${item.budget.sar.to} SR`:`${item.budget.usd.from}-${item.budget.usd.to} USD`
                      time={moment.unix(item.published_at).fromNow()}
                      description={item.description}
                      noOfProposals={item.proposal_count}
                      noOfMessages={item.message_count}
                      noOfHired={item.hired_count}
                      projectDetails={item}
                      showActionSheet={() => this.showActionSheet(index, item)}
                      item={item}
                    />

                    {this.props.jobs_page_loading &&
                      index === this.props.projects.length - 1 && (
                        <ShimmerCard />
                      )}
                  </View>
                )}
                keyExtractor={(item, index) => item.id.toString()}
                onEndReachedThreshold={0.2}
                onEndReached={() => this.LoadMoreProjects(this.state.page)}
                onMomentumScrollBegin={() =>
                  this.setState({onEndReachedCalledDuringMomentum: false})
                }
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
          
          ) : this.state.selectedTabIndex === 1 ? (
            <View style={styles.jobCards}>
              <FlatList
                ListEmptyComponent = {
                  <View>
                  <FastImage
                    style={styles.noJobsImage}
                    source={require('./images/no-jobs.png')}
                    resizeMode="contain"
                  />
                 {this.state.searchText?.length> 0 ? <Text style={styles.noJobsText}>{t('jobs.noMatchFound')}</Text> 
                 :<>
                 <Text style={styles.noJobsText}>{t('jobs.nojobs')}</Text>
    
                  <TouchableOpacity
                    style={styles.postProjectButton}
                    onPress={() => this.props.navigation.navigate('ProjectAdd')}>
                    <Text style={styles.postProjectText}>
                      {t('jobs.postProjectNow')}
                    </Text>
                  </TouchableOpacity>
                  </>
                  }
                 
                </View>
                }
                data={this.props.pastProjects}
                initialNumToRender={5}
                renderItem={({item, index}) => (
                  <View
                    style={
                      index === this.props.pastProjects.length - 1 && {
                        marginBottom: 20,
                      }
                    }>
                    <JobCard
                      projectId={item.id}
                      navigation={this.props.navigation}
                      title={item.title}
                      budget={
                        // item.currency == 'sar'
                        //   ?
                        item.budget.sar.to === null
                          ? `>${item.budget.sar.from} SR`
                          : item.budget.sar.from === null
                          ? `<${item.budget.sar.to} SR`
                          : `${item.budget.sar.from}-${item.budget.sar.to} SR`
                        // : item.budget.usd.to === null
                        // ? `>${item.budget.usd.from} USD`
                        // : item.budget.usd.from === null
                        // ? `<${item.budget.usd.to} USD`
                        // : `${item.budget.usd.from}-${item.budget.usd.to} USD`
                      }
                      // item.currency === "sar"?`${item.budget.sar.from}-${item.budget.sar.to} SR`:`${item.budget.usd.from}-${item.budget.usd.to} USD`
                      time={moment.unix(item.published_at).fromNow()}
                      description={item.description}
                      noOfProposals={item.proposal_count}
                      noOfMessages={item.message_count}
                      noOfHired={item.hired_count}
                      projectDetails={item}
                      // showActionSheet={() => this.showActionSheet(index)}
                    />
                    {this.props.jobs_page_loading &&
                      index === this.props.pastProjects.length - 1 && (
                        <ShimmerCard />
                      )}
                  </View>
                )}
                keyExtractor={(item, index) => item.id.toString()}
                onEndReachedThreshold={0.2}
                onEndReached={() => this.LoadMoreProjects(this.state.page)}
                onMomentumScrollBegin={() =>
                  this.setState({onEndReachedCalledDuringMomentum: false})
                }
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
          ) : (
            this.state.selectedTabIndex === 2 && (
              <View style={styles.jobCards}>
                <FlatList
                  data={this.props?.draftProjects}
                  contentContainerStyle={{flexGrow: 1}}
                  ListEmptyComponent = {
                    <View>
                    <FastImage
                      style={styles.noJobsImage}
                      source={require('./images/no-jobs.png')}
                      resizeMode="contain"
                    />
                 
                   <Text style={styles.noJobsText}>{t('jobs.noDraftFound')}</Text>
      
                  
                    
                   
                   
                  </View>
                  }
                  initialNumToRender={5}
                  renderItem={({item, index}) => (
                    <View
                      style={
                        index === this.props.draftProjects.length - 1 && {
                          marginBottom: 20,
                        }
                      }>
                      <JobCard
                        projectId={item.id}
                        navigation={this.props.navigation}
                        title={item.title}
                        budget={
                          // item.currency == 'sar'
                          //   ?
                          item.budget.sar.to === null
                            ? `>${item.budget.sar.from} SR`
                            : item.budget.sar.from === null
                            ? `<${item.budget.sar.to} SR`
                            : `${item.budget.sar.from}-${item.budget.sar.to} SR`
                          // : item.budget.usd.to === null
                          // ? `>${item.budget.usd.from} USD`
                          // : item.budget.usd.from === null
                          // ? `<${item.budget.usd.to} USD`
                          // : `${item.budget.usd.from}-${item.budget.usd.to} USD`
                        }
                        // item.currency === "sar"?`${item.budget.sar.from}-${item.budget.sar.to} SR`:`${item.budget.usd.from}-${item.budget.usd.to} USD`
                        time={moment.unix(item.updated_at).fromNow()}
                        description={item.description}
                        noOfProposals={item.proposal_count}
                        noOfMessages={item.message_count}
                        noOfHired={item.hired_count}
                        projectDetails={item}
                        isDraft={true}
                        item={item}
                        deleteDraft={this.onDeleteActionSheetItemPress}
                        deleteDraftLoading={this.state.deleteDraftLoading}
                        // showActionSheet={() => this.showActionSheet(index)}
                      />
                      {this.props.jobs_page_loading &&
                        index === this.props.draftProjects.length - 1 && (
                          <ShimmerCard />
                        )}
                    </View>
                  )}
                  keyExtractor={(item, index) => item.id.toString()}
                  onEndReachedThreshold={0.2}
                  onEndReached={() => this.LoadMoreProjects(this.state.page)}
                  onMomentumScrollBegin={() =>
                    this.setState({onEndReachedCalledDuringMomentum: false})
                  }
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
            )
          )}
        </View>

        {this.props.projects?.length > 0 && (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ProjectAdd')}
            style={styles.addButton}
            activeOpacity={0.4}>
            <Ionicons
              name="add-outline"
              size={35}
              color="white"
              style={{marginStart: 2}}
            />
          </TouchableOpacity>
        )}

        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={t('jobs.options')}
          options={[
            t('jobs.viewProposals'),
            t('jobs.viewShortlistedProposals'),
            t('jobs.viewJobPosting'),
            t('jobs.editPosting'),
            t('jobs.inviteFreelancer'),
            t('jobs.removePosting'),
            t('jobs.cancel'),
          ]}
          cancelButtonIndex={6}
          onPress={(index) => {
            this.onActionSheetItemPress(index);
          }}
        />
        <ActionSheet
          ref={(o) => (this.DeleteActionSheet = o)}
          options={[t('jobs.delete'), t('jobs.cancel')]}
          destructiveButtonIndex={0}
          cancelButtonIndex={1}
          onPress={(index) => {
            this.onDeleteActionSheetItemPress(index);
          }}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  projects: state.myReducer.projects,
  // loading: state.myReducer.loading,
  pastProjects: state.myReducer.pastProjects,
  draftProjects: state.myReducer.draftProjects,

  hasMorePage: state.myReducer.has_more_jobs_page,
  jobs_page_loading: state.myReducer.jobs_page_loading,
  job_initial_loading: state.myReducer.jobInitialLoading,
  token: state.myReducer.user.token,
});
export default connect(mapStateToProps)(withTranslation()(Jobs));
