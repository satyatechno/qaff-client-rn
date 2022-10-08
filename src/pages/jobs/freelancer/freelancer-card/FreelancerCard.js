import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import {Rating} from 'react-native-ratings';
import Carousel from 'react-native-snap-carousel';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Divider from 'src/components/divider/Divider';
import PagingComonent from 'src/components/pagingComponent/PagingComponent';
import fontelloConfig from 'src/icon-configs/config.json';
import colors from 'src/styles/texts/colors';
import styles from './FreelancerCard.styles';
const CustomIcon = createIconSetFromFontello(fontelloConfig);
const SLIDER_WIDTH = Dimensions.get('window').width;

const FreelacerCard = ({
  item,
  index,
  imagePress,
  addContact,
  navigation,
  removeContact,
  addContactLoading,
  contactId,
  removeContactLoading,
  job,
}) => {
  const [selectedIndex, setselectedIndex] = React.useState(0);
  const {t} = useTranslation();

  return (
    <View style={styles.freelancerCardContainer}>
      <TouchableOpacity onPress={() => imagePress(item)}>
        <View style={styles.header}>
          {item?.profile_image ? (
            <View style={styles.headerLeft}>
              <Image
                style={styles.image}
                source={{
                  uri: item?.profile_image,
                }}
                defaultSource={require('src/assets/images/imagePlaceHolder.png')}
              />
            </View>
          ) : (
            <View style={styles.headerLeft}>
              {item?.gender === 'male' || item?.gender === null ? (
                <Image
                  style={styles.image}
                  source={require('src/assets/images/menAvatar.png')}
                  defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                />
              ) : (
                <Image
                  style={styles.image}
                  source={require('src/assets/images/femaleAvatar.png')}
                  defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                />
              )}
            </View>
          )}
          <View style={styles.headerRight}>
            <View style={styles.headerRightTop}>
              <Text style={styles.freelancerName}>
                {item?.first_name} {item?.last_name}
              </Text>
              {item?.hourly_rate?.amount !== '' ? (
                <Text style={styles.freelancerRate}>
                  {/* {item.hourly_rate.currency === 'sar' ? 'SR ' : 'USD '} */}
                  SR {item?.hourly_rate?.amount}
                </Text>
              ) : null}
            </View>
            {/* <Text style={styles.headerRightCenter}>
              {item?.categories[0]?.name}
            </Text> */}
            <View style={styles.headerRightBottom}>
              {item?.country ? (
                <View style={styles.headerRightBottomLeft}>
                  <CustomIcon
                    name="location"
                    color={colors.appGray}
                    size={14}
                  />
                  <Text style={styles.locationName}>{item?.country}</Text>
                </View>
              ) : (
                <></>
              )}
              <View style={{alignItems: 'flex-end', flex: 1}}>
                {item?.success_rate == '0.00' ? (
                  <Text style={[styles.successRate, {color: colors.appGreen}]}>
                    Rising Talent
                  </Text>
                ) : (
                  <>
                    <Text style={styles.successRate}>
                      {parseFloat(item?.success_rate * 100).toFixed(0)} %{' '}
                      {t('freelancerCard.jobSuccess')}
                    </Text>
                    <Progress.Bar
                      progress={parseFloat(item?.success_rate)}
                      width={100}
                      color={colors.skyBlue}
                      animated={true}
                      height={2}
                    />
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Divider style={{height: 1, backgroundColor: colors.appGray1}} />
      <View style={styles.body}>
        <View onPress={imagePress}>
          <View style={styles.ratingContainer}>
            {/* <Text style={styles.topRatedText}>
              {t('freelancerCard.topRated')}
            </Text> */}
            {item?.rating === '0.00' ? (
              <Text style={[styles.successRate, {marginBottom: 0}]}>
                No Ratings Yet
              </Text>
            ) : (
              <Rating
                ratingCount={5}
                imageSize={12}
                startingValue={parseFloat(item?.rating)}
                readonly
              />
            )}
          </View>
          {item.skills?.length > 0 ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.specializesinText}>Specialies in</Text>
              <FlatList
                horizontal={true}
                data={item?.skills}
                showsHorizontalScrollIndicator={false}
                renderItem={({item: skill, index}) => (
                  <View>
                    <Text
                      style={{
                        color: colors.appViolet,
                        fontSize: 14,
                        marginTop: -4,
                      }}>
                      {item?.skills?.length - 1 === index ? skill : `${skill}/`}
                    </Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}

          <Text numberOfLines={3} style={styles.bodyDescription}>
            {item?.about}
          </Text>
        </View>

        <View style={{flex: 1, marginTop: 5}}>
          {item?.portfolio?.length > 1 ? (
            <PagingComonent
              activeColor={colors.skyBlue}
              inactiveColor={colors.appGray1}
              selectedIndex={selectedIndex}
              numberOfItem={item.portfolio?.length}
            />
          ) : null}

          <Carousel
            // ref={(c) =>carousel = c}
            data={item?.portfolio || []}
            renderItem={({item: portfolio, index}) => (
              <View
                style={
                  item?.portfolio?.length - 1 === index
                    ? [
                        styles.carouselRenderItem,
                        {
                          marginStart: -40,
                          width: SLIDER_WIDTH * 0.6,
                        },
                      ]
                    : [styles.carouselRenderItem, {width: SLIDER_WIDTH * 0.6}]
                }>
                <Image
                  style={styles.carouselImage}
                  source={{
                    uri: portfolio.image,
                  }}
                  defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                />
                <Text style={styles.carouselText}>{portfolio.title} </Text>
              </View>
            )}
            sliderWidth={SLIDER_WIDTH * 0.84}
            itemWidth={SLIDER_WIDTH * 0.6}
            // firstItem={0}
            onSnapToItem={(index) => setselectedIndex(index)}
            // useScrollView={true}
            // loop={true}
          />
        </View>
      </View>

      <Divider style={{height: 1, backgroundColor: colors.appGray1}} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.messageContainer}
          onPress={() =>
            navigation.navigate('FirebaseChat', {
              uid: item?.firebase_user_id,
              userName: `${item?.first_name} ${item?.last_name}`,
              userPhoto: item?.profile_image,
            })
          }>
          <Text style={styles.messageText}>{t('freelancerCard.message')}</Text>
          <CustomIcon name="messages" size={14} color={colors.appViolet} />
        </TouchableOpacity>
        <Text style={styles.divider} />
        <TouchableOpacity
          disabled={item?.is_invited || item?.is_proposed}
          onPress={() =>
            navigation.navigate('InviteToJob', {
              freelancerData: item,
              job: job ?? undefined,
            })
          }
          style={styles.awardContainer}>
          <Text
            style={[
              styles.awardText,
              (item?.is_invited || item?.is_proposed) && {
                color: colors.appGray,
              },
            ]}>
            {item?.is_invited || item?.is_proposed
              ? t('freelancerCard.invited')
              : t('freelancerCard.inviteToJob')}
          </Text>
          <Ionicons
            name="checkmark"
            size={20}
            color={
              item?.is_invited || item?.is_proposed
                ? colors.appGray
                : colors.skyBlue
            }
          />
        </TouchableOpacity>
        <Text style={styles.divider} />
        <TouchableOpacity
          disabled={
            item?.id === contactId &&
            (addContactLoading || removeContactLoading)
          }
          onPress={() =>
            item?.is_contact
              ? removeContact(item?.contact_id, item?.id)
              : addContact(item?.id)
          }
          style={styles.contactContainer}>
          <Text
            style={
              item?.is_contact
                ? [styles.contactText, {color: colors.appRed}]
                : styles.contactText
            }>
            {item?.is_contact
              ? t('freelancerCard.contact')
              : t('freelancerCard.toContact')}
          </Text>

          {item?.is_contact &&
          removeContactLoading &&
          item?.id === contactId ? (
            <ActivityIndicator size="small" color={colors.appRed} />
          ) : item?.is_contact ? (
            <Ionicons name="person-remove" size={20} color={colors.appRed} />
          ) : !item?.is_contact &&
            addContactLoading &&
            item?.id === contactId ? (
            <ActivityIndicator size="small" color={colors.appYellow} />
          ) : !item?.is_contact ? (
            <Ionicons
              name="person-add-outline"
              size={20}
              color={colors.appYellow}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(FreelacerCard);
