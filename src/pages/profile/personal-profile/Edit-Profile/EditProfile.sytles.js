import {StyleSheet, Dimensions, I18nManager, Platform} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
    justifyContent: 'space-between',
  },
  input: {
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    paddingBottom: Platform.OS === 'android' ? 7 : 0,
    marginHorizontal: 20,
    fontSize: 16,
    color: colors.appBlack,
    fontFamily: fonts.secondary,
    fontWeight: '200',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginTop: height * 0.1,
  },
  label: {
    color: colors.appGray,
    fontSize: 14,
    marginStart: 20,

    marginBottom: 10,
    // marginTop: 20,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
});
export default styles;
