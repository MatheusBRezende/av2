import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import StudentDetailScreen from './src/screens/StudentDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: 'Lista de Alunos'
          }}
        />
        <Stack.Screen 
          name="StudentDetail" 
          component={StudentDetailScreen}
          options={{ 
            title: 'Detalhes do Aluno'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}         