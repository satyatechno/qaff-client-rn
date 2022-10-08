import React, {Component} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Header from 'src/components/header/Header';
import styles from './PasswordSecurity.styles';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from 'src/icon-configs/config.json';
import colors from 'src/styles/texts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import {fetchUserSettings, updateUserSettings} from 'src/services/http.service';
import {LOADER} from 'src/actions/action';
const CustomIcon = createIconSetFromFontello(fontelloConfig);
import Modal from 'react-native-modal';
import RadioGroup from 'src/components/radio-group/RadioGroup';
import {TextInput} from 'react-native-gesture-handler';
import i18n from 'src/locale/i18n';

class PasswordSecurity extends Component {
  state = {
    userSetting: [],
    isTwoStepOtpEnabled: false,
    isSecurityQuestionsEnabled: false,
    isModalVisible: false,
    securityQuestions: [],
    securityAnswer: '',
    selectedSecurityQuestion: '',
    showSecurityLoader: false,
  };
  componentDidMount() {
    this.onLoad();
  }
  onLoad = () => {
    fetchUserSettings(this.props?.token)
      .then((settings) => {
        this.setState({userSetting: settings?.data?.data?.settings});
        let twoStepOtp = this.state.userSetting?.filter(
          (setting) => setting.name === 'two_step_otp_text',
        );

        let twoStepSecurityQuestion = this.state.userSetting?.filter(
          (setting) => setting.name === 'two_step_security_question',
        );

        let securityQuestions = twoStepSecurityQuestion[0]?.options?.map(
          (x) => ({
            id: Math.random(),
            name: x,
          }),
        );

        // console.log('jj', JSON.stringify(securityQuestions, null, 2));
        this.setState({
          isTwoStepOtpEnabled: twoStepOtp[0].value,
          isSecurityQuestionsEnabled:
            twoStepSecurityQuestion[0].value?.is_enabled,
          securityQuestions: securityQuestions,
          selectedSecurityQuestion: twoStepSecurityQuestion[0].value?.question,
        });
      })
      .catch((err) => {
        console.error('Couldnot fetch settings', err);
      });
  };
  handleTwoStepOtp = (isEnabled) => {
    this.props.dispatch(LOADER(true));
    const userSetting = {
      setting_name: 'two_step_otp_text',
      value: !isEnabled,
    };

    updateUserSettings({setting: userSetting, token: this.props?.token})
      .then((res) => {
        this.setState({isTwoStepOtpEnabled: !isEnabled});
        this.props.dispatch(LOADER(false));
      })
      .catch((err) => {
        console.error('Couldnot update user setting', err);
        this.props.dispatch(LOADER(false));
      });
  };

  // disableSecurityQuestion = () => {
  //   this.props.dispatch(LOADER(true));

  //   const userSetting = {
  //     setting_name: 'two_step_security_question',
  //     value: {
  //       is_enabled: false,
  //       question: '',
  //       answer: '',
  //     },
  //   };
  //   updateUserSettings({setting: userSetting, token: this.props?.token})
  //     .then((res) => {
  //       this.props.dispatch(LOADER(false));
  //       this.setState({
  //         isSecurityQuestionsEnabled: false,
  //         isModalVisible: false,
  //       });
  //     })
  //     .catch((err) => {
  //       console.error('Couldnot disable security question', err);
  //       this.props.dispatch(LOADER(false));
  //     });
  // };

  // handleRadioSelect = (item) => {
  //   this.setState({selectedSecurityQuestion: item.name});
  // };

  // submitSecurityQuestion = () => {
  //   if (!this.state.selectedSecurityQuestion) {
  //     alert('Please select a question first');
  //   } else {
  //     this.setState({showSecurityLoader: true});
  //     const setting = {
  //       setting_name: 'two_step_security_question',
  //       value: {
  //         is_enabled: true,
  //         question: this.state.selectedSecurityQuestion,
  //         answer: this.state.securityAnswer,
  //       },
  //     };

  //     updateUserSettings({setting: setting, token: this.props?.token})
  //       .then((res) => {
  //         this.setState({
  //           isSecurityQuestionsEnabled: true,
  //           showSecurityLoader: false,
  //           isModalVisible: false,
  //         });
  //       })
  //       .catch((err) => {
  //         console.error('Couldnot submit security question', err);
  //         this.setState({
  //           isSecurityQuestionsEnabled: false,
  //           showSecurityLoader: false,
  //           isModalVisible: false,
  //         });
  //       });
  //   }
  // };
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.onLoad();
    }
  }
  render() {
    const {
      isTwoStepOtpEnabled,
      isSecurityQuestionsEnabled,
      isModalVisible,
      securityQuestions,
      showSecurityLoader,
      selectedSecurityQuestion,
    } = this.state;
    const {handleTwoStepOtp, handleRadioSelect} = this;
    const {loading} = this.props;
    return (
      <>
        <Header
          title={i18n.t('passwordAndSecurity.passwordAndSecurity')}
          backButton={true}
          navigation={this.props.navigation}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.container}>
            <View style={styles.card1}>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  padding: 10,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                }}>
                <CustomIcon
                  name="project"
                  color={colors.appGray}
                  size={15}
                  style={{marginEnd: 5}}
                />
                <Text style={styles.passwordText}>
                  {i18n.t('passwordAndSecurity.password')}{' '}
                </Text>
              </View>
              <View style={{flexDirection: 'row', padding: 10}}>
                <Ionicons
                  name="checkmark"
                  size={23}
                  color={colors.defaultWhite}
                  style={styles.checkIcon}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('UpdatePassword')
                  }
                  style={{flex: 1}}>
                  <Text style={styles.passwordSetText}>
                    {i18n.t('passwordAndSecurity.passwordHasBeenSet')}
                  </Text>
                  <Text style={styles.passwordDetailText}>
                    {i18n.t('passwordAndSecurity.chooseStrongPass')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card1}>
              <View
                style={{
                  padding: 10,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <CustomIcon
                    name="settings"
                    color={colors.appGray}
                    size={17}
                    style={{marginEnd: 5}}
                  />
                  <Text style={styles.passwordText}>
                    {i18n.t('passwordAndSecurity.twoStep')}
                  </Text>
                </View>
                <Text style={styles.passwordDetailText}>
                  {i18n.t('passwordAndSecurity.helpProjectText')}
                </Text>
              </View>

              {/* <View style={{ padding: 15, borderBottomColor: colors.appGray1, borderBottomWidth: 1 }}>
                                <Text style={styles.passwordSetText}>
                                    Authenticator verification
                                </Text>
                                <Text style={styles.passwordDetailText}>
                                    Enter a code provided by your authenticatio app along with your password.
                            </Text>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Enable</Text>
                                </TouchableOpacity>
                            </View> */}
              <View
                style={{
                  padding: 10,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <Text style={styles.passwordSetText}>
                  {i18n.t('passwordAndSecurity.message')}
                </Text>
                <Text style={styles.passwordDetailText}>
                  {i18n.t('passwordAndSecurity.receiveText')}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.button,
                    isTwoStepOtpEnabled && {backgroundColor: colors.appRed},
                  ]}
                  onPress={() => handleTwoStepOtp(isTwoStepOtpEnabled)}>
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.defaultWhite}
                    />
                  ) : (
                    <Text style={styles.buttonText}>
                      {isTwoStepOtpEnabled
                        ? i18n.t('passwordAndSecurity.disable')
                        : i18n.t('passwordAndSecurity.enable')}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  // this.setState({isModalVisible: true})
                  this.props.navigation.navigate('SecurityQuestion', {
                    question: this.state.selectedSecurityQuestion,
                    isEnabled: isSecurityQuestionsEnabled,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: 10,
                  }}>
                  <CustomIcon
                    name="project"
                    color={colors.appGray}
                    size={15}
                    style={{marginEnd: 5}}
                  />
                  <Text style={styles.passwordText}>
                    {i18n.t('passwordAndSecurity.securityQue')}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', padding: 10}}>
                  {isSecurityQuestionsEnabled ? (
                    <Ionicons
                      name="checkmark"
                      size={23}
                      color={colors.defaultWhite}
                      style={styles.checkIcon}
                    />
                  ) : (
                    <Ionicons
                      name="ellipse-outline"
                      size={23}
                      color={colors.skyBlue}
                      style={[
                        styles.checkIcon,
                        {backgroundColor: 'transparent'},
                      ]}
                    />
                  )}

                  <View style={{flex: 1}}>
                    <Text style={styles.passwordSetText}>
                      {isSecurityQuestionsEnabled
                        ? i18n.t('passwordAndSecurity.enabled')
                        : i18n.t('passwordAndSecurity.disabled')}
                    </Text>
                    <Text style={styles.passwordDetailText}>
                      {isSecurityQuestionsEnabled
                        ? selectedSecurityQuestion
                        : i18n.t('passwordAndSecurity.confirmText')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
      // <Modal
      //   style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
      //   isVisible={isModalVisible}
      //   animationIn="slideInUp"
      //   animationInTiming={300}
      //   animationOut="slideOutDown"
      //   animationOutTiming={300}
      //   hasBackdrop={true}
      //   backdropOpacity={0.2}
      //   onBackdropPress={() => this.setState({isModalVisible: false})}
      //   swipeDirection={['left', 'right']}
      //   onSwipeComplete={() => this.setState({isModalVisible: false})}>
      //   <View
      //     style={{
      //       //   justifyContent: 'center',
      //       //   alignItems: 'center',
      //       width: '100%',
      //       height: '85%',

      //       backgroundColor: colors.defaultWhite,
      //     }}>
      //     <TouchableOpacity
      //       style={{
      //         justifyContent: 'flex-end',
      //         padding: 10,
      //         backgroundColor: colors.skyBlue,
      //         margin: 10,
      //         borderRadius: 5,
      //       }}
      //       onPress={this.disableSecurityQuestion}>
      //       {loading ? (
      //         <ActivityIndicator size="small" color={colors.defaultWhite} />
      //       ) : (
      //         <Text
      //           style={{
      //             color: colors.defaultWhite,
      //             textAlign: 'center',

      //             fontSize: 16,
      //           }}>
      //           Disable Security Questions
      //         </Text>
      //       )}
      //     </TouchableOpacity>
      //     <ScrollView style={{paddingHorizontal: 10, maxHeight: '60%'}}>
      //       <RadioGroup
      //         data={securityQuestions}
      //         onSelect={handleRadioSelect}
      //       />
      //     </ScrollView>
      //     <Text
      //       style={{
      //         fontSize: 16,
      //         marginStart: 10,
      //         marginVertical: 10,
      //         marginTop: 10,
      //         color: colors.appGreen1,
      //       }}>
      //       Answer
      //     </Text>
      //     <KeyboardAvoidingView
      //       behavior={Platform.OS === 'android' ? 'height' : 'height'}>
      //       <TextInput
      //         style={{
      //           borderWidth: 1,
      //           borderColor: colors.skyBlue,
      //           borderRadius: 10,
      //           marginHorizontal: 10,
      //           height: 40,
      //         }}
      //         onChangeText={(text) => this.setState({securityAnswer: text})}
      //       />
      //     </KeyboardAvoidingView>
      //     <TouchableOpacity
      //       onPress={this.submitSecurityQuestion}
      //       style={{
      //         backgroundColor: colors.skyBlue,
      //         marginHorizontal: 10,
      //         borderRadius: 10,
      //         padding: 10,
      //         justifyContent: 'center',
      //         marginTop: 30,
      //       }}>
      //       {showSecurityLoader ? (
      //         <ActivityIndicator size="small" color={colors.defaultWhite} />
      //       ) : (
      //         <Text
      //           style={{
      //             textAlign: 'center',
      //             color: colors.defaultWhite,
      //             fontSize: 16,
      //           }}>
      //           Submit Answer
      //         </Text>
      //       )}
      //     </TouchableOpacity>
      //   </View>
      // </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(PasswordSecurity);
