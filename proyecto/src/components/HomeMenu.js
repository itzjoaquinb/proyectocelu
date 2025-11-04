
import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import Home from "../screens/Home"
import Profile from "../screens/Profile"

import NewPost from "../screens/NewPost"; 

const Tab = createBottomTabNavigator()


class HomeMenu extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Tab.Navigator screenOptions={{tabBarShowLabel:false}}> 
                <Tab.Screen 
                    name="Home" 
                    component={Home} 
                    options={{
                        tabBarIcon: ()=><Entypo name="home" size={24} color="black" /> 
                    }}
                />
                <Tab.Screen 
                    component={NewPost} 
                    options={{
                        tabBarIcon: ()=> <Ionicons name="add-circle" size={24} color="black" />
                    }}
                />
                <Tab.Screen 
                    name="Profile" 
                    component={Profile} 
                    options={{
                        tabBarIcon: ()=> <MaterialIcons name="account-circle" size={24} color="black" />
                    }}
                />
            </Tab.Navigator>
        )
    }
}

export default HomeMenu