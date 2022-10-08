import colors from 'src/styles/texts/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  cardTypeContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTypeText: {
    color: colors.appBlack,
    fontSize: 16,
    // marginTop: 5,
  },
  cardType: {
    color: colors.appBlack,
    fontSize: 16,
    paddingEnd: 10,
    fontWeight: 'bold',
  },
  cardNumberText: {
    paddingStart: 10,
    textAlign: 'left',
    color: colors.appBlack,
    fontSize: 16,
  },
  cardNoInputContainer: {
    borderWidth: 2,
    borderColor: colors.skyBlue,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,

    marginBottom: 10,
  },
  cardNoInput: {
    fontSize: 16,
    paddingVertical: 5,
  },
  expAndCvvContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 5,
  },
  expContainer: {
    justifyContent: 'flex-start',
    paddingStart: 10,
    flex: 0.4,
  },
  expText: {
    textAlign: 'left',
    color: colors.appBlack,
    fontSize: 16,
    marginBottom: 10,
  },
  expButton: {
    borderWidth: 2,
    borderColor: colors.skyBlue,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  expValue: {
    color: colors.appBlack,
    fontSize: 16,
  },
  cvvContainer: {
    justifyContent: 'flex-start',
    paddingEnd: 10,
    flex: 0.4,
  },
  cvvText: {
    textAlign: 'left',
    color: colors.appBlack,
    fontSize: 16,
    marginBottom: 10,
  },
  cvvNoInput: {
    borderWidth: 2,
    borderColor: colors.skyBlue,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  saveCardButton: {
    marginTop: 40,
    height: 45,
    backgroundColor: colors.skyBlue,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveCardText: {
    color: colors.defaultWhite,
    fontSize: 16,
    textAlign: 'center',
  },
});
