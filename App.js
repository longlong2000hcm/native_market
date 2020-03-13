import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from 'react-native-vector-icons';
import Shop from './components/Shop'
import MyPostings from './components/MyPostings'

const Tab = createBottomTabNavigator();
const apiURI = "https://native-market-server.herokuapp.com";

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
        name="Shop" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="shop" color={color} size={size} />)
        }}
        >
          {props=><Shop {...props} apiURI={apiURI}></Shop>}
        </Tab.Screen>
        <Tab.Screen 
        name="My Postings" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />)
        }}
        >
        {props=><MyPostings {...props} apiURI={apiURI}></MyPostings>}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
