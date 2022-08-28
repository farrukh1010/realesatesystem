import React, {useState} from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { View, Text,  Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { TextInput } from 'react-native-paper';
import logo from "../../assets/images/logo.jpg"
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
// import { Icon } from 'react-native-paper/lib';
import auth from "@react-native-firebase/auth"

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const initialState = { email: "", password: "" }

export default function Register({ navigation }) {
    const { dispatch } = useAuthContext()
    const [state, setState] = useState(initialState)
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = (name, value) => {
        setState(s => ({ ...s, [name]: value }))

    }

const handleRegister=()=>{
    let { email, password } = state

    if (!email) return alert("Email is invalid")
    if (!password) return alert("Password is invalid")
   console.log(email,password)
    setIsProcessing(true)
    auth()
    .createUserWithEmailAndPassword(email, password)
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
            <View style={styles.Login}>

                <View style={{ alignItems: "center" }}>
                    <Image style={styles.image} source={logo} />
                </View>
                <View style={{ margin: 16 }}>
                    <TextInput
                    // InputLeftElement={
                    //     <MaterialIcons name="email"size={20 }color={green}/>
                    // }
                        style={{ backgroundColor: "transparent" }}
                       
                        label="Email"
                        value={state.email}
                        onChangeText={value => handleChange("email", value)}
                        mode='outlined'
                    />
                </View>
                <View style={{ marginVertical: 10, marginHorizontal: 16 }}>
                    <TextInput
                        style={{ backgroundColor: "transparent" }}
                        label="Password"
                        value={state.password}
                        onChangeText={value => handleChange("password", value)}
                        mode='outlined'
                        secureTextEntry={isPasswordShow ? false : true}
                        right={<TextInput.Icon name={isPasswordShow ? "eye" : "eye-off"} onPress={() => { setIsPasswordShow(!isPasswordShow) }} />}
                    />
                </View>
               
                <View style={styles.register}>
                    <View style={styles.row}>
                        <TouchableOpacity style={{ marginRight: 5 }}>
                            <Text style={{ color: "white" }}>Already a member?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: "#d63031", }}>Login </Text>
                        </TouchableOpacity>
                    </View>
                
                
                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", marginVertical: 12, marginHorizontal: 16,  }}>
                    <TouchableOpacity loading={isProcessing} disabled={isProcessing}  onPress={handleRegister} style={{ backgroundColor: "black", borderRadius: 20 }} ><Text style={{ color: "#fff", marginHorizontal: 20, marginVertical: 6 ,}}>Sign Up</Text></TouchableOpacity>
                </View>


                </View>

            </View>

          
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 200,
        top: -80
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
        borderTopRightRadius: 60
    },
    register: {
        width: "100%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 8,
        marginRight: 10
    }
})