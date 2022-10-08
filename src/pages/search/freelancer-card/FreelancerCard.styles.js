import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    flex: 1,
  },
  freelancerCardContainer: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
    elevation: 2,
    marginHorizontal: 2,
    marginVertical: 5,
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    // borderBottomWidth: 0.5,
    // borderBottomColor: colors.appGray,
  },
  headerLeft: {
    marginEnd: 10,
    alignSelf: 'auto',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
  },
  headerRight: {
    flex: 1,
  },
  headerRightTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  freelancerName: {
    fontSize: 18,
    fontFamily: fonts.primarySB,
    color: colors.skyBlue,
    textAlign: 'left',
  },
  freelancerRate: {
    fontSize: 18,
    // fontFamily: fonts.primarySB,
    color: colors.appViolet,
    textAlign: 'left',
  },
  headerRightCenter: {
    fontSize: 14,
    fontFamily: fonts.secondary,
    color: colors.appViolet,
    textAlign: 'left',
  },
  headerRightBottom: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  headerRightBottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationName: {
    fontSize: 12,
    fontFamily: fonts.primary,
    color: colors.appGray,
    textAlign: 'left',
  },
  successRate: {
    fontSize: 12,
    fontFamily: fonts.primary,
    color: colors.appGray,
    textAlign: 'left',
    marginBottom: 3,
  },
  body: {
    padding: 15,
    // borderBottomWidth: 0.5,
    // borderBottomColor: colors.appGray,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRatedText: {
    fontSize: 12,
    fontFamily: fonts.primarySB,
    color: colors.skyBlue,
    marginEnd: 10,
    textAlign: 'left',
  },
  specializesinText: {
    fontSize: 14,
    color: colors.appViolet,
    // fontFamily: fonts.primarySB,
    paddingBottom: 10,
    textAlign: 'left',
    paddingEnd: 5,
    paddingTop: 5,
    fontWeight: 'bold',
    marginTop: 1,
  },
  bodyDescription: {
    fontSize: 14,
    color: colors.appBlack,
    fontFamily: fonts.secondary,
    textAlign: 'left',
  },

  footer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 14,
    color: colors.appViolet,
    marginEnd: 5,
    // fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  divider: {
    borderRightWidth: 0.5,
    borderColor: colors.appGray,
  },
  awardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 3,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  awardText: {
    fontSize: 14,
    color: colors.skyBlue,
    marginEnd: 2,
    // fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  contactText: {
    fontSize: 14,
    color: colors.appYellow,
    marginEnd: 5,
    // fontFamily: fonts.secondarySB,
    textAlign: 'left',
  },

  title: {
    fontSize: 20,
    fontFamily: fonts.primarySB,
    color: colors.skyBlue,
    textAlign: 'left',
  },
  budget: {
    paddingTop: 5,
    fontSize: 15,
    fontFamily: fonts.secondarySB,
    color: colors.appViolet,
    textAlign: 'left',
  },
  time: {
    paddingTop: 5,
    fontSize: 13,
    fontFamily: fonts.secondarySB,
    color: colors.appGray,
    textAlign: 'left',
  },
  carouselRenderItem: {
    justifyContent: 'center',
    marginTop: 35,
    alignItems: 'flex-start',

    marginStart: -40,
    marginEnd: 50,
    // elevation: 5,
    zIndex: 100,
  },
  carouselImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  carouselText: {
    fontFamily: fonts.secondary,
    fontSize: 14,
    color: colors.appBlack,
    marginTop: 10,
    // marginStart:10
    width: 145,
  },
});

export default styles;
