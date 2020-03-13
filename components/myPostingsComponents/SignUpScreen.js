import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableHighlight } from 'react-native'

const SignUpScreen = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signupPressed = async () => {
    let form = new FormData();
    form.append("username", username);
    form.append("password", password);
    fetch(props.apiURI + '/register', {
      method: 'POST',
      body: form,
      headers: {
        "Content-type": "multipart/form-data"
      }
    })
      .then(response => {
        if (response.ok == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.json();
      })
      .then(json => {
        console.log(json)
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'SignupCompleted' }],
        })
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });

  }

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Sign Up</Text>
      <Text>Please enter your username</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder="username"
        onChangeText={value => setUsername(value)}
      />
      <Text>Please enter your password</Text>
      <TextInput
        style={styles.input}
        value={password}
        placeholder="password"
        onChangeText={value => setPassword(value)}
      />
      <TouchableHighlight onPress={() => signupPressed()}>
        <View style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Sign up</Text>
        </View>
      </TouchableHighlight>
      <Button
        title="Cancel"
        color="#000000"
        onPress={
          () => props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        } />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgb(227, 178, 0)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 40,
    marginBottom: 20,
    color: 'white'
  },
  text: {
    fontSize: 20,
    color: 'white'
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    width: '90%',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 5,
    marginBottom: 20
  },
  primaryButton: {
    backgroundColor: 'rgb(0, 153, 51)',
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 10
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20

  }
});


export default SignUpScreen
