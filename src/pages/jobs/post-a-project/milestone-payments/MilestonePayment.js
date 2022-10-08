import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './MilestonePayment.styles';
import Header from 'src/components/header/Header';
import RadioGroup from 'src/components/radio-group/RadioGroup';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from 'src/icon-configs/config.json';
import colors from 'src/styles/texts/colors';
import {withTranslation} from 'react-i18next';
const CustomIcon = createIconSetFromFontello(fontelloConfig);

class MilestonePayment extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedRadioButton: null,
    };
  }

  radioButtonSelect = (item) => {
    this.setState({
      selectedRadioButton: item,
    });
  };

  next = () => {
    this.state.selectedRadioButton === null
      ? alert(t('milestonePayments.pleaseSelect'))
      : this.props.route.params?.edit === true
      ? this.props.navigation.navigate('ProjectEdit', {
          milestone: this.state.selectedRadioButton,
        })
      : this.props.navigation.navigate('ProjectAdd', {
          milestone: this.state.selectedRadioButton,
        });
  };

  render() {
    let milestone = this.props.route.params?.milestonePayment.map((x) => ({
      id: x.id,
      name: x.title,
    }));
    const {t} = this.props;
    return (
      <>
        <Header
          title={t('milestonePayments.pleaseSelect')}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        <View style={styles.container}>
          <Text style={styles.milestoneText}>
            {' '}
            {t('milestonePayments.milestonePayments')}{' '}
          </Text>
          <RadioGroup data={milestone} onSelect={this.radioButtonSelect} />
          <TouchableOpacity style={styles.nextButton} onPress={this.next}>
            <Text style={styles.nextButtonText}>
              {t('milestonePayments.next')}
            </Text>
            <CustomIcon name="next" size={25} color={colors.defaultWhite} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

export default withTranslation()(MilestonePayment);
