import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import CustomButton from 'src/components/custom-button/CustomButton';
import Header from 'src/components/header/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {updateUserSettings} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './SecurityQuestion.styles';
import i18n from 'src/locale/i18n';
class SecurityQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      disableLoading: false,
      ckeckBox: false,
    };
  }
  disableSecurityQuestion = () => {
    this.setState({disableLoading: true});

    const userSetting = {
      setting_name: 'two_step_security_question',
      value: {
        is_enabled: false,
        question: '',
        answer: '',
      },
    };
    updateUserSettings({setting: userSetting, token: this.props?.token})
      .then((res) => {
        this.setState({disableLoading: false});
        this.props.navigation.navigate('PasswordSecurity', {
          twoStepSecurityQuestionEnable: false,
        });
      })
      .catch((err) => {
        console.error('Couldnot disable security question', err);
        this.setState({disableLoading: false});
      });
  };
  submitSecurityQuestion = () => {
    if (!this.props.route?.params?.question && this.state.answer === '') {
      alert(i18n.t('securityQue.pleaseSelectQue'));
    } else if (!this.state.answer && this.props.route?.params?.question) {
      alert(i18n.t('securityQue.provideAns'));
    } else {
      this.props.dispatch(LOADER(true));
      const setting = {
        setting_name: 'two_step_security_question',
        value: {
          is_enabled: true,
          question: this.props.route?.params?.question,
          answer: this.state.answer,
        },
      };

      updateUserSettings({setting: setting, token: this.props?.token})
        .then((res) => {
          this.props.dispatch(LOADER(false));
          this.props.navigation.navigate('PasswordSecurity', {
            twoStepSecurityQuestionEnable: true,
          });
        })
        .catch((err) => {
          console.error('Couldnot submit security question', err);
          this.props.dispatch(LOADER(false));
        });
    }
  };

  render() {
    return (
      <>
        <Header
          title={i18n.t('securityQue.securityQue')}
          backButton={true}
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ShowSecurityQuestion');
            }}
            style={styles.questionContainer}>
            <Text
              style={{
                color: colors.appBlack,
                fontSize: 16,
                flex: 1,
              }}>
              {this.props.route?.params?.question
                ? this.props.route?.params?.question
                : i18n.t('securityQue.selectQue')}
            </Text>
            <Icon name="chevron-forward" color={colors.skyBlue} size={25} />
          </TouchableOpacity>
          <Text style={styles.label}>{i18n.t('securityQue.answer')}</Text>
          <TextInput
            style={styles.input}
            value={this.state.answer}
            onChangeText={(text) => this.setState({answer: text})}
            isClass={true}
            editable={this.props.route?.params?.question?.length > 0}
          />
          <View
            style={{flexDirection: 'row', padding: 10, paddingHorizontal: 10}}>
            {this.state.ckeckBox === false ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ckeckBox: !this.state.ckeckBox});
                }}>
                <Icon name="square-outline" color={colors.appGray} size={22} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ckeckBox: !this.state.ckeckBox});
                }}>
                <Icon
                  name={'checkmark-outline'}
                  color={colors.defaultWhite}
                  size={15}
                  style={{
                    backgroundColor: colors.skyBlue,
                    height: 18,
                    width: 18,
                    borderRadius: 2,
                    padding: 1,
                    margin: 2,
                  }}
                />
              </TouchableOpacity>
            )}
            <Text
              style={{
                color: colors.appGray,
                paddingStart: 10,
                flex: 1,
                textAlignVertical: 'center',
              }}>
              {i18n.t('securityQue.iUnderstand')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              // left: 9,
              bottom: 0,
            }}>
            {this.props.route?.params?.isEnabled && (
              <View style={{width: '50%'}}>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: colors.appRed}]}
                  onPress={this.disableSecurityQuestion}>
                  {this.state.disableLoading ? (
                    <ActivityIndicator size={20} color={colors.defaultWhite} />
                  ) : (
                    <Text style={styles.buttonText}>
                      {i18n.t('securityQue.disable')}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                width: this.props.route?.params?.isEnabled ? '50%' : '100%',
              }}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.skyBlue}]}
                onPress={() => {
                  if (this.state.ckeckBox) {
                    this.submitSecurityQuestion();
                  } else {
                    alert(i18n.t('securityQue.acceptTerms'));
                  }
                }}>
                {this.props.loading ? (
                  <ActivityIndicator size={20} color={colors.defaultWhite} />
                ) : (
                  <Text style={styles.buttonText}>
                    {i18n.t('securityQue.save')}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
  token: state.myReducer.user?.token,
});
export default connect(mapStateToProps)(SecurityQuestion);
