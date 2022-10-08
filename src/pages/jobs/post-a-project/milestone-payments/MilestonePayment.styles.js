import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  milestoneText: {
    paddingVertical: 20,
    color: colors.appBlack,
    fontSize: 18,
    fontFamily: fonts.primarySB,
    borderBottomWidth: 0.5,
    borderColor: colors.appGray,
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
