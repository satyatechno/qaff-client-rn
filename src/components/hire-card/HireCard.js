import moment from 'moment';
import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import FastImage from 'react-native-fast-image';

const HireCard = ({data, navigation}) => {
  console.log('Hire Card', JSON.stringify(data, null, 2));
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <FastImage
            style={styles.image}
            source={{
              uri: data?.freelancer?.profile_image,
            }}
            defaultSource={require('src/assets/images/imagePlaceHolder.png')}
          />
        </View>
        <View style={styles.headerRight}>
          <View style={styles.headerRightTop}>
            <Text style={styles.freelancerName}>
              {`${data?.freelancer?.first_name} ${data?.freelancer?.last_name}`}{' '}
            </Text>
            <Text>
              {data?.amount !== '' ? (
                <Text style={styles.freelancerRate}>
                  {/* {item.hourly_rate.currency === 'sar' ? 'SR ' : 'USD '} */}
                  {data?.currency === 'sar' ? 'SAR' : data?.currency}{' '}
                  {data?.amount}
                </Text>
              ) : null}
            </Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data?.freelancer?.categories?.map((category, index) => (
              <Text style={styles.categoryName} key={category?.id}>
                {index === data?.freelancer?.categories?.length - 1
                  ? category?.name
                  : `${category?.name},`}
              </Text>
            ))}
          </ScrollView>
          {data?.freelancer?.country?.length > 0 && (
            <Text style={styles.countryText}>{data?.freelancer?.country}</Text>
          )}
          {data?.created_at && (
            <Text style={styles.createdAt}>
              {moment.unix(data?.created_at).fromNow()}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{borderBottomWidth: 1, borderBottomColor: colors.appGray1}}
      />
      <View style={styles.cardBody}>
        <Text numberOfLines={4} style={styles.body}>
          {data?.work_details}
        </Text>
      </View>
      <View
        style={{borderBottomWidth: 1, borderBottomColor: colors.appGray1}}
      />
      <View style={styles.cardFooter}>
        <Pressable
          onPress={() =>
            navigation.navigate('FirebaseChat', {
              uid: data?.freelancer?.firebase_user_id,
              userName: `${data?.freelancer?.first_name} ${data?.freelancer?.last_name}`,
              userPhoto: data?.freelancer?.profile_image,
            })
         
          }
          style={({pressed}) => [
            {
              backgroundColor: pressed ? colors.skyBlue : 'white',
            },
            styles.messageButton,
          ]}>
          {({pressed}) => (
            <Text
              style={[
                styles.messageButtonText,
                {color: pressed ? colors.defaultWhite : colors.skyBlue},
              ]}>
              Message
            </Text>
          )}
        </Pressable>
        <Text
          style={{
            borderRightWidth: 1,
            borderRightColor: colors.appGray1,
          }}></Text>
        <Pressable
          onPress={() =>
            navigation.navigate('ContractDetails', {
              contractId: data?.id,
            })
          }
          style={({pressed}) => [
            {
              backgroundColor: pressed ? colors.appViolet : colors.defaultWhite,
            },
            styles.contractButton,
          ]}>
          {({pressed}) => (
            <Text
              style={[
                styles.contractText,
                {color: pressed ? colors.defaultWhite : colors.appViolet},
              ]}>
              View Contract
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 10,
  },
  cardBody: {
    paddingHorizontal: 10,
    minHeight: 60,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
  },
  headerLeft: {
    marginEnd: 10,
    alignSelf: 'auto',
  },
  headerRight: {
    flex: 1,
  },
  headerRightTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  freelancerRate: {
    fontSize: 16,
    color: colors.appViolet,
    textAlign: 'left',
  },
  freelancerName: {
    fontSize: 16,
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    textAlign: 'left',
  },
  categoryName: {
    fontSize: 13,
    fontFamily: fonts.primarySB,
    color: colors.appGreen,
    textAlign: 'left',
  },
  countryText: {
    fontSize: 13,
    color: colors.appBlack,
  },
  createdAt: {
    fontSize: 12,
    color: colors.appGray,
  },
  body: {
    fontSize: 16,
    color: colors.appBlack,
    padding: 10,
    flex: 1,
  },
  messageButton: {
    flex: 0.5,
    paddingVertical: 10,
    // paddingStart: 10,
  },
  messageButtonText: {
    color: colors.skyBlue,
    textAlign: 'center',
  },
  contractButton: {
    flex: 0.5,
    paddingVertical: 10,
    // paddingStart: 10,
  },
  contractText: {
    color: colors.appViolet,
    textAlign: 'center',
  },
});

export default HireCard;
