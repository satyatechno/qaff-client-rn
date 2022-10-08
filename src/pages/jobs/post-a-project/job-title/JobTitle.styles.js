import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
    flex: 1,
  },
  jobTitleText: {
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    paddingVertical: 20,
    color: colors.skyBlue,
    marginStart: 10,
  },
  jobInfoRow: {
    flexDirection: 'row',
    marginHorizontal: 10,

    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default styles;
