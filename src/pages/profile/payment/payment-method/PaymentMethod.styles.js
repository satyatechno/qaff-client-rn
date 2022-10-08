import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  choosePaymentText: {
    marginStart: 10,
    textAlign: 'center',
    paddingTop: 20,
    fontSize: 18,
    color: colors.skyBlue,
    fontFamily: fonts.primarySB,
    marginBottom: 20,
  },
  // cardContainer: {
  //   backgroundColor: colors.defaultWhite,
  //   flexDirection: 'row',
  //   padding: 10,
  //   alignItems: 'center',
  //   borderBottomColor: colors.appGray1,
  //   borderBottomWidth: 1,
  //   marginHorizontal: 10,
  //   elevation: 5,
  // },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  cardName: {
    paddingStart: 20,
    flex: 1,
  },
  cardContainer: {
    backgroundColor: colors.appGray1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    // paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
});
