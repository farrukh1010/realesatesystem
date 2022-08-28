import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';
import logo from "../../assets/images/logo.jpg"

export default function Login() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ alignItems: "center" }}>
                <Image style={styles.image} source={logo} />
            </View>
            <View style={{ margin: 16 }}>
                <TextInput
                    label="Email"
                />
            </View>
            <View style={{ marginVertical: 10 }}>
                <TextInput
                    label="Password"
                />
            </View>


        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200
    }
})