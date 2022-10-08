import { StyleSheet } from 'react-native';

import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title_date_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    textAlign: "left",
    flex: 0.9
  },
  date: {
    fontSize: 16,
    color: colors.appViolet,
    fontFamily: fonts.primary,
  },
  description: {
    color: colors.appGray,
    fontSize: 14,
    fontFamily: fonts.secondary,
    paddingBottom: 10,
    textAlign: "left",
  },
  main_image: {
    width: '100%',
    height: 250,
    marginBottom: 10,
  },
  secondary_images: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  peopleImage: {
    width: '100%',
    height: 300,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default styles;
