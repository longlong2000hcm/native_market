import React, { useState } from 'react'
import { View, Text, TextInput, TouchableHighlight, Button, StyleSheet } from 'react-native'
import { Base64 } from 'js-base64'



const LoginScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function loginClick() {
    let form = new FormData();
    form.append("username", userName);
    form.append("password", password);
    fetch(props.apiURI + '/login', {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: form
    })
    .then(response => {
      if (response.status==401) {
        console.log(response.json())
        alert("Wrong username or password")
      }
      if (response.ok == false) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      return response.json();
    })
    .then(json => {
      console.log("Login successful")
      console.log("Received following JSON");
      console.log(json);
      props.onLoginReceiveJWT(json.token, json.idUser, json.username);
    })
    .catch(error => {
      console.log("Error message:")
      console.log(error.message)
    });
  }

  return (
    <View style={ styles.screen }>
      <Text style={ styles.header }>Login</Text>
      <Text style={ styles.text }>Username</Text>
      <TextInput
        style={ styles.input }
        value={ userName }
        placeholder="username"
        onChangeText={ value => setUserName(value)}
      />
      <Text style={ styles.text }>Password</Text>
      <TextInput
        style={ styles.input }
        value={ password }
        secureTextEntry={true}
        placeholder="password"
        onChangeText={ value => setPassword(value)}
      />
      <TouchableHighlight onPress={ () => loginClick() }>
        <View style={ styles.primaryButton }>
          <Text style={ styles.primaryButtonText }>Login</Text>
        </View>
      </TouchableHighlight>
      <Button title="Sign up" color="rgb(0, 222, 26)" onPress={ () => props.navigation.navigate('Signup') } />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 40,
    marginBottom: 20,
    color: 'black'
  },
  text: {
    fontSize: 20,
    color: 'white'
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "gray",
    height: 40,
    width: '90%',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 5,
    marginBottom: 20
  },
  primaryButton: {
    backgroundColor: 'rgb(0, 149, 255)',
    borderRadius: 5,
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20,

  }
});

export default LoginScreen
