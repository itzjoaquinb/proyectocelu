import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Login from './src/screens/Login';
import Register from './src/screens/Register';

import Comentarios from './src/screens/Comentarios'; 

import HomeMenu from "./src/components/HomeMenu";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NuevoPost from './src/screens/NuevoPost'; 
import { Component } from 'react';
import { auth } from './src/firebase/config';

const Stack = createNativeStackNavigator()

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      User: "",
    }
  }
  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      this.setState({User: user});
    });
  }
  render(){
    return(
      <NavigationContainer>
      <Stack.Navigator>
        {this.state.User ? (
          <>
          <Stack.Screen name="HomeMenu" component={HomeMenu} options={{headerShown:false}}/>

          <Stack.Screen name='NuevoPost' component={NuevoPost} options={{headerShown:false}}/> 
          <Stack.Screen name="Comentarios" component={Comentarios}/>
          </>
        ) : (
          <>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
          </>
        )}
      </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;