import { StyleSheet } from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.appBackground,
    flex: 1,

  },
  tabsContainerStyle: {
    marginVertical: 20,
    marginHorizontal: 10,
    height: 50,
    borderWidth: 0,
    backgroundColor: colors.appGray2,
    padding: 5,
    borderRadius: 10,
  },
  tabStyle: {
    backgroundColor: colors.appGray2,
    borderColor: colors.appGray2,
    borderWidth: 0,
    borderRadius: 10,
  },
  tabTextStyle: {
    color: colors.appGray,
    fontFamily: fonts.primarySB,
    fontSize: 16,
  },
  activeTabStyle: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 10,
    borderColor: colors.appGray2,
    borderWidth: 0,
  },
  activeTabTextStyle: {
    color: colors.skyBlue,
    fontSize: 18,
  },
  titleText: {
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    fontSize: 20,
    marginHorizontal: 15,
    marginTop: 20,
    textAlign: "left"
  },

});

export default styles;
