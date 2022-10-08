import {StyleSheet, Dimensions} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const {width} = Dimensions.get('window');


 const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  //  height:185,
   width:width/2-20,

   alignItems:"center",
   margin:4,
   borderRadius:3,
   overflow:"hidden",
   elevation:2
  },
  imageView:{
      height:135,
      width:"100%",
      overflow:"hidden"},
 
  textStyle:{
    fontSize: 14,
    textAlign: 'center',
    fontFamily: fonts.secondary,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 12,
    color: colors.appBlack,
  },
 
})
export default styles