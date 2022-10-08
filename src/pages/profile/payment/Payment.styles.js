import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  choosePaymentText: {
    marginStart: 10,
    textAlign: 'left',
    paddingTop: 20,
    fontSize: 18,
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
  },
  cardHolderName: {
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    fontSize: 16,
    textAlign: 'left',
    paddingStart: 10,
  },
  noCard: {
    fontFamily: fonts.primarySB,
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: colors.skyBlue,
    width: 60,
    height: 60,
    borderRadius: 30,

    position: 'absolute',

    right: 20,
    bottom: 10,

    // marginHorizontal: 15,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: colors.appGray1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    height: 180,
  },
  cardCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  cardImage: {
    width: null,
    height: null,
    // resizeMode: 'contain',
    flex: 1,
  },
  cardName: {
    paddingStart: 20,
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    fontSize: 16,
  },
  cardNo: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'right',
    paddingBottom: 10,
    paddingEnd: 10,
  },
  paymentBrand: {
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    textAlign: 'left',
    paddingBottom: 10,
    paddingStart: 10,
  },
});
