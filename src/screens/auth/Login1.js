import React, { useState } from 'react'
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import download from "../../assets/images/download.png"
// import { Icon } from 'react-native-paper/lib';
import { useAuthContext } from '../../contexts/AuthContext'
import auth from "@react-native-firebase/auth"


const initialState = { email: "", password: "" }
export default function Login({ navigation }) {

    const { dispatch } = useAuthContext()

    const [state, setState] = useState(initialState)
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = (name, value) => {
        setState(s => ({ ...s, [name]: value }))

    }
    const handleLogin = () => {

        let { email, password } = state

        if (!email) return alert("Email is invalid")
        if (!password) return alert("Password is invalid")

        setIsProcessing(true)

        auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user

                dispatch({ type: "LOGIN", payload: { user } })
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            })
            .finally(() => {
                setIsProcessing(false)
            })

    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#dee2ff" }}>

            <View style={styles.upperPart}></View>
            <View style={[styles.Login]}>

                <View style={{ alignItems: "center", marginBottom: 0 }}>
                    <Image style={[styles.image, { marginBottom: 0 }]} source={download} />
                </View>
                {/* <View style={{ alignItems: "center" }}> */}
                <Text style={[styles.h1, { textAlign: "center", marginTop: 100 }]}>Login</Text>
                {/* </View> */}
                <View style={{ marginHorizontal: 16 }}>
                    <TextInput
                        style={{ backgroundColor: "transparent" }}
                        label="Email"
                        value={state.email}
                        onChangeText={value => handleChange("email", value)}
                        mode='outlined'
                        keyboardType="email-address"
                    />
                </View>
                <View style={{ marginVertical: 10, marginHorizontal: 16 }}>
                    <TextInput
                        style={{ backgroundColor: "transparent" }}
                        label="Password"
                        mode='outlined'
                        value={state.password}
                        onChangeText={value => handleChange("password", value)}
                        secureTextEntry={isPasswordShow ? false : true}
                        right={<TextInput.Icon name={isPasswordShow ? "eye" : "eye-off"} onPress={() => { setIsPasswordShow(!isPasswordShow) }} />}
                    />
                </View>


                <View style={[styles.register, { marginBottom: 100 }]}>
                    <View style={styles.row}>
                        <TouchableOpacity style={{ marginRight: 5 }}>
                            <Text style={{ color: "white" }}>Not a member?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={{ color: "#d63031" }}>Sign Up </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center", marginVertical: 12 }}>
                        <TouchableOpacity loading={isProcessing} disabled={isProcessing} onPress={handleLogin} style={{ backgroundColor: "black", borderRadius: 20 }} ><Text style={{ color: "#fff", marginHorizontal: 20, marginVertical: 6, }}>Login</Text></TouchableOpacity>
                    </View>
                </View>


            </View>


        </ScrollView >
    )
}
const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 200,
        top: -80,
        position: "absolute"
    },
    upperPart: {
        height: 200,
        width: "100%",
        backgroundColor: "transparent",

    },
    Login: {
        borderTopLeftRadius: 60,
        backgroundColor: "#aeb8fe",
        flex: 1,
        borderTopRightRadius: 60,
    },
    register: {
        width: "100%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 8,
        marginRight: 20
    },
    h1: {
        fontSize: 40,
        color: "white",
        marginBottom: 24,
        alignItems: "center",

    }
})