import React, { Component, useState } from 'react'
import { Text, View, TextInput, TouchableHighlight, Button } from 'react-native'

const Todos = (props) => {

  const [todoDescription, setTodoDescription] = useState("");  
  
  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-start', marginTop: 30}}>        
        <Text >Add new todo</Text>
        <View style={{ flexDirection: 'row', height: 40, width: '90%', justifyContent: 'center', marginBottom: 40}}>
          <TextInput style={{ flex: 2, borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setTodoDescription(value) }
            value={ todoDescription }>
          </TextInput>          
          <TouchableHighlight onPress={ () => props.onTodoAdd(todoDescription, '25-02-2020') }>
            <View style={ { flex: 1, backgroundColor: 'blue',} }>
              <Text style={{ color: 'white', padding: 10 }}>Save</Text>
            </View>
          </TouchableHighlight>
        </View>        
        <Text style={{ fontSize: 25 }}>Todos</Text>
        {
          props.todos.map(t => <Text key={t.id}>{ t.description }</Text>)
        }
      </View>
  )
}

export default Todos




