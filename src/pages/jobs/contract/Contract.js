import moment from 'moment';
import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  I18nManager,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import CustomButton from 'src/components/custom-button/CustomButton';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import ShowFileType from 'src/components/show-file-type/ShowFileType';
import {
  createContract,
  getMileStoneList,
  getProposalDetails,
  projectDetails,
} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import styles from './Contract.styles';
class Contract extends Component {
  state = {
    milestoneName: [],
    dueDate: [],
    modalIndex: 0,
    showDatePicker: false,
    attachment: [],
    amount: [],
    titleError: false,
    workDetailError: false,
    milestoneError: [],
    PROPOSAL_DETAILS: '',
    toggle: false,
    paymentType: '',
    demo: [],
    PROJECT_DETAILS: '',
    milestoneList: [],
    paymentCount: '',
    toggleContract: false,
    contractTitle: ' ',
    contractDetail: ' ',
    check: false,
    milestoneAmountValues: [],
    activeEscrowId: 0,
  };

  milestoneCount = [];

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  // onActionSheetItemPress = async (index) => {
  //     const options = {
  //         title: 'Select Avatar',

  //         storageOptions: {
  //             skipBackup: true,
  //             path: 'photo',
  //             privateDirectory: true,
  //             multi: true,

  //         },
  //     };

  //     if (index == 0) {
  //         ImagePicker.launchCamera(options, (response) => {
  //             if (response.didCancel) {
  //                 console.log('User cancelled image picker');
  //             } else if (response.error) {
  //                 console.log('ImagePicker Error: ', response.error);
  //             } else if (response.customButton) {
  //                 console.log('User tapped custom button: ', response.customButton);
  //             } else {
  //                 // const source = {uri: response.uri};
  //                 // console.log('hhjhh', response);
  //                 this.setState({
  //                     attachment: [
  //                         ...this.state.attachment,
  //                         {
  //                             name: response.fileName,
  //                             uri: response.uri,
  //                             type: response.type,
  //                         },
  //                     ],
  //                 });
  //             }
  //         });
  //     } else if (index == 1) {
  //         ImagePicker.launchImageLibrary(options, (response) => {
  //             if (response.didCancel) {
  //                 console.log('User cancelled image picker');
  //             } else if (response.error) {
  //                 console.log('ImagePicker Error: ', response.error);
  //             } else if (response.customButton) {
  //                 console.log('User tapped custom button: ', response.customButton);
  //             } else {
  //                 // const source = {uri: response.uri};
  //                 // console.log('pickerResponse', response);
  //                 // this.setState({files: response});
  //                 this.setState({
  //                     attachment: [
  //                         ...this.state.attachment,
  //                         {
  //                             name: response.fileName,
  //                             uri: response.uri,
  //                             type: response.type,
  //                         },
  //                     ],
  //                 });
  //             }
  //         });
  //     } else if (index === 2) {
  //         try {
  //             const results = await DocumentPicker.pickMultiple({
  //                 type: [DocumentPicker.types.allFiles],
  //             });
  //             // console.log('rr', results);
  //             // this.setState({files: [...this.state.files, results]});
  //             for (const res of results) {
  //                 this.setState({
  //                     attachment: [
  //                         ...this.state.attachment,
  //                         {
  //                             name: res.name,
  //                             uri: res.uri,
  //                             type: res.type,
  //                         },
  //                     ],
  //                 });
  //             }
  //         } catch (err) {
  //             if (DocumentPicker.isCancel(err)) {
  //                 console.log('User cancelled the picker,');
  //             } else {
  //                 throw err;
  //             }
  //         }
  //     }
  // };

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

  submitOffer = () => {
    // this.props.dispatch(LOADER(true));
    console.log(
      'milestone name',
      this.state.PROPOSAL_DETAILS?.milestones?.[0]?.note,
    );
    const {activeEscrowId} = this.state;
    let milestone = [];
    if (
      parseInt(this.state.PROPOSAL_DETAILS?.project?.amount_in_escrow) === 0
    ) {
      for (let i = 0; i < this.state.paymentCount; i++) {
        milestone.push({
          description: this.state.PROPOSAL_DETAILS?.milestones?.[i]?.note,
          amount: parseInt(this.state.milestoneAmountValues[i]),

          due_date: moment(this.state.dueDate[i]).format('X'),
          selected_for_payment:
            activeEscrowId === 0 ? true : i === 0 ? true : false,
        });
      }
    } else {
      for (let i = 0; i < this.state.paymentCount; i++) {
        milestone.push({
          description: this.state.PROPOSAL_DETAILS?.milestones?.[i]?.note,
          amount: parseInt(this.state.milestoneAmountValues[i]),

          due_date: moment(this.state.dueDate[i]).format('X'),
          selected_for_payment: i === 0 ? true : false,
          no_need_payment:
            parseInt(this.state.PROPOSAL_DETAILS?.project?.amount_in_escrow) >=
            parseInt(this.state.PROPOSAL_DETAILS?.milestones[0]?.amount)
              ? true
              : false,
        });
      }
    }

    // console.log('mstone', milestone);

    const fd = new FormData();

    fd.append('freelancer_id', this.state.PROPOSAL_DETAILS.freelancer.id);
    fd.append('title', this.state.contractTitle);
    fd.append('work_details', this.state.contractDetail);
    fd.append('number_of_milestones', this.state.paymentCount);
    fd.append('currency', 'sar');
    fd.append('amount', parseInt(this.state.PROPOSAL_DETAILS.price)),
      fd.append('milestones', JSON.stringify(milestone));
    fd.append(
      'amount_confirmation_for_payment',
      activeEscrowId === 0
        ? parseInt(this.state.PROPOSAL_DETAILS.price)
        : parseInt(this.state.milestoneAmountValues[0]),
    );

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

    // console.log('fd', fd);

    parseInt(this.state.PROPOSAL_DETAILS?.project?.amount_in_escrow) !== 0
      ? createContract({
          data: fd,
          id: this.props.route.params?.projectId,
          token: this.props.token,
        })
          .then((data) => {
            this.props.navigation.navigate('ContractDetails', {
              contractId: data?.data?.data?.contract?.id,
            });
          })
          .catch((err) => console.error('create contract error ', err))
      : this.props.navigation.navigate('Payment', {
          freelancer: this.state.PROPOSAL_DETAILS.freelancer,
          projectId: this.props.route.params?.projectId,
          fd: fd,
          project: this.state.PROPOSAL_DETAILS?.project,
        });
  };
  checkValidation = () => {
    const {
      contractTitle,
      contractDetail,
      paymentCount,
      check,
      workDetailError,
      titleError,
    } = this.state;
    var temp = [];
    var condition = false;
    if (!this.state.contractDetail.length || !this.state.contractTitle.length) {
      if (!this.state.contractTitle) {
        this.setState({titleError: true});
      }
      if (!this.state.contractDetail) {
        this.setState({workDetailError: true});
      }
    } else {
      this.submitOffer();
    }
    // if (check) {
    //   for (let index = 0; index < paymentCount; index++) {
    //     temp.push({
    //       index: index,
    //       nameError: !this.state.milestoneName[index] ? true : false,
    //       //  amtError: !this.state.amount[index] ? true : false,
    //     });
    //     condition = condition || !this.state.milestoneName[index];
    //   }
    //   this.setState({milestoneError: temp});
    //   if (contractDetail === '' || contractTitle === '' || condition) {
    //     if (contractTitle === '') {
    //       this.setState({titleError: true});
    //     }
    //     if (contractDetail === '') {
    //       this.setState({workDetailError: true});
    //     }
    //   } else {
    //     this.submitOffer();
    //     this.setState({
    //       titleError: false,
    //       workDetailError: false,
    //       milestoneError: [],
    //     });
    //   }
    // } else {
    //   alert('Please accept terms & privacy policy');
    // }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.PROPOSAL_DETAILS?.price !==
        this.state.PROPOSAL_DETAILS?.price ||
      prevState.paymentCount !== this.state.paymentCount
    ) {
      let groups = this.distributeInteger(
        this.state.PROPOSAL_DETAILS?.price,
        this.state.paymentCount,
      );
      this.setState({milestoneAmountValues: [...groups]});
    }
  }

  componentDidMount() {
    this.props.dispatch(LOADER(true));
    if (this.props.route.params?.errorMessage) {
      alert('error' + this.props.route.params.errorMessage);
    }
    projectDetails(this.props.route.params?.projectId, this.props.token)
      .then((response) => {
        this.setState({
          PROJECT_DETAILS: response.data.data.project,
          paymentType: response.data.data.project.milestone.title,
          paymentCount: response.data.data.project.milestone.count,
          contractTitle: response.data.data.project.title,
          contractDetail: response.data.data.project.description,
        });
        var temp = [];
        let date = [];
        for (var i = 0; i < response.data.data.project.milestone.count; i++) {
          temp.push(i);
          date.push(new Date());
        }
        this.setState({demo: temp, dueDate: date});
        this.props.dispatch(LOADER(false));
      })
      .catch((error) => {
        console.log(error);
        this.props.dispatch(LOADER(false));
      });
    getProposalDetails({
      projectId: this.props.route.params.projectId,
      id: this.props.route.params.id,
      token: this.props.token,
    })
      .then((response) => {
        console.log(
          'dataaaaa',
          JSON.stringify(response.data.data.proposal?.milestones, null, 2),
        );
        this.setState({PROPOSAL_DETAILS: response.data.data.proposal});

        this.props.dispatch(LOADER(false));
      })
      .catch((error) => {
        this.props.dispatch(LOADER(false));
        console.log(error);
      });

    getMileStoneList({token: this.props.token})
      .then((res) => {
        this.setState({milestoneList: res.data.data.milestone_list});
        this.props.dispatch(LOADER(false));
      })
      .catch((error) => {
        console.log(error);
        this.props.dispatch(LOADER(false));
      });
  }

  handleSelect(item) {
    console.log('object', item);
    var temp = [];
    var temp2 = [];
    for (var i = 0; i < item.count; i++) {
      console.log('object');
      temp.push(i), temp2.push(new Date());
    }
    this.setState({demo: temp, dueDate: temp2});
    this.setState({
      toggle: false,
      paymentType: item.title,
      paymentCount: item.count,
    });
  }

  distributeInteger = (total, divider) => {
    let groups = [];
    if (divider === 0) {
      return groups.push(0);
    } else {
      let rest = total % divider;
      let result = total / divider;
      for (let i = 0; i < divider; i++) {
        if (rest-- > 0) {
          groups.push(Math.ceil(result));
        } else {
          groups.push(Math.floor(result));
        }
      }
      return groups;
    }
  };

  render() {
    const {freelancerName} = this.props.route?.params;
    const {t} = this.props;
    console.log('dsfd', JSON.stringify(this.state.PROPOSAL_DETAILS, null, 2));
    return (
      <>
        <StatusBar translucent={false} backgroundColor={colors.skyBlue} />
        <Header
          backButton={true}
          title={t('terms.terms')}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        {this.props.loading ? (
          <ActivityIndicator
            color={colors.skyBlue}
            size="large"
            style={{justifyContent: 'center', alignSelf: 'center', flex: 1}}
          />
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView style={[styles.container, {marginBottom: 50}]}>
              <View style={styles.container}>
                <View style={{backgroundColor: colors.appViolet, padding: 10}}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: fonts.primary,
                      color: colors.defaultWhite,
                    }}>
                    {t('terms.intro1')}{' '}
                    <Text
                      style={{
                        textDecorationLine: 'underline',
                        fontWeight: '700',
                      }}>
                      {t('terms.intro2')}
                    </Text>
                    {t('terms.intro3')}
                  </Text>
                </View>
                {/* <View style={styles.rowTop}>
                  <Text style={styles.paymentText}>
                    {t('terms.paymentOption')}
                  </Text>
                  <Icon
                    name="question"
                    size={20}
                    color={colors.appGray}
                    style={{marginTop: 10, marginStart: 10}}
                  />
                </View> */}
                {/* <View style={styles.containerRow}>
                  <View>
                    <View style={styles.rowTop}>
                      <Text style={styles.periodText}>
                        {this.state.paymentType}
                      </Text>
                      <Icon
                        name="pencil"
                        size={20}
                        color={colors.appGray}
                        onPress={() => {
                          this.setState({toggle: !this.state.toggle});
                        }}
                      />
                    </View> */}
                {/* {this.state.toggle && (
                      <View style={styles.toggle}>
                        {this.state.milestoneList.map((item, index) => {
                          return (
                            <TouchableOpacity
                              key={item.id.toString()}
                              onPress={() => this.handleSelect(item)}>
                              <Text style={styles.toggleOption}>
                                {item.title}
                              </Text>
                              {index !==
                                this.state.milestoneList.length - 1 && (
                                <View
                                  style={{
                                    backgroundColor: colors.appGray1,
                                    height: 1,
                                  }}
                                />
                              )}
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )} */}
                {/* <Text style={[styles.expectedText, {marginBottom: 10}]}>
                      {t('terms.payAsText')}
                    </Text>
                  </View>
                </View> */}

                <View style={styles.containerRow}>
                  <View style={styles.rowTop}>
                    <View>
                      <Text style={styles.periodText}>
                        {t('terms.proposalDetails')}
                      </Text>
                      <Text style={[styles.SRtext]}>
                        {this.state.PROPOSAL_DETAILS.price_currency === 'sar'
                          ? 'SR '
                          : 'USD '}{' '}
                        {parseInt(this.state.PROPOSAL_DETAILS.price)}
                        {/* <Icon
                          name="pencil"
                          size={20}
                          color={colors.appGray}
                        /> */}
                      </Text>
                      {/* <Text style={[styles.expectedText, {marginTop: -5}]}>
                        {t('terms.thisIsThePriceText')}
                      </Text> */}
                    </View>
                  </View>
                </View>

                <Text style={styles.milestoneText}>
                  {t('terms.milestones')}:
                </Text>
                {this.state.demo.map((x, i) => (
                  <View key={i} style={styles.paymentContainer}>
                    <Text style={styles.subHeading}>
                      <Text style={{fontSize: 18, fontFamily: fonts.primarySB}}>
                        {i + 1}.
                      </Text>{' '}
                      {t('terms.milestone')}
                    </Text>
                    <Text
                      style={{
                        paddingStart: 25,
                        paddingTop: 5,
                        fontSize: 16,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.appGray1,
                        paddingBottom: 10,
                      }}>{`${t('terms.milestone')} ${i + 1}`}</Text>
                    {this.state.PROPOSAL_DETAILS?.milestones?.[i]?.note ? (
                      <>
                        <Text style={[styles.subHeading, {paddingStart: 15}]}>
                          {t('terms.description')}:
                        </Text>
                        <TextInput
                          editable={false}
                          onChangeText={(milestoneName) => {
                            let data = this.state.milestoneName;
                            data[i] = milestoneName;
                            // this.setState((prevState) => {
                            //     prevState.milestoneName[i] = milestoneName;
                            //     return { milestoneName: prevState.milestoneName };
                            // });
                            this.setState({
                              milestoneName: data,
                            });
                          }}
                          value={
                            this.state.PROPOSAL_DETAILS?.milestones?.[i]?.note
                          }
                          // value={this.state.milestoneName}
                          style={{
                            paddingHorizontal: 30,
                            textAlign: I18nManager.isRTL ? 'right' : 'left',
                          }}
                        />
                      </>
                    ) : null}
                    {this.state.milestoneError[i]?.nameError && (
                      <ErrorText name={t('terms.required')} />
                    )}

                    <View style={styles.horizontalDivider} />
                    <Text style={[styles.subHeading, {marginStart: 30}]}>
                      {t('terms.dueDate')}
                    </Text>

                    <TouchableOpacity
                      disabled={true}
                      style={[
                        styles.content,
                        {paddingBottom: 10, paddingStart: 20},
                      ]}
                      onPress={() =>
                        this.setState({
                          showDatePicker: !this.state.showDatePicker,
                          modalIndex: i,
                        })
                      }>
                      <Ionicons
                        name="calendar-outline"
                        size={18}
                        color={colors.skyBlue}
                        style={{marginStart: 10, marginEnd: 10}}
                      />
                      <Text>
                        {moment(this.state.dueDate[i]).format('DD/MM/YYYY')}
                      </Text>
                      {this.state.showDatePicker &&
                        i === this.state.modalIndex && (
                          <Modal
                            isVisible={this.state.showDatePicker}
                            backdropOpacity={0.5}
                            onBackdropPress={() =>
                              this.setState({showDatePicker: false})
                            }>
                            <View
                              style={{
                                backgroundColor: colors.defaultWhite,
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 10,
                                marginHorizontal: 10,
                                borderRadius: 10,
                              }}>
                              <Text style={{fontSize: 16, marginBottom: 10}}>
                                {t('terms.selectDate')}
                              </Text>
                              <DatePicker
                                date={this.state.dueDate[i]}
                                minimumDate={new Date()}
                                onDateChange={(date) => {
                                  // console.log('gdg', date);
                                  let temp = this.state.dueDate;

                                  temp[i] = date;

                                  this.setState({dueDate: temp});
                                }}
                                mode={'date'}
                                style={{width: 200}}
                              />
                            </View>
                          </Modal>
                        )}
                    </TouchableOpacity>
                    <View style={styles.horizontalDivider} />
                    <Text style={[styles.subHeading, {marginStart: 30}]}>
                      {t('terms.amount')}
                    </Text>
                    <View style={[styles.content, {marginBottom: 15}]}>
                      <Text style={styles.budgetType}>
                        SR
                        {/* {this.state.PROPOSAL_DETAILS?.price_currency === 'sar'
                          ? 'SR'
                          : 'USD'} */}
                      </Text>
                      <Text style={{}}>
                        {JSON.stringify(this.state.milestoneAmountValues[i])}
                      </Text>
                    </View>
                  </View>
                ))}

                <Text style={[styles.milestoneText, {color: colors.appYellow}]}>
                  {t('terms.workDescription')}
                </Text>

                <View style={styles.containerRow}>
                  <View style={styles.rowTop}>
                    <View>
                      <Text style={styles.periodText}>
                        {' '}
                        {t('terms.contractTitle')}{' '}
                        {!this.state.toggleContract ? (
                          <Icon
                            name="pencil"
                            size={16}
                            color={colors.appGray}
                            onPress={() => {
                              this.setState({toggleContract: true});
                            }}
                          />
                        ) : null}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <TextInput
                          value={this.state.contractTitle}
                          style={{
                            color: colors.appBlack,
                            fontFamily: fonts.primary,
                            width: Dimensions.get('screen').width * 0.8,
                            paddingStart: 5,
                            textAlign: I18nManager.isRTL ? 'right' : 'left',
                          }}
                          editable={this.state.toggleContract}
                          onChangeText={(t) =>
                            this.setState({contractTitle: t})
                          }
                        />
                        {this.state.toggleContract ? (
                          <Icon
                            name="check"
                            size={20}
                            color={colors.appGreen}
                            onPress={() => {
                              this.setState({toggleContract: false});
                            }}
                            style={{marginTop: 10}}
                          />
                        ) : null}
                      </View>
                    </View>
                  </View>
                  {this.state.titleError && (
                    <View style={{marginStart: -10}}>
                      <ErrorText name={t('terms.required')} />
                    </View>
                  )}
                </View>
                <View style={styles.containerRow}>
                  <View style={styles.rowTop}>
                    <View>
                      <Text style={styles.periodText}>
                        {' '}
                        {t('terms.workDetails')}
                      </Text>
                      <TextInput
                        value={this.state.contractDetail}
                        multiline={true}
                        style={{
                          color: colors.appBlack,
                          fontFamily: fonts.primary,
                          width: Dimensions.get('screen').width * 0.8,
                          textAlign: I18nManager.isRTL ? 'right' : 'left',
                        }}
                        onChangeText={(t) => this.setState({contractDetail: t})}
                      />
                    </View>
                  </View>
                  {this.state.workDetailError && (
                    <View style={{marginStart: -10}}>
                      <ErrorText name={t('terms.required')} />
                    </View>
                  )}
                </View>

                <Text
                  style={{
                    marginStart: 10,
                    fontSize: 18,
                    fontFamily: fonts.primarySB,
                  }}>
                  {t('terms.dipositText1')}
                </Text>
                <Text
                  style={{
                    marginStart: 10,
                    fontSize: 14,
                    fontFamily: fonts.primary,
                    color: colors.appGray,
                    marginVertical: 5,
                  }}>
                  {t('terms.dipositText2')}
                  {t('terms.dipositText3')}
                </Text>

                {parseInt(
                  this.state.PROPOSAL_DETAILS?.project?.amount_in_escrow,
                ) === 0 ? (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => this.setState({activeEscrowId: 0})}
                      style={{flexDirection: 'row', marginHorizontal: 10}}>
                      <Ionicons
                        name={
                          this.state.activeEscrowId === 0
                            ? 'ellipse'
                            : 'ellipse-outline'
                        }
                        size={18}
                        color={colors.appViolet}
                      />

                      <Text style={{fontSize: 16, paddingStart: 10}}>
                        {t('terms.diposit')}{' '}
                        <Text style={{fontSize: 16, color: colors.appGreen}}>
                          {`${
                            this.state.PROPOSAL_DETAILS?.price_currency ===
                            'sar'
                              ? 'SR'
                              : 'USD'
                          } ${this.state.PROPOSAL_DETAILS?.price} `}
                        </Text>
                        {t('terms.forWholeProject')}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => this.setState({activeEscrowId: 1})}
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        marginVertical: 10,
                        alignItems: 'center',
                      }}>
                      <Ionicons
                        name={
                          this.state.activeEscrowId === 1
                            ? 'ellipse'
                            : 'ellipse-outline'
                        }
                        size={18}
                        color={colors.appViolet}
                      />
                      <Text style={{fontSize: 16, paddingStart: 10}}>
                        {t('terms.diposit')}{' '}
                        <Text style={{fontSize: 16, color: colors.appGreen}}>
                          {`${
                            this.state.PROPOSAL_DETAILS?.price_currency ===
                            'sar'
                              ? 'SR'
                              : 'USD'
                          } ${
                            this.state.PROPOSAL_DETAILS?.milestones?.[0]?.amount
                          } `}
                        </Text>
                        {t('terms.forFirstMilestone')}
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    disabled={true}
                    activeOpacity={0.5}
                    // onPress={() => this.setState({activeEscrowId: 1})}
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 10,
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name={'ellipse'}
                      size={18}
                      color={colors.appViolet}
                    />
                    <Text style={{fontSize: 16, paddingStart: 10}}>
                      {/* {t('terms.diposit')}{' '} */}
                      <Text style={{fontSize: 16, color: colors.appGreen}}>
                        {`${
                          this.state.PROPOSAL_DETAILS?.price_currency === 'sar'
                            ? 'SR'
                            : 'USD'
                        } ${
                          this.state.PROPOSAL_DETAILS?.milestones?.[0]?.amount
                        } `}
                      </Text>
                      {t('terms.amountInEscrow')}
                    </Text>
                  </TouchableOpacity>
                )}

                <View style={styles.attachmentContainer}>
                  <Text style={styles.attachmentText}>
                    {t('terms.addAttachment')}{' '}
                    <Text style={styles.addAttachmentOptionalText}>
                      {' '}
                      {t('terms.optional')}
                    </Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                      this.showActionSheet();
                    }}>
                    <Ionicons
                      name="add-outline"
                      size={25}
                      color={colors.defaultWhite}
                    />
                  </TouchableOpacity>
                </View>

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
                {/* <View style={{flexDirection: 'row', padding: 10}}>
                  {this.state.check ? (
                    <Ionicons
                      style={styles.icon}
                      name="ellipse"
                      size={25}
                      color={colors.appViolet}
                      onPress={() => this.setState({check: !this.state.check})}
                    />
                  ) : (
                    <Ionicons
                      style={styles.icon}
                      name="ellipse-outline"
                      size={25}
                      color={colors.appGray}
                      onPress={() => this.setState({check: !this.state.check})}
                    />
                  )}
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      fontFamily: fonts.secondary,
                      textAlign: 'left',
                    }}>
                    {' '}
                    {t('terms.terms1')}{' '}
                    <Text style={styles.underlineText}>
                      {t('terms.terms2')}
                    </Text>
                    ,{t('terms.terms3')}{' '}
                    <Text style={styles.underlineText}>
                      {t('terms.terms4')}
                    </Text>{' '}
                    {t('terms.terms5')}{' '}
                    <Text style={styles.underlineText}>
                      {t('terms.terms6')}
                    </Text>{' '}
                    .
                  </Text>
                </View> */}
                <View style={styles.footerButtonContainer}>
                  <CustomButton
                    title={`${t('terms.hire')} ${freelancerName}`}
                    handlePress={() => {
                      this.checkValidation();
                    }}
                  />
                </View>
                <ActionSheet
                  ref={(o) => (this.ActionSheet = o)}
                  title={t('terms.addAttachmentOption')}
                  options={[
                    t('terms.takePhoto'),
                    t('terms.fromGallery'),
                    t('terms.otherFile'),
                    t('terms.cancel'),
                  ]}
                  cancelButtonIndex={3}
                  onPress={(index) => {
                    this.onActionSheetItemPress(index);
                  }}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(withTranslation()(Contract));
