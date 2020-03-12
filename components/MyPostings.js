import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import LoginScreen from './myPostingsComponents/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignUpScreen from './myPostingsComponents/SignUpScreen'
import SignUpCompleted from './myPostingsComponents/SignUpCompleted'
import * as SecureStore from 'expo-secure-store'
import LoadingScreen from './myPostingsComponents/LoadingScreen'
import Postings from './myPostingsComponents/Postings'
import CreatePosting from './myPostingsComponents/CreatePosting'

const Stack = createStackNavigator();
const secureStoreTokenName = "demoAppJWT2";

export default class AuthDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiURI: "http://130.231.3.154:3000",
            isCheckingTokenStorage: true,
            activeJWT: null
        };
    }

    componentDidMount() {
        // Check for stored JWT when the application loads
        SecureStore.getItemAsync(secureStoreTokenName)
            .then(response => {
                console.log("SecureStore.getItemAsync success")
                this.setState({ activeJWT: response, isCheckingTokenStorage: false })
            })
            .catch(error => {
                console.log("SecureStore.getItemAsync error")
                console.log(error);
            });
    }


    onLoginReceiveJWT = (responseJWT) => {
        // Deal with successful login by storing the token into secure store
        SecureStore.setItemAsync(secureStoreTokenName, responseJWT)
            .then(response => {
                console.log(response);
                this.setState({ activeJWT: responseJWT, isCheckingTokenStorage: false })
            })
    }



    authLogic = () => {
        const authScreens = (
            <>
                <Stack.Screen
                    name="Login"
                    options={{
                        headerShown: false,
                    }}
                >
                    {props => <LoginScreen {...props} onLoginReceiveJWT={this.onLoginReceiveJWT} apiURI={this.state.apiURI}></LoginScreen>}
                </Stack.Screen>
                <Stack.Screen
                    name="Signup"
                    options={{
                        headerShown: false,
                    }}
                >
                    {props => <SignUpScreen {...props} apiURI={this.state.apiURI}></SignUpScreen>}
                </Stack.Screen>
                <Stack.Screen
                    name="SignupCompleted"
                    options={{
                        headerShown: false,
                    }}
                >
                    {props => <SignUpCompleted {...props}></SignUpCompleted>}
                </Stack.Screen>
            </>
        );

        const app = (
            <>
                <Stack.Screen
                    name="Postings"
                    options={{
                        headerShown: false,
                    }}>
                    {props => <Postings
                        {...props}
                        jwt={this.state.activeJWT}
                        apiURI={this.state.apiURI}
                        onLogout={this.onLogout}
                    ></Postings>}
                </Stack.Screen>
                <Stack.Screen
                    name="CreatePosting"
                    options={{
                        headerShown: false,
                    }}>
                    {props => <CreatePosting
                        {...props}
                        jwt={this.state.activeJWT}
                        apiURI={this.state.apiURI}
                        onLogout={this.onLogout}
                    ></CreatePosting>}
                </Stack.Screen>
            </>
        )



        const checkingForTokenStorage = (
            <Stack.Screen name="Loading" component={LoadingScreen} />
        )

        if (this.state.isCheckingTokenStorage) {
            console.log('Checking is token stored');
            return checkingForTokenStorage;
        }
        else {
            if (this.state.activeJWT != null) {
                console.log('JWT Token found, displaying application logged in views');
                return app;
            }
            else {
                console.log('JWT Token not found, displaying application authentication views');
                return authScreens;
            }
        }
    }

    onLogout = () => {
        console.log("Logout clicked");
        this.setState({ activeJWT: null });
        SecureStore.deleteItemAsync(secureStoreTokenName);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Stack.Navigator>
                    {this.authLogic()}
                </Stack.Navigator>
            </View>
        )
    }
}
