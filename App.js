import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Dicas from './Pages/Dicas';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
   return(

     <NavigationContainer  >
      <Stack.Navigator  >
        <Stack.Screen  name="EduX" component={Dicas} 
            options={{
              title: 'EduX',
              headerStyle: {
                backgroundColor: '#9D0DCA',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
        />
       
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
  menu: {
    backgroundColor: '#9D0DCA',
  }

});
