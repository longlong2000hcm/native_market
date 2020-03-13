import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const SignUpCompleted = (props) => {


  return (
    <View style={ styles.screen }>
      <Text style={ styles.header }>Action completed</Text>
      <Button title="Back to My Postings" onPress={ () => props.navigation.reset({
          index: 0,
          routes: [{ name: 'Postings' }],
        })}></Button>
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
  }
});


export default SignUpCompleted
