import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    backgroundColor: colors.appBackground,
    flex: 1,
    // paddingBottom: 60,
  },

  pollTitle: {
    fontFamily: fonts.primarySB,
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 10,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    borderColor: colors.appGray1,
    textAlign: 'left',
  },
  radioGroupContainer: {
    marginHorizontal: 20,
    // marginBottom: 100,
    flex: 1,
  },
  footer: {
    // margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    // bottom: 10,
    // left: 20,
    // right: 20,
    elevation: 10,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  skipButton: {
    borderWidth: 1,
    borderColor: colors.appBlue,
    // padding: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.appBackground,
  },
  skipButtonText: {
    color: colors.appBlue,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: colors.appGreen,
    // padding: 5,
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '50%',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: colors.defaultWhite,
    paddingStart: 20,
    fontSize: 14,
    paddingEnd: 5,
    fontFamily: fonts.secondarySB,
    // marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingContainer: {
    backgroundColor: colors.defaultWhite,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  greetingText: {
    fontSize: 20,
    fontFamily: fonts.primarySB,
    color: colors.appViolet,
  },
  greetingImage: {
    height: 160,
    width: 160,

    marginTop: 20,
  },
});

export default styles;
