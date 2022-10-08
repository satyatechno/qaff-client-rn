import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
    flex: 1,
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
    flex: 0.7,
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
    fontSize: 15,
    fontFamily: fonts.secondarySB,
  },
  noJobsImage: {
    width: 150,
    height: 160,
    alignSelf: 'center',
    marginTop: '10%',
  },
  noJobsText: {
    fontFamily: fonts.primarySB,
    color: colors.appGray,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  postProjectButton: {
    backgroundColor: colors.appViolet,
    padding: 15,
    marginHorizontal: 40,
    marginTop: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  postProjectText: {
    color: colors.defaultWhite,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fonts.secondarySB,
  },
  addButton: {
    backgroundColor: colors.skyBlue,
    width: 60,
    height: 60,
    borderRadius: 30,
    // alignSelf: 'flex-end',
    position: 'absolute',

    right: 20,
    bottom: 20,

    // marginHorizontal: 15,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  jobCards: {
    flex: 1,
  },
});

export default styles;
