import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  timelineText: {
    paddingTop: 20,
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    marginStart: -5,
  },
  nextButton: {
    backgroundColor: colors.appViolet,
    flexDirection: 'row',
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  nextButtonText: {
    color: colors.defaultWhite,
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
});

export default styles;
