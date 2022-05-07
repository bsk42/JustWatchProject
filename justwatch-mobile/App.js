import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import InitialScreen from './Src/Screens/InitialScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './Src/Screens/Login';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ title: 'Welcome to JustWatch!' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'JustWatch' }} />
      </Stack.Navigator>
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
