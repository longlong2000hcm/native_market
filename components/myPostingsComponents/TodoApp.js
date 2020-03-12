import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import View1 from './todoApp/View1'
import Todos from './todoApp/Todos'

const Stack = createStackNavigator();

export default class TodoApp extends Component {

  constructor(props) {

    super(props);
    this.state = {
      todos: []
    }    
  }

  componentDidMount() {
    console.log('getting todos');
    fetch(this.props.apiURI + '/todosJWT', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + this.props.jwt
      }
    })
    .then(response => {
      if (response.ok == false) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      return response.json();
    })
    .then(json => {
      console.log("Todos GET successful")
      console.log("Received following JSON");
      console.log(json);

      this.setState({ todos: json})
    })
    .catch(error => {
      console.log("Error message:")
      console.log(error.message)
    });
  }
  

  onTodoAdd = (description, dueDate) => {
    fetch(this.props.apiURI + '/todosJWT', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + this.props.jwt,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ description, dueDate })
    })
    .then(response => {
      if (response.ok == false) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      return response.json();
    })
    .then(json => {
      console.log("Todos POST successful")
      console.log("Received following JSON");
      console.log(json);

      this.setState({ todos: json})
    })
    .catch(error => {
      console.log("Error message:")
      console.log(error.message)
    });
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="View1">
          { props => <View1 {...props} onLogout={ this.props.onLogout }/>}
        </Stack.Screen>
        <Stack.Screen name="Todos" options={{ title: 'Todo List' }} >    
          { props => <Todos {...props} todos={ this.state.todos } onTodoAdd={ this.onTodoAdd }/>}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }
}
