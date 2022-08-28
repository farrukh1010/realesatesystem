import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

export default function Header(navigation) {
  return (
    <View style={styles.header}>
    <Text style={styles.text} onPress={()=>{navigation}} >Social Real Estate System </Text>
  </View>
  )
}
const styles=StyleSheet.create({
    header:{
           backgroundColor:"#1d5968",
           paddingVertical:16
    },
    text:{
        color:"white",
        textAlign:"center",
        fontWeight:"bold"
    }
})