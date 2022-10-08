import {StyleSheet, Dimensions} from 'react-native';
// const {width, height} = Dimensions.get('window');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newsfeedText: {
    fontSize: 20,
    marginTop: 20,
    marginStart: 10,
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    textAlign: 'left',
  },
  addButton: {
    backgroundColor: colors.skyBlue,
    width: 60,
    height: 60,
    borderRadius: 30,

    position: 'absolute',

    right: 20,
    bottom: 10,

    // marginHorizontal: 15,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    marginStart: 2,
  },
});

export default styles;
