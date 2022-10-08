import React, {Component} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import styles from './JobType.styles';
import Header from 'src/components/header/Header';
import RadioGroup from 'src/components/radio-group/RadioGroup';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from 'src/icon-configs/config.json';
import colors from 'src/styles/texts/colors';
const CustomIcon = createIconSetFromFontello(fontelloConfig);
import {jobSubCategory} from 'src/services/http.service';
import {withTranslation} from 'react-i18next';

class JobType extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedRadioButton: null,
      SUB_CATEGORY: [],
      isLoading: true,
    };
  }

  onRadioButtonSelect = (item) => {
    this.setState({selectedRadioButton: item});
  };

  componentDidMount() {
    // console.log('id', this.props.route.params?.categoryId);
    jobSubCategory(this.props.route.params?.categoryId)
      .then((response) => {
        this.setState({isLoading: false});
        // console.log('JOB_SUB_CATEGORY', response.data.data.sub_categories.data);
        this.setState({SUB_CATEGORY: response.data.data.sub_categories.data});
      })
      .catch((error) => {
        // if (error.response.data) {
        //   console.log(error.response.data);
        // } else {
        //   console.log(error);
        // }
        console.log(error);
      });
  }

  next = () => {
    if (this.state.selectedRadioButton === null) {
      alert(t('jobType.pleaseSelect'));
    } else {
      this.props.route.params?.edit === true
        ? this.props.navigation.navigate('ProjectEdit', {
            subCategory: this.state.selectedRadioButton,
            jobCategoryName: this.props.route.params?.categoryName,
            jobCategoryId: this.props.route.params?.categoryId,
          })
        : this.props.navigation.navigate('ProjectAdd', {
            subCategory: this.state.selectedRadioButton,
            jobCategoryName: this.props.route.params?.categoryName,
            jobCategoryId: this.props.route.params?.categoryId,
          });
    }
  };
  render() {
    // console.log('rd', this.state.selectedRadioButton);
    const {t} = this.props;
    return (
      <>
        <Header
          title={t('jobType.postAProject')}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        {this.state.isLoading ? (
          <ActivityIndicator
            color={colors.skyBlue}
            size="large"
            style={{flex: 1}}
          />
        ) : (
          <View style={styles.container}>
            <Text style={styles.selectJobText}>
              {t('jobType.selectJobCategory')}
            </Text>
            <ScrollView
              style={{marginBottom: 20}}
              showsVerticalScrollIndicator={false}>
              <RadioGroup
                onSelect={this.onRadioButtonSelect}
                data={this.state.SUB_CATEGORY}
              />
            </ScrollView>
            <TouchableOpacity style={styles.nextButton} onPress={this.next}>
              <Text style={styles.nextButtonText}>{t('jobType.next')}</Text>
              <CustomIcon name="next" size={25} color={colors.defaultWhite} />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }
}

export default withTranslation()(JobType);
