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
import EditPosting from './myPostingsComponents/EditPosting'
import DeletePosting from './myPostingsComponents/DeletePosting'
import ActionCompleted from './myPostingsComponents/ActionCompleted'

const Stack = createStackNavigator();
const secureStoreTokenName = "NativeMarket";

export default class AuthDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiURI: this.props.apiURI,
            isCheckingTokenStorage: true,
            activeJWT: null,
            idUser: null,
            username: null
        };
    }

    componentDidMount() {
        // Check for stored JWT when the application loads
        SecureStore.getItemAsync(secureStoreTokenName)
            .then(response => {
                console.log("SecureStore.getItemAsync success")
                if (response!==null) {
                    response = response.split("____");
                    console.log({ activeJWT: response[0], idUser: response[1], username: response[2],  isCheckingTokenStorage: false })
                    this.setState({ activeJWT: response[0], idUser: response[1], username: response[2],  isCheckingTokenStorage: false })
                }
                else {
                    this.setState({ activeJWT: response,  isCheckingTokenStorage: false })
                }
            })
            .catch(error => {
                console.log("SecureStore.getItemAsync error")
                console.log(error);
            });
    }


    onLoginReceiveJWT = (responseJWT, idUser, username) => {
        // Deal with successful login by storing the token into secure store
        SecureStore.setItemAsync(secureStoreTokenName, responseJWT+"____"+idUser+"____"+username)
            .then(response => {
                console.log(response);
                this.setState({ activeJWT: responseJWT, isCheckingTokenStorage: false, idUser, username})
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
                        idUser={this.state.idUser}
                        username={this.state.username}
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
                        idUser={this.state.idUser}
                        username={this.state.username}
                    ></CreatePosting>}
                </Stack.Screen>
                <Stack.Screen
                    name="EditPosting"
                    options={{
                        headerShown: false,
                    }}>
                    {props => <EditPosting
                        {...props}
                        jwt={this.state.activeJWT}
                        apiURI={this.state.apiURI}
                        onLogout={this.onLogout}
                        idUser={this.state.idUser}
                        username={this.state.username}
                    ></EditPosting>}
                </Stack.Screen>
                <Stack.Screen
                    name="DeletePosting"
                    options={{
                        headerShown: false,
                    }}>
                    {props => <DeletePosting
                        {...props}
                        jwt={this.state.activeJWT}
                        apiURI={this.state.apiURI}
                        onLogout={this.onLogout}
                        idUser={this.state.idUser}
                        username={this.state.username}
                    ></DeletePosting>}
                </Stack.Screen>
                <Stack.Screen
                    name="ActionCompleted"
                    options={{
                        headerShown: false,
                    }}
                >
                    {props => <ActionCompleted {...props}></ActionCompleted>}
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
