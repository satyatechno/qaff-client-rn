import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,

    height: height * 0.47,

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
  welcomeText: {
    fontSize: 20,
    marginVertical: 25,
    textAlign: 'center',
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
  },
  signUpButton: {
    backgroundColor: colors.skyBlue,
    borderRadius: 10,
    padding: 5,
    height: 40,
    marginHorizontal: 20,
  },
  signUpButtonText: {
    color: colors.defaultWhite,
    fontSize: 18,

    textAlign: 'center',
    fontFamily: fonts.secondarySB,
  },
  orText: {
    textAlign: 'center',
    color: colors.appBlack,
    fontSize: 16,
    marginVertical: 20,
    fontFamily: fonts.primary,
  },

  socialIcon: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  socialIconAlign: {
    marginHorizontal: 20,
    height: 30,
    width: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  footerLogoContainer: {
    borderColor: colors.appGray1,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: colors.defaultWhite,

    height: 50,
    width: 50,
    marginHorizontal: 10,

    justifyContent: 'center',
  },
  footerTopText: {
    color: colors.appGray,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
    fontFamily: fonts.primary,
  },
  footerBottomText: {
    // textDecorationStyle: 'solid',
    // textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.primary,
    fontWeight: '300',
    fontSize: 13,
    color: colors.appGray,
  },
});

export default styles;
