import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.appBackground,
    flex: 1,
    paddingHorizontal: 10,
  },
  tabsContainerStyle: {
    marginVertical: 20,
    marginHorizontal: 10,
    height: 40,
    borderWidth: 0,
    backgroundColor: colors.appGray2,
    padding: 2,
    borderRadius: 10,
  },
  tabStyle: {
    backgroundColor: colors.appGray2,
    borderColor: colors.appGray2,
    borderWidth: 0,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    borderRadius: 10,
  },
  tabTextStyle: {
    color: colors.appGray,
    fontFamily: fonts.secondarySB,
    fontSize: 14,
  },
  activeTabStyle: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 10,
    borderColor: colors.appGray2,
    borderWidth: 0,
    elevation: 2,
  },
  activeTabTextStyle: {
    color: colors.skyBlue,
    fontSize: 16,
    fontFamily: fonts.secondarySB,
  },
  categoriesRow: {
    flexDirection: 'row',
    // marginHorizontal: 10,

    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default styles;
