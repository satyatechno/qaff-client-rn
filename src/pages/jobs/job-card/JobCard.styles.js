import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    marginVertical: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    flex: 1,
  },
  headerLeft: {
    flex: 0.8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.primarySB,
    color: colors.skyBlue,
    marginBottom: 5,
    textAlign: 'left',
  },
  headerBudget: {
    fontSize: 14,
    fontFamily: fonts.secondary,
    color: colors.appViolet,
    textAlign: 'left',
  },
  headerTime: {
    fontFamily: fonts.primary,
    fontSize: 10,
    color: colors.appGray,
    textAlign: 'left',
  },
  headerRight: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  body: {
    // borderTopWidth: 0.2,
    // borderColor: colors.appGray,
  },
  bodyText: {
    marginVertical: 15,
    marginHorizontal: 20,
    textAlign: 'left',
    fontFamily: fonts.secondary,
    fontSize: 14,
    color: colors.appBlack,
  },
  readMoreText: {
    marginHorizontal: 20,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: fonts.secondarySB,
    color: colors.appBlack,
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: 10,
    // borderTopWidth: 0.2,
    // borderColor: colors.appGray,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  proposals: {
    fontFamily: fonts.secondary,
    fontSize: 14,
    color: colors.appViolet,
  },
  messages: {
    fontFamily: fonts.secondary,
    fontSize: 14,
    color: colors.skyBlue,
  },
  hired: {
    fontFamily: fonts.secondary,
    fontSize: 14,
    color: colors.appYellow,
  },
  divider: {
    borderRightWidth: 1,
    borderColor: colors.appGray,
    alignItems: 'center',
  },
  editButton: {
    flex: 0.5,
    paddingVertical: 10,
  },
  editButtonText: {
    color: colors.skyBlue,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default styles;
