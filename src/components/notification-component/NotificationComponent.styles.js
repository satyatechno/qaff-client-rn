import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
export const { width, height } = Dimensions.get('window');
const statusbarHeight = StatusBar.currentHeight;
const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'android' ? 60 + statusbarHeight : 90,
    width: width * 0.8,
    backgroundColor: colors.skyBlue,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: statusbarHeight,

  },

  titleContainer: {
    // flex: 1,
  },
  title: {
    color: colors.defaultWhite,
    fontFamily: fonts.primarySB,
    fontSize: 22,
    paddingTop: 20

  },
  body: {
    height: height,

    backgroundColor: colors.defaultWhite
  },
  imageContainer: {
    height: height,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -60

  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 10
  },
  imageContainerText: {
    fontSize: 14,
    fontFamily: fonts.primary,
    color: colors.appGray
  },
  sectionItem: {
    flexDirection: "row",
    paddingHorizontal: 10
  },
  saperator: {
    height: 1,
    backgroundColor: colors.appGray1,
    marginStart: 15
  },
  sectionHeader: {
    backgroundColor: colors.appGray1,
    padding: 10,
    fontFamily: fonts.primary,
    color: colors.appBlack,
    fontSize: 16
  },
  sectionItemTitleView: {
    paddingTop: 10,
    flex: 1
  },
  sectionItemTitle: {
    color: colors.appBlack,
    fontSize: 16,
    fontFamily: fonts.primary,
    textAlign: "left"

  },
  sectionItemTime: {
    color: colors.appGray,
    fontSize: 12,
    marginBottom: 15,
    textAlign: "left"
    // fontFamily:fonts.primary,
  },

})
export default styles