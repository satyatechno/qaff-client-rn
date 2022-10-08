import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  jobTypeText: {
    paddingTop: 20,
    fontSize: 18,
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
  },
  input: {
    fontSize: 14,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
  },
  acceptButton: {
    padding: 15,
    backgroundColor: colors.appViolet,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButtonText: {
    color: colors.defaultWhite,
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  acceptButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default styles;
