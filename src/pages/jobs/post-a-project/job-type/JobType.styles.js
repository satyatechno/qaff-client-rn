import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    paddingHorizontal: 20,
  },
  selectJobText: {
    fontSize: 18,
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    paddingVertical: 20,
    textAlign: 'left',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
  },
  subCategoriesContainer: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
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
    left: 10,
    right: 10,
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
