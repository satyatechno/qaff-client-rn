import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './RadioGroup.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'src/styles/texts/colors';

const RadioGroup = ({data, onSelect, id}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <View style={styles.container}>
      {data.map((data, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setSelectedIndex(data.id);
              onSelect(data, id);
            }}>
            <View key={data.id} style={[styles.radioButtonContainer, i===data?.length
            && {marginBottom: 30} ]}>
              <Text
                style={
                  selectedIndex === data.id
                    ? styles.selectedText
                    : styles.defaultText
                }>
                {data.name}
              </Text>

              {selectedIndex === data.id ? (
                <Ionicons
                  style={styles.icon}
                  name="ellipse"
                  size={25}
                  color={colors.appViolet}
                />
              ) : (
                <Ionicons
                  style={styles.icon}
                  name="ellipse-outline"
                  size={25}
                  color={colors.appGray}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

RadioGroup.propTypes = {
  //   data: PropTypes.string.isRequired,
};

export default RadioGroup;
