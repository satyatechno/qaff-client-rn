import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  I18nManager,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import DocumentPicker from 'react-native-document-picker';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {createIconSetFromFontello} from 'react-native-vector-icons';
// import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {
  FETCH_NEWSFEED,
  FETCH_PROJECTS,
  LOADER,
  MODAL_VISIBLE,
} from 'src/actions/action.js';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import ShowFileType from 'src/components/show-file-type/ShowFileType';
import fontelloConfig from 'src/icon-configs/config.json';
import {postProject, projectFormData} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './ProjectAdd.styles';

const CustomIcon = createIconSetFromFontello(fontelloConfig);

const ATTACHMENT_LIMIT = 20;

class ProjectAdd extends Component {
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
      saveLoading: false,
      skills: [],
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

  removeAttachment = (index) => {
    let temp = [...this.state.attachment];
    temp.splice(index, 1);
    this.setState({attachment: temp});
  };

  onPostProject = (type) => {
    type === 'save' && this.setState({saveLoading: true});
    // console.log('\n\nttokkenn', this.props.token);
    // console.log('\n\n\n\njbid', this.props.route.params?.jobCategoryId);
    const {params} = this.props?.route;
    console.log('current skills', params?.currentSkills);
    type !== 'save' && this.props.dispatch(LOADER(true));
    const fd = new FormData();

    fd.append('title', this.state.titleInput);
    fd.append('description', this.state.describeInput);
    fd.append(
      'category_id',
      JSON.stringify(this.props.route.params?.jobCategoryId),
    );
    fd.append(
      'sub_category_id',
      JSON.stringify(this.props.route.params?.subCategory?.id),
    );
    fd.append('currency', this.state.budgetType);
    fd.append(
      'budget_range_id',
      JSON.stringify(this.props.route.params?.budget?.id),
    );
    fd.append(
      'timeline_id',
      JSON.stringify(this.props.route.params?.timeline?.id),
    );
    fd.append(
      'milestone_id',
      JSON.stringify(this.props.route.params?.milestone?.id),
    );
    // fd.append('files[]', {
    //   name: this.state.files.fileName,
    //   type: this.state.files.type,
    //   uri:
    //     Platform.OS === 'android'
    //       ? this.state.files.uri
    //       : this.state.files.uri.replace('file://', ''),
    // });
    this.state.attachment &&
      this.state.attachment.map((file, i) => {
        fd.append('files[]', {
          name: file.name,
          type: file.type,
          uri:
            Platform.OS === 'android'
              ? file.uri
              : file.uri.replace('file://', ''),
        });
      });
    // fd.append('files[]', this.state.attachment);

    fd.append('publish_now', type === 'save' ? 0 : 1);

    fd.append('skills', JSON.stringify(params?.currentSkills ?? []));
    // fd.append('token', this.props.token);
    console.log('FDFD', JSON.stringify(fd));

    postProject(fd, this.props.token)
      .then((response) => {
        if (type === 'save') {
          this.setState({saveLoading: false});
          this.props.dispatch(FETCH_PROJECTS({type: 'draft', page: 1}));
        } else {
          this.props.dispatch(FETCH_PROJECTS({type: 'progress', page: 1}));
        }

        this.props.dispatch(LOADER(false));
        this.setState({attachment: []});

        console.log(
          '\n\n\nProject added',
          JSON.stringify(response.data, null, 2),
        );
        this.props.dispatch(
          MODAL_VISIBLE({
            visible: true,
            type: 1,
            message: response.data.message,
          }),
        );
        this.props.navigation.replace('ProjectDetails', {
          projectId: response.data.data.project.id,
        });
      })
      .catch((error) => {
        type !== 'save' && this.props.dispatch(LOADER(false));
        type === 'save' && this.setState({saveLoading: false});

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
  };

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
  }
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
  render() {
    const {t, loading} = this.props;
    const {saveLoading} = this.state;
    return (
      <>
        <Header
          title={t('projectAdd.postAProject')}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' && 'padding'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.whatText}>
              {t('projectAdd.jobTitleQue')}{' '}
              <Text style={styles.jobTitleText}>
                {t('projectAdd.jobTitle')}
              </Text>{' '}
            </Text>
            <TextInput
              editable={loading === false && saveLoading === false}
              style={styles.whatInput}
              placeholder={t('projectAdd.describeHere')}
              value={this.state.titleInput}
              onChangeText={(text) => {
                this.setState({titleInput: text}),
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
              {t('projectAdd.selectJobCategory')}
            </Text>
            <TouchableOpacity
              disabled={loading || saveLoading}
              onPress={() => {
                this.state.postError?.category_id &&
                  (this.state.postError.category_id = null);
                this.state.postError?.sub_category_id &&
                  (this.state.postError.sub_category_id = null);
                this.props.navigation.navigate('JobTitle');
              }}>
              <View style={styles.jobTitleInfoContainer}>
                <Text style={styles.jobTitleInfo}>
                  {this.props.route.params?.jobCategoryName}
                </Text>
                <TouchableOpacity
                  disabled={loading || saveLoading}
                  style={styles.nextIcon}
                  onPress={() => {
                    this.state.postError?.category_id &&
                      (this.state.postError.category_id = null);
                    this.state.postError?.sub_category_id &&
                      (this.state.postError.sub_category_id = null);
                    this.props.navigation.navigate('JobTitle');
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
            <Text style={styles.jobText}>{t('projectAdd.jobSubcategory')}</Text>
            <Text style={styles.onlineStoreText}>
              {this.props.route.params?.subCategory?.name}
            </Text>
            <View
              style={{borderBottomWidth: 0.5, borderColor: colors.appGray}}
            />
            <View style={styles.errorTextStyle}>
              {this.state.postError?.sub_category_id && (
                <ErrorText name={this.state.postError?.sub_category_id[0]} />
              )}
            </View>
            <Text style={styles.skillsText}>{t('projectAdd.skillQue')}</Text>
            <TouchableOpacity
              disabled={loading || saveLoading}
              onPress={() =>
                this.props.navigation.navigate('AddSkills', {
                  navigationScreenName: 'ProjectAdd',
                  previousSkills: this.state.skills,
                  subCategoryIds: [
                    this.props.route?.params?.jobCategoryId,
                    this.props.route.params?.subCategory?.id,
                  ],
                })
              }>
              <View style={[styles.budgetContainer]}>
                {/* {this.props.route.params?.subCategory?.name} */}
                <View style={{flexWrap: 'wrap', flexDirection: 'row', flex: 1}}>
                  {!this.state.skills?.length ? (
                    <Text style={styles.skills}>
                      {' '}
                      {t('projectAdd.pleaseSelectSkills')}
                    </Text>
                  ) : (
                    <ShowSkills skills={this.state.skills} />
                  )}
                </View>
                <CustomIcon
                  name={I18nManager.isRTL ? 'back' : 'next'}
                  color={colors.appViolet}
                  size={25}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.budgetText}>{t('projectAdd.budget')}</Text>
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
                <Text style={{fontSize: 16}}>{t('projectAdd.sar')} </Text>
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
              <View style={styles.divider} />
              <TouchableOpacity
                disabled={loading || saveLoading}
                style={{flex: 1}}
                onPress={() => {
                  this.state.postError?.budget_range_id &&
                    (this.state.postError.budget_range_id = null);
                  this.props.navigation.navigate('Budget', {
                    budgetType: this.state.budgetType,
                    budgetData: this.state.projectFormData.budget_ranges,
                  });
                }}>
                <Text style={styles.budgetRangeText}>
                  {this.props.route.params?.budget?.name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loading || saveLoading}
                style={styles.nextIcon}
                onPress={() => {
                  this.state.postError?.budget_range_id &&
                    (this.state.postError.budget_range_id = null);
                  this.props.navigation.navigate('Budget', {
                    budgetType: this.state.budgetType,
                    budgetData: this.state.projectFormData.budget_ranges,
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
            <Text style={styles.timelineText}>{t('projectAdd.timeline')}</Text>
            <TouchableOpacity
              disabled={loading || saveLoading}
              onPress={() => {
                this.state.postError?.timeline_id &&
                  (this.state.postError.timeline_id = null);
                this.props.navigation.navigate('Timeline', {
                  timelineData: this.state.projectFormData.project_timelines,
                });
              }}>
              <View style={styles.timelineInfoContainer}>
                <Text style={styles.monthsText}>
                  {this.props.route.params?.timeline?.name}
                </Text>
                <TouchableOpacity
                  disabled={loading || saveLoading}
                  style={styles.nextIcon}
                  onPress={() => {
                    this.state.postError?.timeline_id &&
                      (this.state.postError.timeline_id = null);
                    this.props.navigation.navigate('Timeline', {
                      timelineData: this.state.projectFormData
                        .project_timelines,
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
              {t('projectAdd.milestonePayments')}
            </Text>
            <TouchableOpacity
              disabled={loading || saveLoading}
              onPress={() => {
                this.state.postError?.milestone_id &&
                  (this.state.postError.milestone_id = null);
                this.props.navigation.navigate('MilestonePayment', {
                  milestonePayment: this.state.projectFormData.milestone_list,
                });
              }}>
              <View style={styles.milestoneInfoContainer}>
                <Text style={styles.paymentText}>
                  {this.props.route.params?.milestone?.name}
                </Text>
                <TouchableOpacity
                  disabled={loading || saveLoading}
                  style={styles.nextIcon}
                  onPress={() => {
                    this.state.postError?.milestone_id &&
                      (this.state.postError.milestone_id = null);
                    this.props.navigation.navigate('MilestonePayment', {
                      milestonePayment: this.state.projectFormData
                        .milestone_list,
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
              {t('projectAdd.description')}
              {/* <Text style={styles.describeInputMaxLimit}>
                {' '}
                {t('projectAdd.maxLimit')}
              </Text> */}
            </Text>
            <TextInput
              editable={loading === false && saveLoading === false}
              returnKeyType="next"
              numberOfLines={1}
              style={styles.describeInput}
              placeholder={t('projectAdd.describeHereDescription')}
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
                {t('projectAdd.addAttachment')}{' '}
                <Text style={styles.addAttachmentOptionalText}>
                  {t('projectAdd.optional')}
                </Text>
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                disabled={
                  this.state.attachment?.length > ATTACHMENT_LIMIT ||
                  loading ||
                  saveLoading
                }
                onPress={this.showActionSheet}>
                <Ionicons
                  name="add-outline"
                  size={26}
                  color={colors.defaultWhite}
                  style={{marginStart: 2}}
                />
              </TouchableOpacity>
            </View>
            {this.state.attachment.length > ATTACHMENT_LIMIT && (
              <Text style={styles.attachmentLimitText}>
                * {t('projectAdd.only')} {ATTACHMENT_LIMIT}{' '}
                {t('projectAdd.filesAllowed')}
              </Text>
            )}

            {this.state.attachment.map((item, i) => {
              return (
                this.state.attachment?.length > 0 && (
                  <View style={styles.attachmentImageContainer} key={i}>
                    {item.type.includes('image') ? (
                      <FastImage
                        style={styles.attachmentImage}
                        source={{uri: item.uri}}
                      />
                    ) : (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',

                          flex: 0.2,
                        }}>
                        <ShowFileType file={item} />
                      </View>
                    )}
                    <Text style={styles.attachmentImageText}></Text>
                    <TouchableOpacity
                      disabled={loading || saveLoading}
                      onPress={() => this.removeAttachment(i)}>
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
              <TouchableOpacity
                disabled={loading || saveLoading}
                onPress={() => this.onPostProject('save')}
                style={{
                  backgroundColor: colors.appViolet,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 10,
                  minWidth: 120,
                }}>
                {this.state.saveLoading ? (
                  <ActivityIndicator color={colors.defaultWhite} size="small" />
                ) : (
                  <Text
                    style={{
                      color: colors.defaultWhite,
                      fontSize: 16,
                      marginTop: -1,
                    }}>
                    Save Draft
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loading || saveLoading}
                onPress={() => this.onPostProject('post')}
                style={{
                  backgroundColor: colors.skyBlue,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 10,
                  minWidth: 120,
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

            <ActionSheet
              ref={(o) => (this.ActionSheet = o)}
              title={t('projectAdd.addAttachmentOption')}
              options={[
                t('projectAdd.takePhoto'),
                t('projectAdd.fromGallery'),
                t('projectAdd.otherFile'),
                t('projectAdd.cancel'),
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
const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
  token: state.myReducer.user.token,
});

const ShowSkills = ({skills}) =>
  skills.map((skill, i) => {
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

export default connect(mapStateToProps)(withTranslation()(ProjectAdd));
