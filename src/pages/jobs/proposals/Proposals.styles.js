import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
    flex: 1,
  },
  proposalsCardContainer: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
    elevation: 2,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
  },
  headerLeft: {
    marginEnd: 10,
    alignSelf: 'auto',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    fontFamily: fonts.primarySB,
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
  },
  body: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
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
    fontSize: 12,
    color: colors.appViolet,
    fontFamily: fonts.primary,
    paddingBottom: 10,
    textAlign: 'left',
  },
  bodyDescription: {
    fontSize: 14,
    color: colors.appBlack,
    fontFamily: fonts.secondary,
    textAlign: 'left',
  },
  readMoreText: {
    fontSize: 14,
    color: colors.appBlack,
    fontFamily: fonts.secondarySB,
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: colors.appViolet,
    marginEnd: 5,
    // fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  divider: {
    borderRightWidth: 1,
    borderColor: colors.appGray,
  },
  awardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  awardText: {
    fontSize: 16,
    color: colors.skyBlue,
    marginEnd: 5,
    // fontFamily: fonts.primarySB,
    textAlign: 'left',
  },

  proposalDetailContainer: {
    backgroundColor: colors.defaultWhite,
    elevation: 2,
    marginHorizontal: 10,
    // marginVertical: 10,
    paddingStart: 10,
    marginTop: 10,
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
  shortlistContainer: {
    flexDirection: 'row',
    marginBottom: -5,
    marginTop: 5,
    marginStart: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.appGreen,
    padding: 5,
    borderRadius: 10,
  },
});

export default styles;
