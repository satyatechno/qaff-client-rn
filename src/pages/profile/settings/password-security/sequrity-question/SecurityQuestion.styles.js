import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  label: {
    color: colors.appGray,
    fontSize: 14,
    marginTop: 10,
    marginStart: 10,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  questionContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 10,
    // borderRadius: 10,
    backgroundColor: colors.defaultWhite,
    elevation: 2,
    // borderBottomColor: colors.skyBlue,
    // borderBottomWidth: 1,
    // marginHorizontal: 20,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
  input: {
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    marginHorizontal: 10,
    fontSize: 16,
    paddingStart: 10,
    paddingBottom: 5,
    color: colors.appBlack,
    fontFamily: fonts.secondary,
    fontWeight: '200',
    // textAlign: I18nManager.isRTL ? 'right' : 'left',
    marginVertical: 10,
  },
  button: {
    borderRadius: 10,
    margin: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
