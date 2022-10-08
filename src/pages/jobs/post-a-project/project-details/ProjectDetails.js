import moment from 'moment';
import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import Header from 'src/components/header/Header';
import ShimmerDetails from 'src/components/shimmer/ShimmerDetails';
import ShowFileType from 'src/components/show-file-type/ShowFileType';
import {downloadFile} from 'src/helpers/downloadFile';
import {projectDetails} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './ProjectDetails.styles';

class ProjectDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      PROJECT_DETAILS: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(LOADER(true));

    projectDetails(this.props.route.params?.projectId, this.props.token)
      .then((response) => {
        console.log('showProj', response.data.data.project);
        this.setState({PROJECT_DETAILS: response.data.data.project});
        setTimeout(() => {
          this.props.dispatch(LOADER(false));
        }, 500);
      })
      .catch((error) => {
        this.props.dispatch(LOADER(false));
        if (error.response) {
          console.log('\n\n\nrResponseerror>>', error.response);

          if (error.response.data.message) {
            console.log('\n\n\nrmessageerror>>', error.response.data.message);
          }
          if (error.response.data.errors) {
            console.log('\n\n\nrajjoerror>>', error.response.data.errors);
            this.setState({postError: error.response.data.errors});
          }
          setTimeout(() => {
            this.setState({isLoading: false});
          }, 500);
        } else {
          console.log(error);
        }
      });
  }

  render() {
    const {t} = this.props;
    return (
      <>
        <Header
          title={t('projectDetails.projectDetails')}
          cancelButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />

        {this.props.loading ? (
          <ShimmerDetails />
        ) : (
          <ScrollView style={styles.container}>
            <View style={styles.titleAndBudgetContainer}>
              <Text style={styles.titleText}>
                {this.state.PROJECT_DETAILS.title}
              </Text>
              <Text style={styles.budgetText}>
                {/* {this.state.PROJECT_DETAILS.currency === 'sar' ? ( */}
                <Text>
                  {this.state.PROJECT_DETAILS.budget?.sar?.from}-
                  {this.state.PROJECT_DETAILS.budget?.sar?.to}SR
                </Text>
                {/* ) : (
                  <Text>
                    {' '}
                    {this.state.PROJECT_DETAILS.budget?.usd?.from}-
                    {this.state.PROJECT_DETAILS.budget?.usd?.to}USD
                  </Text>
                )} */}
              </Text>
            </View>
            <View style={styles.experienceAndTimeContainer}>
              {/* <Text style={styles.experienceText}>
              {PROJECT_DETAILS_DUMMY.experienceLevel}
            </Text> */}
              <Text style={styles.timeText}>
                {moment.unix(this.state.PROJECT_DETAILS.published_at).fromNow()}
              </Text>
            </View>
            {/* <Text style={styles.postedBy}>
            {this.state.PROJECT_DETAILS.posted_by?.name}
          </Text> */}
            {/* <View style={styles.locationContainer}>
            <CustomIcon name="location" size={15} color={colors.appBlack} />
            <Text style={styles.locationText}>
              {PROJECT_DETAILS_DUMMY.location}
            </Text>
          </View> */}
            <Text style={styles.description}>
              {this.state.PROJECT_DETAILS.description}
            </Text>
            <Text style={styles.timelineText}>
              {t('projectDetails.category')}
            </Text>
            <Text style={styles.timelineInfo}>
              {this.state.PROJECT_DETAILS.category?.name}
            </Text>

            <Text style={styles.timelineText}>
              {t('projectDetails.subCategory')}
            </Text>
            <Text style={styles.timelineInfo}>
              {this.state.PROJECT_DETAILS.sub_category?.name}
            </Text>

            <Text style={styles.timelineText}>
              {t('projectDetails.timeline')}
            </Text>
            <Text style={styles.timelineInfo}>
              {this.state.PROJECT_DETAILS.timeline?.title}
            </Text>
            <Text style={styles.milestoneText}>
              {t('projectDetails.milestonePayments')}
            </Text>
            <Text style={styles.milestoneInfo}>
              {this.state.PROJECT_DETAILS.milestone?.title}
            </Text>

            {this.state.PROJECT_DETAILS?.skills?.length > 0 && (
              <>
                <Text style={styles.skillsText}>
                  {t('projectDetails.skillsRequired')}
                </Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {this.state.PROJECT_DETAILS?.skills?.map((skill, i) => (
                    <View
                      key={i}
                      style={{
                        backgroundColor: colors.appViolet,
                        padding: 10,
                        marginEnd: 5,
                        borderRadius: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{color: colors.defaultWhite}}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
            <Text style={styles.projectIdText}>
              {t('projectDetails.projectId')}
            </Text>
            <Text style={styles.projectIdInfo}>
              {this.state.PROJECT_DETAILS.project_serial}
            </Text>
            <Text style={styles.attachmentText}>
              {this.state.PROJECT_DETAILS.files?.length > 0
                ? t('projectDetails.attachment')
                : t('projectDetails.noAttachment')}
            </Text>
            <View style={styles.attachmentOuterContainer}>
              {this.state.PROJECT_DETAILS.files?.map((item, i) => {
                console.log('item', item);
                return (
                  <View style={styles.attachmentContainer} key={i}>
                    {item?.mime_type.includes('image') ? (
                      <TouchableOpacity
                        delayPressIn={0}
                        delayPressOut={0}
                        onPress={() =>
                          this.props.navigation.navigate('ImageViewer', {
                            uri: this.state.PROJECT_DETAILS.files,
                            id: item?.id,
                          })
                        }>
                        <FastImage
                          style={styles.attachmentImage}
                          source={{uri: item.path}}
                          fadeDuration={300}
                          defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          downloadFile({...item, type: item?.mime_type})
                        }
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',

                          flex: 0.2,
                        }}>
                        <ShowFileType file={{...item, type: item?.mime_type}} />
                      </TouchableOpacity>
                    )}
                    <Text style={styles.attachmentName}></Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  // data: state,
  token: state.myReducer.user.token,
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(withTranslation()(ProjectDetails));
