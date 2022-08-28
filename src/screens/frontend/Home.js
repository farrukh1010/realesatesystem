import { View, Text, StyleSheet } from 'react-native'
import React from 'react'


export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Real Estate System</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    h1:{
        fontSize:32,
        fontWeight:"bold",
        color:"black"
    }
})