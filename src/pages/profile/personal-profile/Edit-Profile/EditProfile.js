import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Header from 'src/components/header/Header';
import styles from './EditProfile.sytles';
import CustomButton from 'src/components/custom-button/CustomButton';
import DatePicker from 'react-native-date-picker';
import {withTranslation} from 'react-i18next';
import moment from 'moment';

export class EditProfile extends Component {
  constructor(props) {
    super();
    this.state = {
      inputValue: '',
      birthday: moment().subtract(18, 'years').toDate(),
    };
  }
  componentDidMount() {
    this.setState({
      inputValue: this.props.route.params?.first_name
        ? this.props.route.params?.first_name
        : this.props.route.params?.last_name
        ? this.props.route.params?.last_name
        : this.props.route.params?.location
        ? this.props.route.params?.location
        : '',
      birthday: this.props.route.params?.birthday
        ? moment(this.props.route.params?.birthday, 'DD-MM-YYYY').toDate()
        : moment().subtract(18, 'years').toDate(),
    });
  }

  onNext = () => {
    if (this.props.route.params?.first_name) {
      this.props.navigation.navigate('PersonalProfile', {
        first_name: this.state.inputValue,
      });
    } else if (this.props.route.params?.last_name) {
      this.props.navigation.navigate('PersonalProfile', {
        last_name: this.state.inputValue,
      });
    } else if (this.props.route.params?.location) {
      this.props.navigation.navigate('PersonalProfile', {
        location: this.state.inputValue,
      });
    } else if (this.props.route.params?.birthday) {
      this.props.navigation.navigate('PersonalProfile', {
        birthday: this.state.inputValue,
      });
    }
  };
  render() {
    const {t} = this.props;
    return (
      <>
        <Header
          backButton={true}
          navigation={this.props.navigation}
          title={t('editProfile.editProfile')}
          notificationButton={true}
        />
        {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'android' ? 'height' : 'padding'}> */}
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            {this.props.route.params?.birthday ? (
              <>
                <Text style={styles.label}>
                  {t('editProfile.selectBirthday')}{' '}
                </Text>
                <View style={{padding: 30}}>
                  <DatePicker
                    date={this.state.birthday}
                    maximumDate={moment().subtract(18, 'years').toDate()}
                    onDateChange={(date) => {
                      this.setState({
                        birthday: date,
                        inputValue: `${date.getDate()}-${
                          date.getMonth() + 1
                        }-${date.getFullYear()}`,
                      });
                    }}
                    mode={'date'}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.label}>
                  Enter{' '}
                  {this.props.route.params?.first_name
                    ? t('editProfile.firstName')
                    : this.props.route.params?.last_name &&
                      t('editProfile.lastName')}
                </Text>
                <TextInput
                  value={this.state.inputValue}
                  onChangeText={(text) => {
                    this.setState({inputValue: text});
                  }}
                  style={styles.input}
                  keyboardType="default"
                />
              </>
            )}
          </View>

          <CustomButton
            title={t('editProfile.next')}
            handlePress={this.onNext}
          />
        </View>
        {/* </KeyboardAvoidingView> */}
      </>
    );
  }
}

export default withTranslation()(EditProfile);
