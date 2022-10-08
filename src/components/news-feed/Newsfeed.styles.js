import { StyleSheet } from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: colors.defaultWhite,
    marginVertical: 5,
    // elevation: 1,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  titleBudgetContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerInfo: {
    flex: 1,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 18,
    color: colors.skyBlue,
    fontFamily: fonts.primarySB,
    marginBottom: 7,
    textAlign: 'left',
    flex: 0.9,
  },
  budget: {
    fontSize: 14,
    color: colors.appViolet,
    fontFamily: fonts.secondary,
    fontWeight: '300',
    marginTop: 5,
    textAlign: 'left',
  },
  time: {
    fontSize: 12,
    color: colors.appGray,
    fontFamily: fonts.primarySB,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'right',
  },
  user: {
    fontSize: 16,
    color: colors.appBlue,
    marginBottom: 10,
    fontFamily: fonts.primary,
  },
  headerRightBottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationName: {
    fontSize: 12,
    fontFamily: fonts.primary,
    color: colors.appGray,
    textAlign: 'left',
  },
  body: {
    borderColor: colors.appGray,
    // borderTopWidth: 0.2,
  },
  bodyContainer: {
    marginVertical: 20,
  },
  description: {
    marginHorizontal: 20,
    color: colors.appBlack,
    fontSize: 14,
    fontFamily: fonts.secondary,
    fontWeight: '300',
    textAlign: 'left',
  },
  readMoreText: {
    marginHorizontal: 20,
    color: colors.appBlack,
    textDecorationLine: 'underline',
    fontSize: 14,
    fontFamily: fonts.secondarySB,
    fontWeight: '300',
    textAlign: 'left',
  },
  footer: {
    borderColor: colors.appGray,
    // borderTopWidth: 0.2,
  },
  footerContents: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    color: colors.appViolet,
    // fontFamily: fonts.primarySB,
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: colors.appGray,
  },
  likeText: {
    fontSize: 16,
    color: colors.skyBlue,
    // fontFamily: fonts.primarySB,
  },
  footerTextContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginEnd: 5,
    alignItems: 'center',
  },
});

export default styles;
