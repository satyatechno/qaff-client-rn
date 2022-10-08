import {StyleSheet, Dimensions} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
    flex: 1,
  },
  profileBackground: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
    paddingTop: 70,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  freelancerName: {
    color: colors.defaultWhite,
    fontSize: 20,
    textShadowRadius: 2,
    paddingTop: 10,
    textAlign: 'center',
  },
  freelancerInfo: {
    color: colors.defaultWhite,
    fontSize: 14,
    paddingBottom: 10,
    textShadowRadius: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationName: {
    color: colors.defaultWhite,
    marginStart: 10,
    textShadowRadius: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  profileRatingText: {
    marginStart: 10,
    color: colors.appBlack,

    textAlignVertical: 'center',
  },
  tabsContainerStyle: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    height: 40,
    borderWidth: 0,
    backgroundColor: colors.appGray2,
    padding: 2,
    borderRadius: 10,
  },
  tabStyle: {
    backgroundColor: colors.appGray2,
    borderColor: colors.appGray2,
    borderWidth: 0,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    borderRadius: 10,
  },
  tabTextStyle: {
    color: colors.appGray,
    fontFamily: fonts.primarySB,
    fontSize: 14,
  },
  activeTabStyle: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 10,
    borderColor: colors.appGray2,
    borderWidth: 0,
  },
  activeTabTextStyle: {
    color: colors.skyBlue,
    fontSize: 16,
  },
  aboutFreelancer: {
    backgroundColor: colors.defaultWhite,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 2,
  },
  aboutFreelancer_Name: {
    fontSize: 20,
    fontFamily: fonts.primarySB,
    color: colors.skyBlue,
    textAlign: 'left',
  },
  aboutFreelancer_Description: {
    paddingVertical: 10,
    fontFamily: fonts.secondary,
    fontSize: 14,
    textAlign: 'left',
  },
  readMoreText: {
    fontFamily: fonts.secondarySB,
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'left',
  },
  portfolioContainer: {
    backgroundColor: colors.defaultWhite,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 2,
    textAlign: 'left',
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  portfolioText: {
    fontSize: 20,
    color: colors.appViolet,
    fontFamily: fonts.primarySB,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.appViolet,
    textDecorationLine: 'underline',
    fontFamily: fonts.secondary,
  },
  portfolioDetails: {
    paddingTop: 10,
    width: Dimensions.get('window').width / 2 - 50,
    marginHorizontal: 5,
  },
  portfolioImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  portfolioTitle: {
    textAlign: 'left',
  },
  hireButton: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.appViolet,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  hireButtonText: {
    fontSize: 14,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
    // flex: 0.7,
    // marginHorizontal: 5,
  },

  reviewContainer: {
    backgroundColor: colors.defaultWhite,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 2,
  },
  reviewContainer_Top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewerName: {
    color: colors.skyBlue,
    fontSize: 20,
    fontFamily: fonts.primarySB,
  },
  reviewTime: {
    fontSize: 16,
    fontFamily: fonts.primary,
    color: colors.appViolet,
  },
  reviewRatingContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  ratingText: {
    marginStart: 5,
    textAlign: 'left',
    color: colors.appGray,
    fontWeight: 'bold',
  },
  reviewDescription: {
    color: colors.appBlack,
    fontFamily: fonts.secondary,
    marginTop: 10,
    textAlign: 'left',
  },
  skillsContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 2,
    padding: 10,
    backgroundColor: colors.defaultWhite,
  },
  skillsText: {
    fontSize: 20,
    fontFamily: fonts.primarySB,
    color: colors.appYellow,
    marginBottom: 10,
    textAlign: 'left',
  },
  skillsInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },
  skill: {
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    marginBottom: 10,
    marginEnd: 5,
  },
  skillName: {
    color: colors.defaultWhite,
    padding: 10,
    fontFamily: fonts.primarySB,
    fontSize: 12,
  },
  examContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 2,
    padding: 10,
    backgroundColor: colors.defaultWhite,
  },
  examsText: {
    fontSize: 20,
    fontFamily: fonts.primarySB,
    color: colors.appViolet,
    marginBottom: 10,
    textAlign: 'left',
  },
  examInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  examName: {
    fontSize: 16,
    color: colors.appBlack,
    fontFamily: fonts.primary,
  },
  examPercentage: {
    fontSize: 14,
    color: colors.appGray,
    fontFamily: fonts.secondary,
  },
});

export default styles;
