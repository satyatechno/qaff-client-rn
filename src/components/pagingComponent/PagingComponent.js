import React, { Component } from 'react';
import {Dimensions, View } from 'react-native';
export const { width, height } = Dimensions.get('window');
import Proptypes from "prop-types";
import colors from "src/styles/texts/colors";


class PagingComonent extends Component {
    constructor(props) {
        super();
       
      }
  render() {
  
    var Temp =[]
      for(var index=0;index<this.props.numberOfItem;index++){
         
          Temp.push(  <View 
            key={index}
             style={{
                 height:index==this.props.selectedIndex?2:1,
                 width:index==this.props.selectedIndex?width/this.props.numberOfItem:width/(this.props.numberOfItem*1.8),
                 backgroundColor:index==this.props.selectedIndex?this.props.activeColor:this.props.inactiveColor,
                 borderRadius:2
                 }}>
            
            </View>)
          
      }
          
      return(
          <>
            <View style={{height:40,width:"100%",backgroundColor:"#fff",position:"absolute",top:0,justifyContent:"space-around",flexDirection:"row",alignItems:"center"}}>
           
            {Temp}
            
            </View> 
          </>
      )
      }}
     
      PagingComonent.proptypes={
       activeColor:Proptypes.string,
       inactiveColor:Proptypes.string,
       numberOfItem:Proptypes.number.isRequired,
       selectedIndex:Proptypes.number
      }
      PagingComonent.defaultProps={
         activeColor:colors.skyBlue,
         inactiveColor:colors.appGray1,
         selectedIndex:0
      }
      export default PagingComonent
