const {StyleSheet, Dimensions, Platform, I18nManager} = require('react-native');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    // paddingHorizontal: 15,
    flex: 1,
  },
  headingView: {
    backgroundColor: colors.appViolet,
    marginVertical: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  heading: {
    fontSize: 14,
    fontFamily: fonts.secondary,
    color: colors.defaultWhite,
  },
  rateFreelancerText: {
    fontFamily: fonts.primarySB,
    fontSize: 18,
    marginStart: 15,
    color: colors.appBlack,
  },
  image: {
    height: 240,
    width: 240,
    alignSelf: 'center',
  },
  ratingText: {
    color: colors.appBlack,
    fontFamily: fonts.primary,
    flex: 0.8,
  },
  rating: {
    backgroundColor: colors.appViolet,
    paddingHorizontal: 4,
    fontSize: 12,
    borderRadius: 2,
    paddingVertical: 2,
    marginHorizontal: 10,
  },
  checkView: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  checkText: {
    color: colors.appBlack,
    fontFamily: fonts.primary,
    flex: 0.8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.appGray1,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: colors.appViolet,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  buttonText: {
    color: colors.defaultWhite,
  },
  input: {
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 60,
    paddingBottom: Platform.OS === 'android' ? 7 : 0,
    margin: 15,
    fontSize: 16,
    color: colors.appBlack,
    fontFamily: fonts.secondary,
    fontWeight: '200',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    marginVertical: 5,
  },
});

export default styles;
