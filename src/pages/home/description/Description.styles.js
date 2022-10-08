import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  title: {
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    fontSize: 18,
    marginTop: 10,
    marginStart: 20,
    textAlign: 'left',
  },
  time: {
    fontFamily: fonts.primary,
    color: colors.appGray,
    marginStart: 20,
    marginBottom: 10,
    textAlign: 'left',
    fontSize: 12,
  },
  descriptionContainer: {
    borderTopWidth: 0.2,
    borderColor: colors.appGray,
    marginHorizontal: 20,
  },
  description: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: fonts.secondary,

    marginTop: 10,
    marginBottom: 10,
  },
  freelancerContainer: {
    borderTopWidth: 0.2,
    borderColor: colors.appGray,
    marginHorizontal: 20,
    borderBottomWidth: 0.2,
  },
  freelancerText: {
    fontFamily: fonts.primary,
    color: colors.appGray,
    fontSize: 12,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'left',
  },
  freelancerNo: {
    fontFamily: fonts.primarySB,
    fontSize: 18,
    color: colors.appBlack,
    textAlign: 'left',
    marginBottom: 10,
  },
});

export default styles;
