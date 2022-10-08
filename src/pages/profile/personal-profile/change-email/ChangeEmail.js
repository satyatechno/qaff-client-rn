import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Header from 'src/components/header/Header';
import styles from './ChangeEmail.styles';
import CustomButton from 'src/components/custom-button/CustomButton';
import {fetchCountriesList, sendOtp} from 'src/services/http.service';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import CountryPicker from 'react-native-country-picker-modal';
import ErrorText from 'src/components/error-text/ErrorText';
import * as RNLocalize from 'react-native-localize';
import i18n from 'src/locale/i18n';

class ChangeEmail extends Component {
  constructor(props) {
    super();
    this.state = {
      inputValue: '',
      country: {name: '', callingCode: ['']},
      cca2: 'US',
      showCountryPicker: false,
      phoneNo: '',
      emailError: '',
      phoneError: '',
    };
  }

  componentDidMount() {
    this.setState({cca2: RNLocalize.getCountry()});
    fetchCountriesList({search: ''})
      .then((countries) => {
        countries.data.data.country_list?.map((data, i) => {
          if (RNLocalize?.getCountry() === data?.iso) {
            console.log('data', data);
            this.setState({
              country: {name: data?.name, callingCode: [data?.phonecode]},
            });
          }
        });
      })
      .catch((err) => {
        console.error('Couldnot get countries list', err);
      });
  }

  checkValidation = () => {
    const {country, phoneNo, inputValue} = this.state;
    console.log('ccc', country);
    if (this.props.route?.params?.type === 'email') {
      let emreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let check = emreg.test(inputValue.toLowerCase());
      if (inputValue === '')
        this.setState({emailError: i18n.t('changeEmail.emailRequired')});
      else if (check === false)
        this.setState({emailError: i18n.t('changeEmail.invailidEmail')});
      else {
        this.setState({emailError: ''});
        this.onNext();
      }
    } else {
      if (phoneNo === '')
        this.setState({phoneError: i18n.t('changeEmail.mobileRequired')});
      else if (phoneNo.length < 9 || phoneNo.length > 11)
        this.setState({phoneError: i18n.t('changeEmail.invailidMobile')});
      else {
        this.setState({phoneError: ''});
        this.onNext();
      }
    }
  };
  onNext = () => {
    const {country, phoneNo, inputValue} = this.state;
    let verify = '';
    this.props.route?.params?.type === 'email'
      ? (verify = inputValue)
      : (verify = country.callingCode[0] + ' ' + phoneNo);
    this.props.dispatch(LOADER(true));
    sendOtp({
      token: this.props.token,
      data: {
        otp_type:
          this.props.route?.params?.type === 'email'
            ? 'email_verification'
            : 'mobile_verification',
        verify: verify,
      },
    })
      .then((res) => {
        this.props.dispatch(LOADER(false));
        this.props.navigation.navigate('OtpVerification', {
          verify: verify,
          type: this.props.route?.params?.type,
        });
      })
      .catch((err) => {
        this.props.dispatch(LOADER(false));
        console.log('error on send otp', err?.response?.data);
        if (err?.response?.data) {
          if (this.props.route?.params?.type === 'email') {
            this.setState({emailError: err.response.data.message});
          } else if (this.props.route?.params?.type === 'mobile') {
            this.setState({phoneError: err.response.data.message});
          } else {
            this.setState({emailError: '', phoneError: ''});
          }
        }
      });
  };
  render() {
    const {
      showCountryPicker,
      cca2,
      country,
      phoneNo,
      emailError,
      phoneError,
    } = this.state;
    console.log('object', country);
    return (
      <>
        <Header
          backButton={true}
          navigation={this.props.navigation}
          title={i18n.t('changeEmail.editProfile')}
          notificationButton={true}
        />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Text style={styles.headng}>
              Update Your{' '}
              {this.props.route?.params?.type === 'email'
                ? i18n.t('changeEmail.emailAddress')
                : i18n.t('changeEmail.mobileNo')}
            </Text>
            <View style={styles.inputContainer}>
              <>
                <Text style={styles.label}>
                  Enter New{' '}
                  {this.props.route?.params?.type === 'email'
                    ? i18n.t('changeEmail.email')
                    : i18n.t('changeEmail.mobileNo')}
                </Text>
                {this.props.route?.params?.type === 'email' ? (
                  <View>
                    <TextInput
                      value={this.state.inputValue}
                      onChangeText={(text) => {
                        this.setState({inputValue: text});
                      }}
                      style={styles.input}
                      keyboardType={
                        this.props.route?.params?.type === 'email'
                          ? 'email-address'
                          : 'number-pad'
                      }
                    />
                    {emailError.length > 0 && <ErrorText name={emailError} />}
                  </View>
                ) : (
                  <View>
                    <View style={[styles.phoneContainer]}>
                      <View style={styles.countryPicker}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({showCountryPicker: true})
                          }>
                          <CountryPicker
                            countryCode={cca2}
                            onSelect={(value) => {
                              this.setState({
                                country: value,
                                cca2: value.cca2,
                              });
                            }}
                            cca2={cca2}
                            withFlagButton={true}
                            withCallingCodeButton={true}
                            withFilter={true}
                            withAlphaFilter={true}
                            visible={showCountryPicker}
                            onClose={() =>
                              this.setState({showCountryPicker: false})
                            }
                          />
                        </TouchableOpacity>
                      </View>
                      <TextInput
                        value={phoneNo}
                        onChangeText={(text) => this.setState({phoneNo: text})}
                        style={styles.phoneInput}
                        placeholder={'Mobile Number'}
                        keyboardType="number-pad"
                        returnKeyType="done"
                      />
                    </View>
                    {phoneError.length > 0 && <ErrorText name={phoneError} />}
                  </View>
                )}
              </>
            </View>
            <View style={{position: 'absolute', bottom: 10, width: '100%'}}>
              <CustomButton
                title={i18n.t('changeEmail.next')}
                handlePress={this.checkValidation}
                isLoading={this.props.loading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.myReducer.user?.token,
  loading: state.myReducer?.loading,
});
export default connect(mapStateToProps)(ChangeEmail);
