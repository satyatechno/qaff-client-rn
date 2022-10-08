import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import styles from './Budget.styles';
import Header from 'src/components/header/Header';
import RadioGroup from 'src/components/radio-group/RadioGroup';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from 'src/icon-configs/config.json';
import colors from 'src/styles/texts/colors';
import {withTranslation} from 'react-i18next';
const CustomIcon = createIconSetFromFontello(fontelloConfig);

class Budget extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedRadioButton: null,
      budget: [],
    };
  }

  componentDidMount() {
    this.setState({budget: this.props.route.params?.budgetData});
  }
  radioButtonSelect = (item) => {
    this.setState({
      selectedRadioButton: item,
    });
  };

  next = () => {
    this.state.selectedRadioButton === null
      ? alert(t('budget.pleaseSelect'))
      : this.props.route.params?.edit === true
      ? this.props.navigation.navigate('ProjectEdit', {
          budget: this.state.selectedRadioButton,
        })
      : this.props.navigation.navigate('ProjectAdd', {
          budget: this.state.selectedRadioButton,
        });
  };

  render() {
    let budgetData = this.state.budget;
    let modifiedBudgetData;
    this.props.route.params?.budgetType === 'sar'
      ? (modifiedBudgetData = budgetData.map((x) => ({
          id: x.id,
          name:
            x.sar.to === null
              ? `>${x.sar.from} SR`
              : x.sar.from === null
              ? `<${x.sar.to} SR`
              : `${x.sar.from}-${x.sar.to} SR`,
          // title: x.title,
        })))
      : (modifiedBudgetData = budgetData.map((x) => ({
          id: x.id,
          name:
            x.usd.to === null
              ? `>${x.usd.from} USD`
              : x.usd.from === null
              ? `<${x.usd.to} USD`
              : `${x.usd.from}-${x.usd.to} USD`,
          // title: x.title,
        })));
    const {t} = this.props;
    return (
      <>
        <Header
          title={t('budget.postAProject')}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        <ScrollView style={styles.container}>
          <Text style={styles.whatBudgetText}>{t('budget.whatBudgetQue')}</Text>
          <View style={{marginBottom: 100, marginHorizontal: 20}}>
            <RadioGroup
              data={modifiedBudgetData}
              onSelect={this.radioButtonSelect}
            />
          </View>
        </ScrollView>
        <View style={{position: 'absolute', bottom: 20, left: 20, right: 20}}>
          <TouchableOpacity style={styles.nextButton} onPress={this.next}>
            <Text style={styles.nextButtonText}>{t('budget.next')}</Text>
            <CustomIcon name="next" size={25} color={colors.defaultWhite} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

export default withTranslation()(Budget);
