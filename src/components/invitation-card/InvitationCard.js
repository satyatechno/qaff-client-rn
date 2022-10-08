import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const InvitationCard = ({data, navigation}) => {
  //   console.log('Invitation Card', JSON.stringify(data, null, 2));
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          {data?.freelancer?.profile_image ? (
            <FastImage
              style={styles.image}
              source={{
                uri: data?.freelancer?.profile_image,
              }}
            />
          ) : (
            <FastImage
              style={styles.image}
              source={
                data?.freelancer?.gender === 'male' || ''
                  ? require('src/assets/images/menAvatar.png')
                  : require('src/assets/images/femaleAvatar.png')
              }
            />
          )}
        </View>
        <View style={styles.headerRight}>
          <View style={styles.headerRightTop}>
            <Text style={styles.freelancerName}>
              {`${data?.freelancer?.first_name} ${data?.freelancer?.last_name}`}
            </Text>
            <Text>
              {data?.freelancer?.hourly_rate?.amount > 0 ? (
                <Text style={styles.freelancerRate}>
                  {data?.freelancer?.hourly_rate?.currency === 'sar'
                    ? 'SR '
                    : 'USD '}
                  {data?.freelancer?.hourly_rate?.amount}
                </Text>
              ) : null}
            </Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data?.freelancer?.skills?.map((category, index) => (
              <Text style={styles.categoryName} key={index}>
                {index === data?.freelancer?.skills?.length - 1
                  ? category
                  : `${category},`}
              </Text>
            ))}
          </ScrollView>
          {data?.freelancer?.country?.length > 0 && (
            <Text style={styles.countryText}>{data?.freelancer?.country}</Text>
          )}
          {/* {data?.created_at && (
            <Text style={styles.createdAt}>
              {moment.unix(data?.created_at).fromNow()}
            </Text>
          )} */}
        </View>
      </View>
      {data?.decline_reason && (
        <>
          <View
            style={{borderBottomWidth: 1, borderBottomColor: colors.appGray1}}
          />
          <View style={styles.cardBody}>
            <Text numberOfLines={4} style={styles.body}>
              {data?.decline_reason}
            </Text>
          </View>
        </>
      )}
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
            navigation.navigate('ViewProfile', {
              id: data?.freelancer?.id,
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
              View Profile
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

export default InvitationCard;
