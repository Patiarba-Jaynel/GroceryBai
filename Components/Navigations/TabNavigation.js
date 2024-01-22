import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from "../Screens/HomeScreen";
import Profile from "../Form/Profile";
import Product from "../Container/Product";
import ListScreen from "../Screens/ListScreen";
import CustomHome from "../Form/CustomHome";

import { Context } from "../../utils/context";
import { useContext, useState } from "react";

const Tab = createBottomTabNavigator()


export default function TabNavigation() {

     const [plans, setPlans] = useState(null)
     return (
          <Context.Provider value={plans}>
               <Tab.Navigator
               screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
          
                      if (route.name === 'Home') {
                        iconName = focused
                          ? 'ios-information-circle'
                          : 'ios-information-circle-outline';
                      } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                      }
          
                      // You can return any component that you like here!
                      return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'green',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                         backgroundColor: '#f5f5f5',
                         position: 'absolute',
                         borderTopWidth: 0,
                         elevation: 0,
                    }
                  })}
                  sceneContainerStyle={{
                    backgroundColor:'transparent'
                  }}>
                    <Tab.Screen name="Home" component={HomeScreen} options={{
                         headerShown: false,
                         tabBarLabel: 'Home',
                         tabBarIcon: ({ color, size}) => (
                              <Ionicons name="home" color={color} size={size}/>
                         )
                         }}></Tab.Screen>
                    <Tab.Screen name="CustomHome" component={CustomHome} options={{
                         headerShown: false,
                         tabBarLabel: 'Community Products',
                         tabBarIcon: ({ color, size}) => (
                              <Ionicons name="people-circle-outline" color={color} size={size}/>
                         )
                         }}></Tab.Screen>
                                        <Tab.Screen name="Planner" component={ListScreen} options={{
                         headerShown: false,
                         tabBarBadge: plans,
                         tabBarLabel: 'Planner',
                         tabBarIcon: ({ color, size}) => (
                              <Ionicons name="bookmark-outline" color={color} size={size}/>
                         )
                         }}></Tab.Screen>
                    <Tab.Screen name="Profile" component={Profile} options={{
                         headerShown: false,
                         tabBarLabel: 'Profile',
                         tabBarIcon: ({ color, size}) => (
                              <Ionicons name="person-outline" color={color} size={size}/>
                         )
                         }}></Tab.Screen>
               </Tab.Navigator>
          </Context.Provider>
     )
}