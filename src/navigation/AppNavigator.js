import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import  {createNativeStackNavigator}  from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Login from '../screens/auth/Login1';
import Register from '../screens/auth/Register1';
import Home from '../screens/frontend/Home';
import { useAuthContext } from '../contexts/AuthContext';
import auth from "@react-native-firebase/auth"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/frontend/Profile';
import Contact from '../screens/frontend/Contact';
import Post from '../screens/frontend/Post';
import Header from '../components/Header';
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const { isAuthenticated, dispatch } = useAuthContext()
    
    // const handleLogout = () => {
    //     auth().signOut()
    //         .then(() => {
    //             dispatch({ type: "LOGOUT" })
    //         })
    //         .catch((err) => {
    //             console.error(err)
    //             alert("Something went wrong")
    //         })
    // }
    return ( 
        <NavigationContainer>
            <Header/>
           {/* <Stack.Navigator> 
       <Stack.Screen name="Login" component={Login}/>
       <Stack.Screen name="SignUp" component={Register}/>
       </Stack.Navigator> */}
           {/* <Stack.Navigator initialRouteName='Register'> */}
                {!isAuthenticated
                    ? <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='Login' component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </Stack.Navigator>
                    : <Tab.Navigator 
                    screenOptions={{
                        // headerRight: () => { return <Button title='Logout' onPress={handleLogout} /> }
                        headerShown:false
                    }}
                    >
                        <Stack.Screen name='Home' component={Home}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="home" color={color} size={size} />
                            ),
                        }}
                        />
                        <Stack.Screen name='Profile' component={Profile}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Profile',
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="user" color={color} size={size} />
                            ),
                        }}
                        />
                        <Stack.Screen name='Contact' component={Contact}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Contact',
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="contacts" color={color} size={size} />
                            ),
                        }}
                        />
                        <Stack.Screen name='Post' component={Post}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Post',
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="upload" color={color} size={size} />
                            ),
                        }}
                        />
                    </Tab.Navigator>
                }
            {/* </Stack.Navigator> */}
       
       
       
        </NavigationContainer>
    )
}