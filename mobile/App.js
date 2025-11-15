import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import StudentDetailScreen from './src/screens/StudentDetailScreen';
import AddStudentScreen from './src/screens/AddStudentScreen';
import EditStudentScreen from './src/screens/EditStudentScreen';

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
        <Stack.Screen 
          name="AddStudent" 
          component={AddStudentScreen}
          options={{ 
            title: 'Novo Aluno'
          }}
        />
        <Stack.Screen 
          name="EditStudent" 
          component={EditStudentScreen}
          options={{ 
            title: 'Editar Aluno'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}