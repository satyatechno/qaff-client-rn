import { StyleSheet, Dimensions, I18nManager, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
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
  passwordText: {
    fontSize: 14,
    color: colors.appGray,
    marginBottom: 5,
    marginTop: 10,
    marginStart: 20,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  passwardContainer: {
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    padding: Platform.OS === 'android' ? 1 : 10,
    marginHorizontal: 20,
    height: 40,
    flexDirection: 'row',
  },
  passwardInput: {
    fontSize: 18,
    color: colors.appBlack,
    flex: 1,
    paddingBottom: 7,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },

});

export default styles;
