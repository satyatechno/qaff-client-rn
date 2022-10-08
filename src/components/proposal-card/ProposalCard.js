import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
const {useTranslation} = require('react-i18next');
const {SHORTLIST_UNSHORTLIST} = require('src/actions/proposal');
import {AirbnbRating, Rating} from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'src/styles/texts/colors';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from 'src/icon-configs/config.json';
const CustomIcon = createIconSetFromFontello(fontelloConfig);
import * as Progress from 'react-native-progress';
import styles from './ProposalCard.styles';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import fonts from 'src/styles/texts/fonts';

export default ProposalsCard = ({
  image,
  freelancerName,
  freelancerRate,
  freelancerInfo,
  successRate,
  rating,
  description,
  speciality,
  locationName,
  viewProfile,
  navigation,
  id,
  projectId,
  quickblox,
  isShortlist,
  contractId,
  bidAmount,
  firebaseUserId
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  // console.log('ds', JSON.stringify(isShortlist, null, 2));

  const handleShortlistProposal = (id, type) => {
    dispatch(SHORTLIST_UNSHORTLIST({id: id, type: type}));
  };

  return (
    <View style={styles.proposalsCardContainer}>
      {isShortlist && (
        <View style={styles.shortlistContainer}>
          <Ionicons
            name="bookmark"
            size={14}
            color={colors.defaultWhite}
            style={{marginTop: 3}}
          />
          <Text
            style={{
              color: colors.defaultWhite,
              fontSize: 14,
            }}>
            {t('proposals.shortlisted')}
          </Text>
        </View>
      )}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={viewProfile}>
            {image ? (
              <FastImage
                style={styles.image}
                source={{
                  uri: image,
                }}
                defaultSource={require('src/assets/images/imagePlaceHolder.png')}
              />
            ) : (
              <FastImage
                style={styles.image}
                source={require('src/assets/images/avator.png')}
                defaultSource={require('src/assets/images/imagePlaceHolder.png')}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.headerRight}
          onPress={() => {
            navigation.navigate('ProposalDetails', {
              id: id,
              projectId: projectId,
            });
          }}>
          <View style={styles.headerRightTop}>
            <Text style={styles.freelancerName}>{freelancerName}</Text>
            <Text style={styles.freelancerRate}>{freelancerRate}</Text>
          </View>
          <Text style={styles.headerRightCenter}>{freelancerInfo}</Text>
          <View style={styles.headerRightBottom}>
            {locationName !== '' ? (
              <View style={styles.headerRightBottomLeft}>
                <CustomIcon name="location" color={colors.appGray} />
                <Text style={styles.locationName}>{locationName}</Text>
              </View>
            ) : (
              <View></View>
            )}

            <Text
              style={{
                color: colors.appViolet,
                fontFamily: fonts.primarySB,
                fontSize: 16,
              }}>
              Proposed price: {bidAmount}
            </Text>
            {/* <View>
              <Text style={styles.successRate}>
                {parseFloat(successRate) * 100}% {t('proposals.jobSuccess')}
              </Text>
              <Progress.Bar
                progress={parseFloat(successRate)}
                width={100}
                color={colors.skyBlue}
                animated={true}
                height={4}
              />
            </View> */}
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.body}
        onPress={() => {
          navigation.navigate('ProposalDetails', {
            id: id,
            projectId: projectId,
          });
        }}>
        <View style={styles.ratingContainer}>
          <Text style={styles.topRatedText}>{t('proposals.topRated')}</Text>
          <Rating
            ratingCount={5}
            imageSize={12}
            startingValue={rating}
            readonly
          />
        </View>
        <Text style={styles.specializesinText}>{speciality}</Text>
        <Text numberOfLines={3} style={styles.bodyDescription}>
          {description}
        </Text>
        {/* <TouchableOpacity>
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity> */}
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FirebaseChat', {
              uid: firebaseUserId,
              userName: freelancerName,
              userPhoto: image,
            })
           
          }
          style={styles.messageContainer}>
          <Text style={styles.messageText}>{t('proposals.message')}</Text>
          <CustomIcon name="messages" size={14} color={colors.appViolet} />
        </TouchableOpacity>
        <Text style={styles.divider} />
        <TouchableOpacity
          style={styles.awardContainer}
          onPress={() => {
            !contractId
              ? navigation.navigate('Contract', {
                  id: id,
                  projectId: projectId,
                  freelancerName: freelancerName,
                })
              : navigation.navigate('ContractDetails', {
                  contractId: contractId,
                });
          }}>
          <Text style={styles.awardText}>
            {contractId ? t('proposals.viewContract') : t('proposals.award')}
          </Text>
          <Ionicons name="checkmark" size={20} color={colors.skyBlue} />
        </TouchableOpacity>
        <Text style={styles.divider} />

        {!isShortlist ? (
          <TouchableOpacity
            style={styles.awardContainer}
            onPress={() => handleShortlistProposal(id, 'short')}>
            <Text style={[styles.awardText, {color: colors.appBlue}]}>
              {t('proposals.shortlist')}
            </Text>
            <Ionicons
              name="bookmark-outline"
              size={16}
              color={colors.appBlue}
              style={{marginStart: 2}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.awardContainer}
            onPress={() => handleShortlistProposal(id, 'unshort')}>
            <Text style={[styles.awardText, {color: colors.appGreen}]}>
              {t('proposals.shortlisted')}
            </Text>
            <Ionicons
              name="bookmark"
              size={16}
              color={colors.appGreen}
              style={{marginStart: 2}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
