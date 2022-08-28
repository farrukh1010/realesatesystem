import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import AuthContextProvider from './src/contexts/AuthContext'


export default function App() {
  return (
    <>
   <StatusBar barStyle={"light-content"}backgroundColor="#1d5968"/>
    <AuthContextProvider>
      <AppNavigator/>
     
    </AuthContextProvider>
    </>
  )
}