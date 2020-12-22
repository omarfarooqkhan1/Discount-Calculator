import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity,Navigation,NavigatorIOS, } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import History from './screens/History';
import HomePage from './screens/HomePage';

const Stack = createStackNavigator();

const App = ({navigation}) => {
  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={"Home"}
        screenOptions = {{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#964B00'
          },
          headerTintColor: 'white'
        }} 
      >
        <Stack.Screen name = "History" component = {History} />
        <Stack.Screen name = "Home" component = {HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;