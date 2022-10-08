import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from './Ratings.styles';
import Header from 'src/components/header/Header';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-ratings';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Snackbar from 'react-native-snackbar';
import ErrorText from 'src/components/error-text/ErrorText';
import {rateFreelancer} from 'src/services/http.service';
import {useSelector} from 'react-redux';
import i18n from 'src/locale/i18n';
export const RatingView = ({title, value, onRatingChange}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center',
      }}>
      <Text style={styles.ratingText}>{title}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.rating}>{value}</Text>
        <Rating
          ratingCount={5}
          imageSize={18}
          startingValue={parseFloat(value)}
          onFinishRating={(r) => {
            onRatingChange(r);
          }}
        />
      </View>
    </View>
  );
};
const Ratings = (props) => {
  const {
    contractData,
    contractData: {freelancer},
  } = props?.route?.params;
  const [check1, setcheck1] = useState(false);
  const [check2, setcheck2] = useState(false);
  const [avaliability, setAvaliability] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [cooperation, setCooperation] = useState(0);
  const [professionalism, setProfessionalism] = useState(0);
  const [workAgain, setWorkAgain] = useState(0);
  const [review, setReview] = useState('');
  const [reviewError, setReviewError] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.myReducer?.user?.token);

  const onSubmit = () => {
    if (review.length) {
      setLoading(true);
      setReviewError(false);
      rateFreelancer({
        token: token,
        data: {
          freelancer_id: freelancer?.id,
          contract_id: contractData?.id,
          availability: avaliability,
          communication: communication,
          cooperation: cooperation,
          professionalism: professionalism,
          working_again: workAgain,
          delivered_on_time: check1 ? 1 : 0,
          delivered_within_budget: check2 ? 1 : 0,
          review: review,
        },
      })
        .then((res) => {
          console.log('resss', res.data);
          setLoading(false);
          Snackbar.show({
            text: res.data.message,
            duration: 1500,
            backgroundColor: colors.appGreen,
            textColor: colors.defaultWhite,
          });
          props?.navigation?.goBack();
        })
        .catch((e) => {
          setLoading(false);
          if (e?.response?.data?.message) {
            Snackbar.show({
              text: e?.response?.data?.message,
              duration: 1000,
              backgroundColor: colors.appRed,
              textColor: colors.defaultWhite,
            });
          }
          console.log('error', e);
        });
    } else {
      setReviewError(true);
    }
  };

  return (
    <>
      <Header
        title={i18n.t('ratings.ratings')}
        backButton={true}
        navigation={props.navigation}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.container}>
          {/* <View style={styles.headingView}>
            <Text style={styles.heading}>
              <Ionicons
                name="md-checkmark-circle-outline"
                color={'#fff'}
                size={20}
              />
              How likely are you going to hire again
            </Text>
          </View> */}
          <FastImage
            source={require('./images/ratings.png')}
            style={styles.image}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: colors.skyBlue,
              fontFamily: fonts.primarySB,
              paddingBottom: 10,
            }}>
            {freelancer?.first_name + ' ' + freelancer?.last_name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingVertical: 10,
              justifyContent: 'space-between',
              borderBottomColor: colors.appGray1,
              borderBottomWidth: 1,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.primarySB,
                fontSize: 18,
                color: colors.skyBlue,
              }}>
              {i18n.t('ratings.contract')}:
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontFamily: fonts.primarySB,
                color: colors.defaultBlack,
              }}>
              {contractData?.title}
            </Text>
          </View>
          <Text style={styles.rateFreelancerText}>
            {i18n.t('ratings.rateTheFreelancer')}
          </Text>
          {/* {DUMMY.map((item, index) => (
            <RatingView key={index.toString()} item={item} index={index} />
          ))} */}

          <RatingView
            title={i18n.t('ratings.avaliability')}
            value={avaliability}
            onRatingChange={(rating) => setAvaliability(rating)}
          />
          <RatingView
            title={i18n.t('ratings.communication')}
            value={communication}
            onRatingChange={(rating) => setCommunication(rating)}
          />
          <RatingView
            title={i18n.t('ratings.cooperation')}
            value={cooperation}
            onRatingChange={(rating) => setCooperation(rating)}
          />
          <RatingView
            title={i18n.t('ratings.professionalism')}
            value={professionalism}
            onRatingChange={(rating) => setProfessionalism(rating)}
          />
          <RatingView
            title={i18n.t('ratings.howLikely')}
            value={workAgain}
            onRatingChange={(rating) => setWorkAgain(rating)}
          />

          <View style={styles.divider} />
          <TouchableOpacity
            activeOpacity={1}
            style={styles.checkView}
            onPress={() => setcheck1(!check1)}>
            <Text style={styles.checkText}>
              {i18n.t('ratings.deliverOnTime')}
            </Text>
            {check1 ? (
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
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            activeOpacity={1}
            style={styles.checkView}
            onPress={() => setcheck2(!check2)}>
            <Text style={styles.checkText}>
              {i18n.t('ratings.deliverInBudget')}
            </Text>
            {check2 ? (
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
          </TouchableOpacity>
          <View style={styles.divider} />
          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.primarySB,
              color: colors.appGray,
              marginHorizontal: 15,
              marginTop: 15,
            }}>
            {i18n.t('ratings.shareExperience')}
          </Text>
          <TextInput
            value={review}
            onChangeText={(text) => {
              setReviewError(false);
              setReview(text);
            }}
            style={[styles.input, reviewError && {borderColor: colors.appRed}]}
            keyboardType="default"
            multiline={true}
          />
          {reviewError && <ErrorText name={i18n.t('ratings.required')} />}
          <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
            {loading ? (
              <ActivityIndicator size="small" color={colors.defaultWhite} />
            ) : (
              <Text style={styles.buttonText}>{i18n.t('ratings.rate')}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Ratings;
