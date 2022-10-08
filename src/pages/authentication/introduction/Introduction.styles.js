import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
// import {isRTL} from 'src/locale/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    position: 'relative',
  },
  logo: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    borderRadius: 70,
    // marginTop: '20%',

    marginBottom: 30,
  },
  child: {
    flex: 1,
    // height: height,
    width: width,
    alignItems:'center',
    justifyContent:'center'

  },
  skip: {
    fontSize: 18,
    color: colors.appGray,
    textAlign: 'right',
    paddingHorizontal: 20,
    fontFamily: fonts.secondary,
    paddingTop:10
  },
  header: {
    // color: '#383E56',
    color: colors.appBlack,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,

    fontFamily: fonts.primarySB,
  },

  description: {
    color: colors.appBlack,
    fontSize: 16,
height:'20%',
    width: 300,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: fonts.secondary,
  },
  arrowForward: {
    alignSelf: 'flex-end',

    paddingHorizontal: 20,
    marginBottom: 1,
  },
  arrowBackward: {
    paddingHorizontal: 20,
    marginBottom: 1,
    position: 'absolute',
    bottom: 0,
  },
});

export default styles;
