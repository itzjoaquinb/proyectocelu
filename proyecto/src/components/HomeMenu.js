import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Home from "../screens/Home"
import NuevoPost from "../screens/NuevoPost"
import Profile from "../screens/Profile"
const Tab = createBottomTabNavigator()


class HomeMenu extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ()=><Entypo name="home" size={24} color="black" />, headerShown: false}}/>
                <Tab.Screen name="NuevoPost" component={NuevoPost} options={{tabBarIcon:()=> <AntDesign name="plus-square" size={24} color="black" />,headerShown: false  }}/>
                <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: ()=> <MaterialIcons name="account-circle" size={24} color="black" />,headerShown: false}}/>
            </Tab.Navigator>
        )
    }
}

export default HomeMenu