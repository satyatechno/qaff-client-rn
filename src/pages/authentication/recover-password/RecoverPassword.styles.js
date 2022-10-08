import { StyleSheet, Dimensions, I18nManager } from 'react-native';

const { width, height } = Dimensions.get('screen');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,

    height: height * 0.52,

    resizeMode: 'contain',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
  },
  recoverText: {
    fontSize: 20,
    marginVertical: 25,
    textAlign: 'center',
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
  },
  label: {
    color: colors.appGray,
    fontSize: 12,
    marginStart: 20,
    marginBottom: 10,
    // marginTop: 20,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  input: {
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 20,
    fontSize: 16,
    color: colors.appBlack,
    fontFamily: fonts.secondary,
    fontWeight: '200',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'center',

    marginBottom: 20,
  },
  noAccountText: {
    fontSize: 14,
    color: colors.appGray,
    textAlign: 'center',
    fontFamily: fonts.primary,
  },
  signUpText: {
    fontSize: 14,
    marginStart: 5,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    fontFamily: fonts.primary,
    color: colors.appViolet,
  },
});

export default styles;
