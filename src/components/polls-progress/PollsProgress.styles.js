import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
  },
  pollsStepsContainer: {
    position: 'absolute',
    top: 10,

    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderColor: colors.skyBlue,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: colors.appBackground,
  },
  pollsStepText: {
    color: colors.appGray,
  },
});

export default styles;
