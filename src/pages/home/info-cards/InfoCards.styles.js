import {StyleSheet, Dimensions} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // flex: 1,

    marginVertical: 10,
    borderRadius: 10,
    overflow:"hidden"
  },

  cardImage: {
    alignSelf: 'center',

    width: width * 0.8,
    height: (width * 0.8 * 3) / 4,

    // borderRadius: 10,
    // marginHorizontal: 50,
  },
  cardText: {
    position: 'absolute',
    left: 25,
    bottom: 20,
    color: colors.defaultWhite,
    fontFamily: fonts.secondary,
  },
});

export default styles;
