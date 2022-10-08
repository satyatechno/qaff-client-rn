import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './Timeline.styles';
import Header from 'src/components/header/Header';
import RadioGroup from 'src/components/radio-group/RadioGroup';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from 'src/icon-configs/config.json';
import colors from 'src/styles/texts/colors';
import {withTranslation} from 'react-i18next';
const CustomIcon = createIconSetFromFontello(fontelloConfig);

// const TIMElINE_DUMMY = [
//   {
//     id: 1,
//     data: 'Less than one month',
//   },
//   {
//     id: 2,
//     data: '1-3 months',
//   },
//   {
//     id: 3,
//     data: '3-6 months',
//   },
//   {
//     id: 4,
//     data: 'More than 6 months',
//   },
// ];

class Timeline extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedRadioButton: null,
    };
  }

  radioButtonSelect = (item) => {
    this.setState({selectedRadioButton: item});
  };

  next = () => {
    this.state.selectedRadioButton === null
      ? alert(t('timeline.pleaseSelect'))
      : this.props.route.params?.edit === true
      ? this.props.navigation.navigate('ProjectEdit', {
          timeline: this.state.selectedRadioButton,
        })
      : this.props.navigation.navigate('ProjectAdd', {
          timeline: this.state.selectedRadioButton,
        });
  };
  render() {
    let timeline = this.props.route.params?.timelineData.map((x) => ({
      id: x.id,
      name: x.title,
    }));
    const {t} = this.props;
    return (
      <>
        <Header
          title={t('timeline.pleaseSelect')}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        <View style={styles.container}>
          <Text style={styles.timelineText}> {t('timeline.timeline')} </Text>
          <RadioGroup data={timeline} onSelect={this.radioButtonSelect} />
          <TouchableOpacity style={styles.nextButton} onPress={this.next}>
            <Text style={styles.nextButtonText}>{t('timeline.next')}</Text>
            <CustomIcon name="next" size={25} color={colors.defaultWhite} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

export default withTranslation()(Timeline);
