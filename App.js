import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from 'react-native-vector-icons';
import Shop from './components/Shop'
import MyPostings from './components/MyPostings'


const Tab = createBottomTabNavigator();

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
        component={Shop} 
        />
        <Tab.Screen 
        name="My Postings" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />)
        }}
        component={MyPostings} 
        />
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
