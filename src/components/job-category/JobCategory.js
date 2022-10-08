import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './JobCategory.styles';
import FastImage from 'react-native-fast-image';

const JobCategory = ({imgUrl, txt, onPress, id, edit}) => {
  return (
    <View style={styles.container}>
      <View style={styles.jobInfoContainer}>
        <TouchableOpacity
          onPress={() =>
            onPress.navigate('JobType', {
              categoryId: id,
              categoryName: txt,
              edit: edit,
            })
          }>
          <FastImage style={styles.jobInfoImage} source={{uri: imgUrl}} />
          <Text style={styles.jobInfoText}>{txt}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobCategory;
