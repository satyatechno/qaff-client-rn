import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  I18nManager,
  ActivityIndicator,
} from 'react-native';
import styles from './ProjectEdit.styles';
import Header from 'src/components/header/Header';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from 'src/icon-configs/config.json';
import colors from 'src/styles/texts/colors';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomIcon = createIconSetFromFontello(fontelloConfig);
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

import DocumentPicker from 'react-native-document-picker';
import {
  projectFormData,
  postProject,
  projectDetails,
  removeAttachment,
  editProject,
} from 'src/services/http.service';
import {connect} from 'react-redux';
import ErrorText from 'src/components/error-text/ErrorText';
import CustomButton from 'src/components/custom-button/CustomButton';
import {EDIT_PROJECT, LOADER} from 'src/actions/action.js';
import {withTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import ShowFileType from 'src/components/show-file-type/ShowFileType';

const ATTACHMENT_LIMIT = 20;

class ProjectEdit extends Component {
  constructor(props) {
    super();
    this.state = {
      budgetType: 'sar',

      attachment: [],
      projectFormData: [],
      describeInput: '',
      titleInput: '',
      files: [],
      postError: [],
      isLoading: false,
      category: '',
      subCategory: '',
      budget: '',
      timeline: '',
      milestone: '',
      projectId: null,
      skills: [],
      draftLoading: false,
    };
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  onActionSheetItemPress = async (index) => {
    const options = {
      title: 'Select Avatar',

      storageOptions: {
        skipBackup: true,
        path: 'photo',
        privateDirectory: true,
        multi: true,
      },
    };

    if (index == 0) {
      ImagePicker.openCamera({
        // width: Dimensions.get('window').width * 0.3,
        // height: Dimensions.get('window').width * 0.3,
        cropping: false,
        includeBase64: false,
      }).then((image) => {
        this.setState({
          attachment: [
            ...this.state.attachment,
            {
              name: Math.random().toString(),
              uri: image.path,
              type: image.mime,
            },
          ],
        });
      });
    } else if (index == 1) {
      ImagePicker.openPicker({
        // width: Dimensions.get('window').width * 0.3,
        // height: Dimensions.get('window').width * 0.3,
        // cropping: true,
        includeBase64: false,
        multiple: true,
      }).then((image) => {
        for (const res of image) {
          this.setState({
            attachment: [
              ...this.state.attachment,
              {
                name: Math.random().toString(),
                uri: res.path,
                type: res.mime,
              },
            ],
          });
        }
      });
    } else if (index === 2) {
      try {
        const results = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.allFiles],
        });
        // console.log('rr', results);
        // this.setState({files: [...this.state.files, results]});
        for (const res of results) {
          this.setState({
            attachment: [
              ...this.state.attachment,
              {
                name: res.name,
                uri: res.uri,
                type: res.type,
              },
            ],
          });
        }
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled the picker,');
        } else {
          throw err;
        }
      }
    }
  };
  removeAttachment = (index, id) => {
    let fileId = [];
    fileId.push(id);
    console.log('iidd', id);
    if (id !== undefined) {
      removeAttachment({
        id: this.state.projectId,
        token: this.props.token,
        file_ids: fileId,
      })
        .then((response) => {
          console.log('in then');
          let temp1 = [...this.state.attachment];
          temp1.splice(index, 1);
          this.setState({attachment: temp1});
        })
        .catch((err) => {
          console.log('remove attachment error', err.response.data);
        });
    } else {
      let temp = [...this.state.attachment];
      temp.splice(index, 1);
      this.setState({attachment: temp});
    }
  };

  onEditProject = (type) => {
    // console.log('\n\nttokkenn', this.props.token);
    // console.log('\n\n\n\njbid', this.props.route.params?.jobCategoryId);
    // type === 'draft' && this.setState({draftLoading: true});

    const {params} = this.props?.route;
    console.log('params BI', budget);
    console.log('state BI', this.state.budget[0]?.id);
    const {
      jobCategoryName,
      subCategory,
      budget,
      timeline,
      milestone,
      jobCategoryId,
    } = this.props.route.params;
    this.setState({isLoading: true});
    const fd = new FormData();
    fd.append('title', this.state.titleInput);
    fd.append('description', this.state.describeInput);
    fd.append(
      'category_id',
      jobCategoryId
        ? JSON.stringify(jobCategoryId)
        : JSON.stringify(this.state.category?.id),
    );
    fd.append(
      'sub_category_id',
      subCategory
        ? JSON.stringify(subCategory?.id)
        : JSON.stringify(this.state.subCategory?.id),
    );
    fd.append('currency', this.state.budgetType);
    fd.append(
      'budget_range_id',
      budget?.id
        ? JSON.stringify(budget?.id)
        : JSON.stringify(this.state.budget[0]?.id),
    );
    fd.append(
      'timeline_id',
      timeline
        ? JSON.stringify(timeline?.id)
        : JSON.stringify(this.state.timeline?.id),
    );
    fd.append(
      'milestone_id',
      milestone
        ? JSON.stringify(milestone?.id)
        : JSON.stringify(this.state.milestone?.id),
    );
    fd.append(
      'skills',
      JSON.stringify(params?.currentSkills ?? this.state.skills),
    );
    let temp_attachment = this.state.attachment.filter(
      (x) => x.id === undefined,
    );

    temp_attachment &&
      temp_attachment.map((file, i) => {
        fd.append('files[]', {
          name: file.name,
          type: file.type,
          uri:
            Platform.OS === 'android'
              ? file.uri
              : file.uri.replace('file://', ''),
        });
      });
    fd.append('publish_now', type === 'draft' ? 0 : 1);
    console.log('FDFD', JSON.stringify(fd));
    type === 'edit' && this.props.dispatch(LOADER(true));
    this.props.dispatch(
      EDIT_PROJECT({
        data: fd,
        id: this.state.projectId,
        navigation: this.props.navigation,
        type: type,
      }),
    );
    // type === 'draft' && this.setState({draftLoading: false});
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps?.route?.params?.currentSkills !==
      this.props.route?.params?.currentSkills
    ) {
      this.setState({skills: this.props.route?.params?.currentSkills});
    }
    if (
      prevProps?.route?.params?.subCategory?.id !==
        this.props?.route.params?.subCategory?.id ||
      prevProps?.route?.params?.jobCategoryName !==
        this.props.route?.params?.jobCategoryName
    ) {
      this.setState({skills: []});
    }
  }

  componentDidMount() {
    projectFormData()
      .then((response) => {
        // console.log('PFD >>>', response.data.data);
        this.setState({projectFormData: response.data.data});
      })
      .catch((error) => {
        if (error.response.data) {
          console.log('errMessage', error.response.data.message);

          console.log('Errors=====', error.response.data.errors);
        } else {
          console.log('Error', error);
        }
      });

    //     project details api
    projectDetails(this.props.route.params?.data?.id, this.props.token)
      .then((response) => {
        console.log(
          'edshowProj',
          JSON.stringify(response.data.data.project, null, 2),
        );
        let budget;
        let budgetData = [response.data.data.project.budget];
        response.data.data.project.currency === 'sar'
          ? (budget = budgetData.map((x) => ({
              id: x.id,
              name:
                x.sar.to === null
                  ? `>${x.sar.from} SR`
                  : x.sar.from === null
                  ? `<${x.sar.to} SR`
                  : `${x.sar.from}-${x.sar.to} SR`,
              // title: x.title,
            })))
          : (budget = budgetData.map((x) => ({
              id: x.id,
              name:
                x.usd.to === null
                  ? `>${x.usd.from} USD`
                  : x.usd.from === null
                  ? `<${x.usd.to} USD`
                  : `${x.usd.from}-${x.usd.to} USD`,
              // title: x.title,
            })));

        this.setState({
          titleInput: response.data.data.project.title,
          subCategory: response.data.data.project.sub_category,
          category: response.data.data.project.category,
          budget: budget,
          budgetType: 'sar',
          // response.data.data.project.currency === 'sar' ? 'sar' : 'usd',
          timeline: response.data.data.project.timeline,
          milestone: response.data.data.project.milestone,
          describeInput: response.data.data.project.description,
          attachment: response.data.data.project.files,
          projectId: response.data.data.project.id,
          skills: response.data.data?.project?.skills,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log('\n\n\nrResponseerror>>', error.response);

          if (error.response.data.message) {
            console.log('\n\n\nrmessageerror>>', error.response.data.message);
          }
          if (error.response.data.errors) {
            console.log('\n\n\nrajjoerror>>', error.response.data.errors);
            this.setState({postError: error.response.data.errors});
          }
          //     setTimeout(() => {
          //       this.setState({isLoading: false});
          //     }, 500);
        } else {
          console.log(error);
        }
      });
  }

  render() {
    const {
      jobCategoryName,
      subCategory,
      budget,
      timeline,
      milestone,
      type,
      jobCategoryId,
    } = this.props.route.params;
    const {t, loading, saveDraftLoading} = this.props;

    console.log('type', type);
    return (
      <>
        <Header
          title={t('projectEdit.editProject')}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' && 'padding'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.whatText}>
              {t('projectEdit.jobTitleQue')}{' '}
              <Text style={styles.jobTitleText}>
                {t('projectEdit.jobTitle')}
              </Text>
            </Text>
            <TextInput
              editable={loading === false && saveDraftLoading === false}
              style={styles.whatInput}
              placeholder={t('projectEdit.describeHere')}
              value={this.state.titleInput}
              onChangeText={(text) => {
                this.setState({titleInput: text});
                this.state.postError?.title &&
                  (this.state.postError.title = null);
              }}
            />
            <View style={styles.errorTextStyle}>
              {this.state.postError?.title && (
                <ErrorText name={this.state.postError?.title[0]} />
              )}
            </View>
            <Text style={styles.selectJobTitleText}>
              {t('projectEdit.selectJobCategory')}
            </Text>
            <TouchableOpacity
              disabled={loading || saveDraftLoading}
              onPress={() => {
                this.state.postError?.category_id &&
                  (this.state.postError.category_id = null);
                this.state.postError?.sub_category_id &&
                  (this.state.postError.sub_category_id = null);
                this.props.navigation.navigate('JobTitle', {edit: true});
              }}>
              <View style={styles.jobTitleInfoContainer}>
                <Text style={styles.jobTitleInfo}>
                  {jobCategoryName
                    ? jobCategoryName
                    : this.state.category?.name}
                </Text>
                <TouchableOpacity
                  disabled={loading || saveDraftLoading}
                  style={styles.nextIcon}
                  onPress={() => {
                    this.state.postError?.category_id &&
                      (this.state.postError.category_id = null);
                    this.state.postError?.sub_category_id &&
                      (this.state.postError.sub_category_id = null);
                    this.props.navigation.navigate('JobTitle', {edit: true});
                  }}>
                  <CustomIcon
                    name={I18nManager.isRTL ? 'back' : 'next'}
                    color={colors.appViolet}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View style={styles.errorTextStyle}>
              {this.state.postError?.category_id && (
                <ErrorText name={this.state.postError?.category_id[0]} />
              )}
            </View>
            <Text style={styles.jobText}>
              {t('projectEdit.jobSubcategory')}
            </Text>
            <Text style={styles.onlineStoreText}>
              {subCategory ? subCategory.name : this.state.subCategory.name}
            </Text>
            <View
              style={{borderBottomWidth: 0.5, borderColor: colors.appGray}}
            />
            <View style={styles.errorTextStyle}>
              {this.state.postError?.sub_category_id && (
                <ErrorText name={this.state.postError?.sub_category_id[0]} />
              )}
            </View>
            <Text style={styles.skillsText}>
              {t('projectEdit.pleaseSelectSkills')}
            </Text>
            <TouchableOpacity
              disabled={loading || saveDraftLoading}
              onPress={() =>
                this.props.navigation.navigate('AddSkills', {
                  navigationScreenName: 'ProjectEdit',
                  previousSkills:
                    this.props.route?.params?.currentSkills ??
                    this.state.skills,
                  subCategoryIds: [
                    jobCategoryId ? jobCategoryId : this.state.category?.id,
                    subCategory ? subCategory?.id : this.state.subCategory?.id,
                  ],
                })
              }>
              <View style={[styles.budgetContainer]}>
                {/* {this.props.route.params?.subCategory?.name} */}
                {/* {!this.props.route.params?.currentSkills ||
                  !this.state.skills.length ? (
                    'Please select skills'
                  ) : (
                    <ShowSkills
                      skills={
                       this.state.skills
                      }
                    />
                  )} */}
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                  <ShowSkills skills={this.state.skills ?? []} />
                </View>
                <CustomIcon
                  name={I18nManager.isRTL ? 'back' : 'next'}
                  color={colors.appViolet}
                  size={25}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.budgetText}>{t('projectEdit.budget')}</Text>
            <View style={styles.budgetContainer}>
              <View style={styles.budgetDropdownContainer}>
                {/* <RNPickerSelect
                  // style={{width: 250}}
                  items={[
                    {
                      label: 'SAR',
                      value: 'sar',
                      key: 'SAR',
                    },
                    {label: 'USD', value: 'usd', key: 'US'},
                  ]}
                  onValueChange={(value) => this.setState({budgetType: value})}
                  value={this.state.budgetType}
                  placeholder={{}}
                /> */}
                <Text style={{fontSize: 16}}>SAR</Text>
                {/* <Picker
              mode='dialog'
                selectedValue={this.state.budgetType}
                style={{height: 20, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({budgetType: itemValue})
                }>
                <Picker.Item label="USD" value="usd" />
                <Picker.Item label="SAR" value="sar" />
              </Picker> */}
              </View>
              <Text style={styles.divider} />
              <TouchableOpacity
                disabled={loading || saveDraftLoading}
                style={{flex: 1}}
                onPress={() => {
                  this.state.postError?.budget_range_id &&
                    (this.state.postError.budget_range_id = null);
                  this.props.navigation.navigate('Budget', {
                    budgetType: this.state.budgetType,
                    budgetData: this.state.projectFormData.budget_ranges,
                    edit: true,
                  });
                }}>
                <Text style={styles.budgetRangeText}>
                  {budget ? budget?.name : this.state.budget[0]?.name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loading || saveDraftLoading}
                style={styles.nextIcon}
                onPress={() => {
                  this.state.postError?.budget_range_id &&
                    (this.state.postError.budget_range_id = null);
                  this.props.navigation.navigate('Budget', {
                    budgetType: this.state.budgetType,
                    budgetData: this.state.projectFormData.budget_ranges,
                    edit: true,
                  });
                }}>
                <CustomIcon
                  name={I18nManager.isRTL ? 'back' : 'next'}
                  color={colors.appViolet}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.errorTextStyle}>
              {this.state.postError?.budget_range_id && (
                <ErrorText name={this.state.postError?.budget_range_id[0]} />
              )}
            </View>
            <Text style={styles.timelineText}>{t('projectEdit.timeline')}</Text>
            <TouchableOpacity
              disabled={loading || saveDraftLoading}
              onPress={() => {
                this.state.postError?.timeline_id &&
                  (this.state.postError.timeline_id = null);
                this.props.navigation.navigate('Timeline', {
                  timelineData: this.state.projectFormData.project_timelines,
                  edit: true,
                });
              }}>
              <View style={styles.timelineInfoContainer}>
                <Text style={styles.monthsText}>
                  {timeline ? timeline?.name : this.state.timeline?.title}
                </Text>
                <TouchableOpacity
                  disabled={loading || saveDraftLoading}
                  style={styles.nextIcon}
                  onPress={() => {
                    this.state.postError?.timeline_id &&
                      (this.state.postError.timeline_id = null);
                    this.props.navigation.navigate('Timeline', {
                      timelineData: this.state.projectFormData
                        .project_timelines,
                      edit: true,
                    });
                  }}>
                  <CustomIcon
                    name={I18nManager.isRTL ? 'back' : 'next'}
                    color={colors.appViolet}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View style={styles.errorTextStyle}>
              {this.state.postError?.timeline_id && (
                <ErrorText name={this.state.postError?.timeline_id[0]} />
              )}
            </View>
            <Text style={styles.milestoneText}>
              {t('projectEdit.milestonePayments')}
            </Text>
            <TouchableOpacity
              disabled={loading || saveDraftLoading}
              onPress={() => {
                this.state.postError?.milestone_id &&
                  (this.state.postError.milestone_id = null);
                this.props.navigation.navigate('MilestonePayment', {
                  milestonePayment: this.state.projectFormData.milestone_list,
                  edit: true,
                });
              }}>
              <View style={styles.milestoneInfoContainer}>
                <Text style={styles.paymentText}>
                  {milestone ? milestone?.name : this.state.milestone?.title}
                </Text>
                <TouchableOpacity
                  disabled={loading || saveDraftLoading}
                  style={styles.nextIcon}
                  onPress={() => {
                    this.state.postError?.milestone_id &&
                      (this.state.postError.milestone_id = null);
                    this.props.navigation.navigate('MilestonePayment', {
                      milestonePayment: this.state.projectFormData
                        .milestone_list,
                      edit: true,
                    });
                  }}>
                  <CustomIcon
                    name={I18nManager.isRTL ? 'back' : 'next'}
                    color={colors.appViolet}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View style={styles.errorTextStyle}>
              {this.state.postError?.milestone_id && (
                <ErrorText name={this.state.postError?.milestone_id[0]} />
              )}
            </View>
            <Text style={styles.describeText}>
              {t('projectEdit.description')}
              {/* <Text style={styles.describeInputMaxLimit}>
                {' '}
                {t('projectEdit.maxLimit')}
              </Text> */}
            </Text>
            <TextInput
              editable={loading === false && saveDraftLoading === false}
              style={styles.describeInput}
              placeholder={t('projectEdit.describeHereDescription')}
              multiline={true}
              // maxLength={300}
              value={this.state.describeInput}
              onChangeText={(text) => {
                this.setState({describeInput: text});
                this.state.postError?.description &&
                  (this.state.postError.description = null);
              }}
            />
            <View style={styles.errorTextStyle}>
              {this.state.postError?.description && (
                <ErrorText name={this.state.postError?.description[0]} />
              )}
            </View>
            <View style={styles.attachmentContainer}>
              <Text style={styles.attachmentText}>
                {t('projectEdit.addAttachment')}{' '}
                <Text style={styles.addAttachmentOptionalText}>
                  {t('projectEdit.optional')}
                </Text>
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                disabled={
                  this.state.attachment?.length > ATTACHMENT_LIMIT ||
                  loading ||
                  saveDraftLoading
                }
                onPress={this.showActionSheet}>
                <Ionicons
                  name="add-outline"
                  size={25}
                  color={colors.defaultWhite}
                />
              </TouchableOpacity>
            </View>
            {this.state.attachment.length > ATTACHMENT_LIMIT && (
              <Text style={styles.attachmentLimitText}>
                * {t('projectEdit.only')} {ATTACHMENT_LIMIT}{' '}
                {t('projectEdit.filesAllowed')}
              </Text>
            )}

            {this.state.attachment.map((item, i) => {
              return (
                this.state.attachment?.length > 0 && (
                  <View style={styles.attachmentImageContainer} key={i}>
                    {item?.mime_type?.includes('image/jpeg') ||
                    item?.mime_type?.includes('image/png') ||
                    item?.type?.includes('image') ? (
                      <FastImage
                        style={styles.attachmentImage}
                        source={{uri: item.id ? item.path : item.uri}}
                      />
                    ) : (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',

                          flex: 0.2,
                        }}>
                        <ShowFileType file={{...item, type: item.mime_type}} />
                      </View>
                    )}
                    <Text style={styles.attachmentImageText}></Text>
                    <TouchableOpacity
                      disabled={loading || saveDraftLoading}
                      onPress={() => this.removeAttachment(i, item.id)}>
                      <Ionicons
                        name="remove-circle-outline"
                        size={30}
                        color={colors.appGray}
                        style={{alignSelf: 'center'}}
                      />
                    </TouchableOpacity>
                  </View>
                )
              );
            })}

            {/* <TouchableOpacity
            onPress={this.onPostProject}
            style={styles.postButton}
            disabled={this.state.attachment?.length > ATTACHMENT_LIMIT}>
            <Text style={styles.postButtonText}>Post a project</Text>
          </TouchableOpacity> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 20,
              }}>
              {type === 'draft' && (
                <TouchableOpacity
                  onPress={() => this.onEditProject('draft')}
                  disabled={loading || saveDraftLoading}
                  style={{
                    backgroundColor: colors.appViolet,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 10,
                    minWidth: 120,
                  }}>
                  {this.props?.saveDraftLoading ? (
                    <ActivityIndicator
                      color={colors.defaultWhite}
                      size="small"
                    />
                  ) : (
                    <Text
                      style={{
                        color: colors.defaultWhite,
                        fontSize: 16,
                        marginTop: -1,
                      }}>
                      Edit Draft
                    </Text>
                  )}
                </TouchableOpacity>
              )}
              <TouchableOpacity
                disabled={loading || saveDraftLoading}
                onPress={() => this.onEditProject('edit')}
                style={{
                  backgroundColor: colors.skyBlue,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 10,
                  minWidth: type === 'draft' ? 120 : '100%',
                }}>
                {this.props.loading ? (
                  <ActivityIndicator color={colors.defaultWhite} size="small" />
                ) : (
                  <Text
                    style={{
                      color: colors.defaultWhite,
                      fontSize: 16,
                      marginTop: -1,
                    }}>
                    {t('projectAdd.postAProjectButton')}
                  </Text>
                )}
              </TouchableOpacity>

              {/* <CustomButton
                title={t('projectAdd.postAProjectButton')}
                isLoading={this.props.loading}
                handlePress={this.onPostProject}
                customMargin={1}
              /> */}
            </View>
            {/* <CustomButton
              title={t('projectEdit.editProjectButton')}
              isLoading={this.props.loading}
              handlePress={this.onEditProject}
              customMargin={1}
            /> */}

            <ActionSheet
              ref={(o) => (this.ActionSheet = o)}
              title={t('projectEdit.addAttachmentOption')}
              options={[
                t('projectEdit.takePhoto'),
                t('projectEdit.fromGallery'),
                t('projectEdit.otherFile'),
                t('projectEdit.cancel'),
              ]}
              cancelButtonIndex={3}
              onPress={(index) => {
                this.onActionSheetItemPress(index);
              }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const ShowSkills = ({skills}) => {
  if (!skills?.length) {
    return <Text>Please add some skills</Text>;
  }
  return skills.map((skill, i) => {
    return (
      <View
        key={i}
        style={{
          backgroundColor: colors.appViolet,
          padding: 10,
          margin: 2,
          borderRadius: 10,
          marginBottom: 5,
        }}>
        <Text style={{color: colors.defaultWhite}}>{skill}</Text>
      </View>
    );
  });
};

const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
  loading: state.myReducer.loading,
  saveDraftLoading: state.myReducer.saveDraftLoading,
});

export default connect(mapStateToProps)(withTranslation()(ProjectEdit));
