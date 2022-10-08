import React from 'react';
import {View, Text} from 'react-native';
import styles from './CategoriesCard.styles';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from 'src/icon-configs/config.json';
import colors from 'src/styles/texts/colors';
import moment from 'moment';
import Divider from 'src/components/divider/Divider';
const CustomIcon = createIconSetFromFontello(fontelloConfig);

const CategoriesCard = ({item, index, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.headingText}>{item.title}</Text>
          <Text style={styles.budgetText}>
            {
              // item.currency == 'sar'
              //   ?
              item.budget?.sar.to === null
                ? `>${item.budget?.sar.from} SR`
                : item.budget?.sar.from === null
                ? `<${item.budget?.sar.to} SR`
                : `${item.budget?.sar.from}-${item.budget?.sar.to} SR`
              // : item.budget?.usd?.to === null
              //   ? `>${item.budget?.usd?.from} USD`
              //   : item.budget?.usd?.from === null
              //     ? `<${item.budget?.usd?.to} USD`
              //     : `${item.budget?.usd?.from}-${item.budget?.usd?.to} USD`
            }{' '}
          </Text>
        </View>
        <View style={styles.experience}>
          {/* <Text style={styles.experienceText}>Experience Level: Expert</Text> */}
          <Text style={styles.experienceText}>{item?.category?.name}</Text>
          <Text style={styles.timeText}>
            {moment.unix(item.published_at).fromNow()}
          </Text>
        </View>
        <Text style={styles.nameText}>{item.posted_by.name}</Text>
        <View>
          {/* <View style={styles.locationView}>
     <CustomIcon
                name="location"
                color={colors.appBlue}
                size={14}
                style={{marginTop:2}}
              />
     <Text style={styles.locationText}>{item.location}</Text>
     </View> */}
        </View>
      </View>
      <Divider style={{height: 1, backgroundColor: colors.appGray1}} />
      <View style={styles.body}>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};
export default CategoriesCard;
