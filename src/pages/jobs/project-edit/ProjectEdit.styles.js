import {StyleSheet, I18nManager} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  whatText: {
    fontSize: 18,
    color: colors.appBlack,
    fontFamily: fonts.primarySB,

    textAlign: 'left',
    marginTop: 20,
  },
  jobTitleText: {
    fontSize: 14,
    fontFamily: fonts.primary,
  },
  whatInput: {
    fontFamily: fonts.primary,
    fontSize: 16,
    height: 60,
    borderBottomWidth: 0.5,
    borderColor: colors.appGray,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  skillsText: {
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
  },
  skills: {
    color: colors.appBlack,
    // fontFamily: fonts.secondary,
    fontSize: 14,
    textAlign: 'left',
    paddingBottom: 10,
    flex: 1,
    // flexWrap: 'wrap',
    // borderBottomWidth: 0.5,
    // borderColor: colors.appGray,
  },
  selectJobTitleText: {
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
  },
  jobTitleInfoContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: colors.appGray,
  },
  jobTitleInfo: {
    flex: 1,
    color: colors.appBlack,
    fontFamily: fonts.primary,
    fontSize: 14,
    textAlign: 'left',
  },
  nextIcon: {
    // flex: 0.1,
  },
  jobText: {
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
  },
  onlineStoreText: {
    color: colors.appBlack,
    fontFamily: fonts.primary,
    fontSize: 14,
    textAlign: 'left',
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: colors.appGray,
  },
  budgetText: {
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
  },
  budgetContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
  },
  budgetDropdownContainer: {
    // flex: 0.32,
    // marginEnd: 10,
    width: 70,
  },
  divider: {
    borderRightWidth: 2,
    borderRightColor: colors.appGray,
    marginEnd: 10,
  },
  budgetRangeText: {
    fontFamily: fonts.primary,
    color: colors.appBlack,
    fontSize: 14,
    flex: 0.68,
    textAlign: 'left',
  },
  timelineText: {
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
  },
  monthsText: {
    flex: 1,
    color: colors.appBlack,
    fontFamily: fonts.primary,
    fontSize: 14,
    textAlign: 'left',
  },
  timelineInfoContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: colors.appGray,
  },
  milestoneText: {
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
  },
  milestoneInfoContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: colors.appGray,
  },
  paymentText: {
    flex: 1,
    color: colors.appBlack,
    fontFamily: fonts.primary,
    fontSize: 14,
    textAlign: 'left',
  },
  describeText: {
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
  },
  describeInput: {
    height: 120,
    marginBottom: 10,
    textAlignVertical: 'top',
    fontSize: 14,
    fontFamily: fonts.secondary,
    borderBottomWidth: 0.5,
    borderColor: colors.appGray,
    fontFamily: fonts.primary,
    color: colors.appBlack,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  describeInputMaxLimit: {
    color: colors.appGray,
    fontFamily: fonts.primary,
    fontSize: 12,
    textAlign: 'left',
  },
  attachmentContainer: {
    // borderTopWidth: 0.5,
    // borderColor: colors.appGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    borderBottomWidth: 0.5,
  },
  attachmentText: {
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
    flex: 1,
  },
  addAttachmentOptionalText: {
    color: colors.appGray,
    fontFamily: fonts.primarySB,
    fontSize: 14,
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
  attachmentImageContainer: {
    flexDirection: 'row',

    borderBottomWidth: 0.5,
    borderColor: colors.appGray,
    alignItems: 'center',
    paddingVertical: 5,
  },
  postButton: {
    backgroundColor: colors.appViolet,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 30,
  },
  postButtonText: {
    color: colors.defaultWhite,
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    textAlign: 'center',
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
  attachmentLimitText: {
    color: colors.appRed,
  },
  errorTextStyle: {
    marginStart: -30,
  },
});

export default styles;
