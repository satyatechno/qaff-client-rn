const {StyleSheet} = require('react-native');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    // paddingHorizontal: 15,
    flex: 1,
  },
  image: {
    height: 150,
    width: 150,
  },
  optionView: {
    paddingVertical: 75,
    borderRadius: 15,
    backgroundColor: colors.defaultWhite,
    elevation: 5,
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  optionView1: {
    borderRadius: 15,
    backgroundColor: colors.skyBlue,
    elevation: 5,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 70,
    marginHorizontal: 15,
    paddingHorizontal: 20,
  },
  imageOption1: {
    height: 50,
    width: 150,
  },
  imageVisa: {
    height: 45,
    width: 100,
    marginTop: 5,
  },
  imageMarstercard: {
    height: 60,
    width: 100,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentText: {
    color: colors.skyBlue,
    fontSize: 20,
    fontFamily: fonts.primarySB,
  },
  button: {
    backgroundColor: colors.appViolet,
    marginHorizontal: 15,
    // paddingVertical: 15,
    height: 45,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    flexDirection: 'row',
  },
  check: {
    backgroundColor: colors.skyBlue,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    end: -15,
    top: -15,
  },
  buttonText: {
    color: colors.defaultWhite,
    fontSize: 16,
    fontFamily: fonts.primarySB,
  },
});

export default styles;
