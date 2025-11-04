import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { StyleSheet, Text, View } from 'react-native';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import HomeMenu from './src/components/HomeMenu'; 

const Stack = createNativeStackNavigator()

export default function App() {
  return (
   <NavigationContainer> 
    <Stack.Navigator> 
      <Stack.Screen 
        name="HomeMenu" 
        component={HomeMenu} 
        options={ { headerShown: false } } 
      /> 
      <Stack.Screen name="Login" component={Login} /> 
      <Stack.Screen name="Register" component={Register} /> 
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