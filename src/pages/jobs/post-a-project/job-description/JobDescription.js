import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

import styles from './JobDescription.styles';
import colors from 'src/styles/texts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from 'src/components/header/Header';

class JobDescription extends Component {
  render() {
    const {jobType} = this.props.route.params;
    return (
      <>
        <Header
          title="Post a Project"
          backButton={true}
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          <Text style={styles.jobTypeText}>{jobType.name} </Text>
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor={colors.appGray}
          />

          <View style={styles.acceptButtonContainer}>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() =>
                this.props.navigation.navigate('ProjectAdd', {
                  subCategory: jobType,
                  jobCategoryName: this.props.route.params?.jobCategoryName,
                  jobCategoryId: this.props.route.params?.jobCategoryId,
                })
              }>
              <Text style={styles.acceptButtonText}>Accept</Text>
              <Ionicons
                name="checkmark-outline"
                size={25}
                color={colors.defaultWhite}
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

export default JobDescription;
