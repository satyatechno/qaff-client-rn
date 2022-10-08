import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.skyBlue,
    justifyContent: 'center',
    height: 45,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  buttonText: {
    color: colors.defaultWhite,
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: fonts.secondarySB,
    paddingHorizontal: 10,
  },
});

export default styles;
