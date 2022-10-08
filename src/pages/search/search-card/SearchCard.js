import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './SearchCard.styles';

const SearchCard = ({item, index, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Categories', {name: item.name, id: item.id})
      }>
      <View style={styles.imageView}>
        <FastImage
          source={{uri: item.image}}
          style={{height: null, width: null, flex: 1}}
          defaultSource={require('src/assets/images/imagePlaceHolder.png')}
        />
      </View>
      {/* <View style={styles.textView}>
           </View> */}
      <Text style={styles.textStyle}>{item.name}</Text>
    </TouchableOpacity>
  );
};
export default SearchCard;
