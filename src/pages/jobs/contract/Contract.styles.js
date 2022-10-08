const {StyleSheet} = require('react-native');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
    // paddingHorizontal: 5
  },
  containerRow: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderBottomColor: colors.appGray1,
    borderBottomWidth: 1,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  rowBottom: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  periodText: {
    fontSize: 18,
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    marginEnd: 5,
    textAlign: 'left',
  },
  SRtext: {
    fontSize: 18,
    fontFamily: fonts.secondary,
    color: colors.appBlack,
    marginTop: 10,
    textAlign: 'left',
  },
  expectedText: {
    fontSize: 12,
    fontFamily: fonts.primary,
    color: colors.appGray,
    textAlign: 'left',
  },
  dayText: {
    color: colors.appGray,
    fontSize: 16,
    marginEnd: 20,
    textAlign: 'left',
  },
  noOfDays: {
    marginStart: 10,
    color: colors.appBlack,
    fontSize: 16,
    fontFamily: fonts.secondary,
    textAlign: 'left',
  },
  divider: {
    borderRightColor: colors.appGray,
    borderRightWidth: 1,
  },
  milestoneText: {
    marginStart: 10,
    fontSize: 18,
    fontFamily: fonts.primarySB,
    paddingTop: 10,
    color: colors.appViolet,
    textAlign: 'left',
  },
  paymentText: {
    marginStart: 10,
    fontSize: 20,
    fontFamily: fonts.primarySB,
    paddingTop: 10,
    color: colors.skyBlue,
    textAlign: 'left',
  },
  paymentContainer: {
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: colors.appViolet,
    // paddingVertical: 0,
    marginVertical: 10,
  },
  paymentNo: {
    fontSize: 16,
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    lineHeight: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
    marginStart: 10,
    textAlign: 'left',
  },
  paymentNo1: {
    fontSize: 16,
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    lineHeight: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'left',
  },
  superScript: {
    lineHeight: 18,
    fontSize: 12,
    fontFamily: fonts.primarySB,
  },
  horizontalDivider: {
    borderBottomColor: colors.appGray1,
    borderBottomWidth: 1,
  },
  subHeading: {
    fontSize: 16,
    fontFamily: fonts.primary,
    color: colors.appBlack,
    marginStart: 10,
    paddingTop: 10,
    textAlign: 'left',
  },
  content: {
    flexDirection: 'row',
    // paddingVertical: 10,

    alignItems: 'center',
  },
  budgetType: {
    color: colors.skyBlue,
    fontFamily: fonts.primarySB,
    fontSize: 16,
    marginStart: 30,
    marginEnd: 10,
    textAlign: 'left',
  },
  amount: {
    fontSize: 14,
    fontFamily: fonts.secondary,
    color: colors.appBlack,
    textAlign: 'left',
  },
  attachmentContainer: {
    // borderTopWidth: 0.5,
    borderColor: colors.appGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  attachmentText: {
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
    flex: 1,
    textAlign: 'left',
    paddingStart: 10,
  },
  addAttachmentOptionalText: {
    color: colors.appGray,
    fontFamily: fonts.primarySB,
    fontSize: 14,
    textAlign: 'left',
    textAlign: 'left',
  },
  attachmentImageContainer: {
    flexDirection: 'row',

    borderBottomWidth: 0.5,
    borderColor: colors.appGray,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  attachmentImage: {
    width: 70,
    height: 70,

    alignSelf: 'center',

    flex: 0.2,
    justifyContent: 'flex-start',
  },
  attachmentImageText: {
    fontSize: 14,
    fontFamily: fonts.primary,
    color: colors.appGray,
    marginHorizontal: 10,
    flex: 0.8,
    textAlign: 'left',
  },
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.skyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerButtonContainer: {
    paddingBottom: 50,
    // marginHorizontal: 10,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  saveButton: {
    borderColor: colors.appBlue,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: colors.appGreen,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveText: {
    color: colors.appBlue,
    marginEnd: 5,

    fontSize: 16,
  },
  applytext: {
    color: colors.defaultWhite,
    marginEnd: 5,
    fontSize: 16,
  },
  toggle: {
    // alignItems: "center",
    paddingVertical: 10,
    backgroundColor: colors.defaultWhite,
    elevation: 5,
    borderRadius: 5,
    // position: "absolute",
    // top: -10,
    // start: 130,
    // alignSelf: "center"
  },
  toggleOption: {
    fontFamily: fonts.primarySB,
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignSelf: 'center',
    textAlign: 'left',
  },
});

export default styles;
