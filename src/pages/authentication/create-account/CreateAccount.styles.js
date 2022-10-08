import {StyleSheet, Dimensions, I18nManager} from 'react-native';

const {width, height} = Dimensions.get('window');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width,
    height: height * 0.4,
    position: 'relative',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },

  createAccountText: {
    color: colors.appBlack,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.primarySB,
  },
  childContainer: {
    flex: 1,
  },
  fnameText: {
    fontSize: 14,
    color: colors.appGray,
    marginBottom: 5,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
    marginStart: 20,
  },
  fnameInput: {
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontSize: 16,
    width: width / 2.5,
    marginEnd: 20,
    fontFamily: fonts.secondary,
    fontWeight: '200',
    marginStart: 20,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  lnameText: {
    fontSize: 14,
    color: colors.appGray,
    marginBottom: 5,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
    marginEnd: 30,
  },
  lnameInput: {
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontSize: 16,

    width: width / 2.5,
    fontFamily: fonts.secondary,
    fontWeight: '200',
    marginEnd: 20,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  nameContainer: {
    // flex: 1,
    flexDirection: 'row',
    // alignSelf: 'center',
    // marginHorizontal: 30,
    marginVertical: 10,
    justifyContent: 'space-between',
  },

  genderText: {
    marginStart: 20,
    fontSize: 14,
    color: colors.appGray,
    marginBottom: 5,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  genderTypeContainer: {
    flexDirection: 'row',
    marginStart: 20,
  },
  genderBox: {
    borderWidth: 1,
    borderColor: colors.skyBlue,
    borderRadius: 10,
    // padding: 30,
    marginEnd: 25,
    marginBottom: 10,
  },
  genderImage: {
    width: 47,
    height: 39,
    // margin: 10,
    resizeMode: 'contain',
  },
  checkIcon: {
    backgroundColor: colors.appYellow,
    width: 24,
    height: 24,
    padding: 2,
    borderRadius: 12,
    position: 'absolute',
    top: 30,
    start: 45,
    // end: 10,
    // bottom: 0,
  },
  emailText: {
    fontSize: 14,
    color: colors.appGray,
    marginBottom: 5,
    marginStart: 20,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  emailInput: {
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontSize: 16,
    marginHorizontal: 20,

    fontFamily: fonts.secondary,
    fontWeight: '200',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },

  phoneText: {
    fontSize: 14,
    color: colors.appGray,
    marginBottom: 5,
    marginTop: 10,
    marginStart: 30,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  phoneInput: {
    fontSize: 16,

    flex: 1,
    marginTop: 5,

    paddingLeft: 10,
    fontFamily: fonts.secondary,
    fontWeight: '200',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },

  footer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  footerLeftText: {
    color: colors.appGray,
    marginEnd: 5,
    fontFamily: fonts.primary,
  },
  footerRightText: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    marginBottom: 20,
    fontFamily: fonts.primary,
    color: colors.appViolet,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'relative',
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    // padding: 2,
    marginHorizontal: 30,
  },
  countryPicker: {
    alignSelf: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.appGray,
    paddingHorizontal: 10,
  },
});

export default styles;
