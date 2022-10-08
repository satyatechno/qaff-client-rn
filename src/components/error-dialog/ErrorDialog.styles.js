import { StyleSheet, } from 'react-native';


import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  errorModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  errorModalText: {
    color: colors.appRed,
    fontSize: 18,
    fontFamily: fonts.primarySB,
    textAlign: 'center',
    marginHorizontal: 30,
  },
  errorModalImage: {
    marginTop: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
export default styles