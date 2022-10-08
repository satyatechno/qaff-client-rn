import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import styles from './ProposalDetails.styles';
import Header from 'src/components/header/Header';
import {createIconSetFromFontello} from 'react-native-vector-icons';

import fontelloConfig from 'src/icon-configs/config.json';
import colors from 'src/styles/texts/colors';
const CustomIcon = createIconSetFromFontello(fontelloConfig);
import {connect} from 'react-redux';
import moment from 'moment';
import {getProposalDetails} from 'src/services/http.service';
import {LOADER} from 'src/actions/action';
import ShimmerDetails from 'src/components/shimmer/ShimmerDetails';
import {withTranslation} from 'react-i18next';
import fonts from 'src/styles/texts/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import ShowFileType from 'src/components/show-file-type/ShowFileType';
import {downloadFile} from 'src/helpers/downloadFile';
import {numberWithCommas} from 'src/helpers/numberWithComma';

class ProposalDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      modalVisible: true,
      PROPOSAL_DETAILS: undefined,
    };
  }

  componentDidMount() {
    this.props.dispatch(LOADER(true));
    getProposalDetails({
      projectId: this.props.route.params.projectId,
      id: this.props.route.params.id,
      token: this.props.token,
    })
      .then((response) => {
        this.setState({PROPOSAL_DETAILS: response.data.data.proposal});

        this.props.dispatch(LOADER(false));
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
        } else {
          console.log(error);
        }
      });
  }

  render() {
    const {t} = this.props;
    console.log('pp', JSON.stringify(this.state?.PROPOSAL_DETAILS, null, 3));
    return (
      <>
        <Header
          title={t('proposalDetails.proposalDetails')}
          cancelButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />

        {this.props.loading ? (
          <View style={{marginHorizontal: 10}}>
            <ShimmerDetails />
          </View>
        ) : !this.state.PROPOSAL_DETAILS ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text>{t('proposalDetails.noData')}</Text>
          </View>
        ) : (
          <ScrollView style={styles.container}>
            <View style={styles.titleAndBudgetContainer}>
              <Text style={styles.titleText}>
                {this.state.PROPOSAL_DETAILS?.project?.title}
              </Text>
              <Text style={styles.budgetText}>
                {/* {this.state.PROPOSAL_DETAILS?.project?.currency === 'sar' ? ( */}
                <Text>
                  {this.state.PROPOSAL_DETAILS?.project?.budget?.sar?.from}-
                  {this.state.PROPOSAL_DETAILS?.project?.budget?.sar?.to}SR
                </Text>
                {/* ) : (
                  <Text>
                    {' '}
                    {this.state.PROPOSAL_DETAILS?.project?.budget?.usd?.from}-
                    {this.state.PROPOSAL_DETAILS?.project?.budget?.usd?.to}USD
                  </Text>
                )} */}
              </Text>
            </View>
            <Text style={styles.freelancerText}>
              {t('proposalDetails.freelancer')}
            </Text>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('ViewProfile', {
                      id: this.state.PROPOSAL_DETAILS?.freelancer?.id,
                    });
                  }}>
                  {this.state.PROPOSAL_DETAILS?.freelancer?.profile_image ===
                  null ? (
                    <FastImage
                      style={styles.image}
                      source={require('src/assets/images/avator.png')}
                    />
                  ) : (
                    <FastImage
                      style={styles.image}
                      source={{
                        uri: this.state.PROPOSAL_DETAILS?.freelancer
                          ?.profile_image,
                      }}
                      defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.headerRight} onPress={() => {}}>
                <View style={styles.headerRightTop}>
                  <Text style={styles.freelancerName}>
                    {this.state.PROPOSAL_DETAILS?.freelancer?.first_name +
                      ' ' +
                      this.state.PROPOSAL_DETAILS?.freelancer?.last_name}
                  </Text>
                </View>
                <Text style={styles.headerRightCenter}>
                  {this.state.PROPOSAL_DETAILS?.freelancer?.title}
                </Text>
                <View style={styles.headerRightBottom}>
                  {this.state.PROPOSAL_DETAILS?.freelancer?.country !== '' ? (
                    <View style={styles.headerRightBottomLeft}>
                      <CustomIcon name="location" color={colors.appGray} />
                      <Text style={styles.locationName}>
                        {this.state.PROPOSAL_DETAILS?.freelancer?.country}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>
              {this.state.PROPOSAL_DETAILS?.descripiton}
            </Text>
            <Text style={styles.timelineText}>
              {t('proposalDetails.timeline')}
            </Text>
            <Text style={styles.timelineInfo}>
              {this.state.PROPOSAL_DETAILS?.period} {t('proposalDetails.days')}
            </Text>
            <Text style={styles.timelineText}>
              {t('proposalDetails.price')}
            </Text>
            <Text
              style={[
                styles.milestonePrice,
                {borderBottomColor: colors.appGray, borderBottomWidth: 0.5},
              ]}>
              {/* {this.state.PROPOSAL_DETAILS?.price_currency === 'sar'
                ? 'SR '
                : 'USD '} */}
              SR {numberWithCommas(this.state.PROPOSAL_DETAILS?.price)}
            </Text>
            <Text style={styles.milestoneText}>
              {t('proposalDetails.milestonePayments')}
            </Text>

            {this.state.PROPOSAL_DETAILS?.milestones?.map((item, i) => (
              <View style={styles.milestoneItem} key={i}>
                <Text style={styles.milestoneInfo}>
                  {item.name}
                  <Text
                    style={{
                      color: colors.appGray,
                      fontSize: 14,
                    }}>
                    {' '}
                    ({moment.unix(item.due_date).fromNow()})
                  </Text>
                </Text>
                <Text style={styles.milestonePrice}>
                  SR
                  {numberWithCommas(item.amount)}
                </Text>
              </View>
            ))}

            <Text style={styles.attachmentText}>
              {this.state.PROPOSAL_DETAILS?.files?.length > 0
                ? t('proposalDetails.attachment')
                : t('proposalDetails.noAttachment')}
            </Text>
            <View style={styles.attachmentOuterContainer}>
              {this.state.PROPOSAL_DETAILS?.files?.map((item, i) => {
                return (
                  <View style={styles.attachmentContainer} key={i}>
                    {item?.mime_type.includes('image') ? (
                      <TouchableOpacity
                        delayPressIn={0}
                        delayPressOut={0}
                        onPress={() =>
                          this.props.navigation.navigate('ImageViewer', {
                            uri: this.state.PROPOSAL_DETAILS?.files,
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

export default connect(mapStateToProps)(withTranslation()(ProposalDetails));
