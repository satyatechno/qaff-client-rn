import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',

    height: height * 0.5,
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
    fontFamily: fonts.primarySB,
  },
  signUpButton: {
    backgroundColor: colors.skyBlue,
    borderRadius: 10,
    height: 45,
    marginHorizontal: 20,

    justifyContent: 'center',
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
    fontFamily: fonts.secondary,
    fontWeight: '300',
  },
  logInButton: {
    height: 45,

    borderRadius: 10,
    borderColor: colors.appViolet,
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  logInButtonText: {
    color: colors.appViolet,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.secondarySB,
  },
});

export default styles;
