import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
  },
  profileImage: {
    width: 140,
    height: 140,
    // borderRadius:50,
    alignSelf: 'center',
    marginTop: 10,
    // resizeMode:"cover"
  },
  editContainer: {
    position: 'absolute',
    end: 0,
    top: 0,
  },
  editimage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileOwnerName: {
    fontFamily: fonts.primarySB,
    color: colors.appGray,
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  locationName: {
    color: colors.appGray,
    marginStart: 5,
    textAlign: 'left',
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: colors.defaultWhite,

    marginStart: 15,
    paddingVertical: 15,

    // borderBottomWidth: 0.2,
    // borderColor: colors.appGray,
  },
  Button: {
    backgroundColor: colors.appGreen,
    height: 45,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
  },
  listItem: {
    fontSize: 16,
    backgroundColor: colors.defaultWhite,
    // flex: 1,
    marginStart: 10,
    // fontFamily: fonts.primary,
    color: colors.appBlack,
    textAlign: 'left',
  },
  listItemHeader: {
    marginTop: 30,
    paddingBottom: 10,
    // borderBottomWidth: 0.5,
    // borderColor: colors.appGray,
  },
  listItemHeaderText: {
    fontSize: 20,
    color: colors.appYellow,
    marginStart: 15,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  value: {
    fontSize: 16,
    // fontFamily: fonts.secondary,
    marginStart: 5,
    flex: 1,
    textAlign: 'right',
  },
});

export default styles;
