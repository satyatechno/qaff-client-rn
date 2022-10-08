import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Text, ScrollView, View } from 'react-native';
import Header from 'src/components/header/Header';
import styles from './Description.styles';

class Description extends Component {
  constructor(props) {
    super();
  }

  render() {
    const { title, time, description } = this.props.route.params;
    const { t } = this.props
    return (
      <>
        <Header title={t("description.description")} backButton={true} navigation={this.props.navigation} notificationButton={true} />
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>{t("description.posted") + " " + time} </Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
          {/* <View style={styles.freelancerContainer}>
          <Text style={styles.freelancerText}>No. of freelancer applied</Text>
          <Text style={styles.freelancerNo}>12</Text>
        </View> */}
        </ScrollView>
      </>
    );
  }
}

export default withTranslation()(Description);
