import {StyleSheet, Dimensions, Platform, I18nManager} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {},
  logoContainer: {
    marginStart: 10,
    textAlign: 'left',
    alignItems: 'flex-start',
    flex: 0.3,
  },

  logo: {
    width: 50,
    height: 34.57,
  },
  titleContainer: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.defaultWhite,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'center',

    textAlign: 'center',
  },
  iconContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  headerInput: {
    // width: '100%',

    color: colors.defaultWhite,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.defaultWhite,
    marginHorizontal: 20,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    marginTop: 5
   
  },
  headerRightImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginEnd: 10,
  },
});

export default styles;
