import React from 'react'
import Home from "./components/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calculator from './components/Calculator';
import Biometry from './components/Biometry';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={ {headerShown: false} } />
        <Stack.Screen name="Calculator" component={Calculator} options={ {headerShown: false} }/>
        <Stack.Screen name="Biometry" component={Biometry} options={ {headerShown: false} }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}