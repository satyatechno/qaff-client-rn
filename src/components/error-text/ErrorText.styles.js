import { I18nManager, StyleSheet } from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 2,
    alignSelf: "flex-start"
  },
  text: {
    fontSize: 14,
    color: colors.appRed,
  },
});

export default styles;
