import { StyleSheet } from 'react-native';

import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  portfolioContainer: {
    margin: 10,
    marginVertical: 5,
    elevation: 2,
    backgroundColor: colors.defaultWhite,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  portfolioInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  title: {
    fontFamily: fonts.primarySB,
    fontSize: 18,
    color: colors.appBlack,
    textAlign: "left",
    flex: 0.9
  },
  date: {
    fontSize: 16,
    fontFamily: fonts.primary,
    color: colors.appViolet,
  },
  description: {
    fontSize: 14,
    color: colors.appGray,
    fontFamily: fonts.secondary,
    textAlign: "left"
  },
});

export default styles;
