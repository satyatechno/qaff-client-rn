import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import styles from './JobTitle.styles';
import Header from 'src/components/header/Header';
import JobCategory from 'src/components/job-category/JobCategory';
import { jobCategory } from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import { withTranslation } from 'react-i18next';

class JobTitle extends Component {
  constructor(props) {
    super();
    this.state = {
      JOB_CATEGORY: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    jobCategory()
      .then((response) => {
        this.setState({ isLoading: false });
        console.log('JOB_CATEGORY111', response.data.data.categories.data);

        this.setState({ JOB_CATEGORY: response.data.data.categories.data });
      })
      .catch((error) => {
        // if (error.response.data) {
        //   console.log('errMessage', error.response.data.message);

        //   console.log('Errors=====', error.response.data.errors);
        // } else {
        //   console.log('Error', error);
        // }
        console.log(error);
      });
  }
  render() {
    const { t } = this.props
    return (
      <>
        <Header
          title={t("jobTitle.postAProject")}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
          searchButton={true}
        />
        {this.state.isLoading === true ? (
          <ActivityIndicator
            color={colors.skyBlue}
            size="large"
            style={{ flex: 1 }}
          />
        ) : (
            <ScrollView style={styles.container}>
              <Text style={styles.jobTitleText}> {t("jobTitle.selectJobCategory")} </Text>
              <View style={styles.jobInfoRow}>
                {this.state.JOB_CATEGORY.map((item, i) => {
                  return (
                    <JobCategory
                      key={i}
                      id={item.id}
                      imgUrl={item.image}
                      txt={item.name}
                      onPress={this.props.navigation}
                      edit={this.props.route.params?.edit}
                    />
                  );
                })}
              </View>
            </ScrollView>
          )}
      </>
    );
  }
}

export default withTranslation()(JobTitle);
