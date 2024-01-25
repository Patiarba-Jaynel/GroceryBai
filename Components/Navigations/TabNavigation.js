import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { Platform, View } from "react-native";
import { Text } from "react-native-paper";


import HomeScreen from "../Screens/HomeScreen";
import Profile from "../Form/Profile";
import Product from "../Container/Product";
import ListScreen from "../Screens/ListScreen";
import CustomHome from "../Form/CustomHome";

import { Context } from "../../utils/context";
import { useContext, useState } from "react";

const Tab = createBottomTabNavigator()


export default function TabNavigation() {

     const [plans, setPlans] = useState()

     
     return (
          <Context.Provider value={[plans, setPlans]}>
               <Tab.Navigator
               screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                      let iconName;
          
                      if (route.name === 'Home') {
                        iconName = focused
                          ? 'ios-information-circle'
                          : 'ios-information-circle-outline';
                      } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                      }
          
                      // You can return any component that you like here!
                      return <Ionicons name={iconName} color={color} />;
                    },
                    tabBarActiveTintColor: '#18B127',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                         backgroundColor: '#D9EDBF',
                         position: 'absolute',
                         bottom: 30,
                         left: 20,
                         right: 20,
                         elevation: 0,
                         borderRadius: 15,
                         justifyContent:'center',
                         paddingBottom: Platform.OS == 'android' ? 25 : 30
                    }
                  })}
                  sceneContainerStyle={{
                    backgroundColor:'transparent'
                  }}

                  >
                    <Tab.Screen name="Home" component={HomeScreen} options={{
                         headerShown: false,
                         tabBarShowLabel:false,
                         tabBarIcon: ({ color, size, focused}) => (
                              <View style={{top: 10, alignItems:'center', justifyContent:'center'}}>
                                   <Ionicons name={focused ? "home" : "home-outline"} color={color} size={focused ? 30: 25}/>
                                   <Text variant="labelSmall" style={focused ? {color:"grey"} : {color: "grey", fontSize: 10}}>Home</Text>
                              </View>
                         )
                         }}
                         >
                         
                    </Tab.Screen>
                    <Tab.Screen name="CustomHome" component={CustomHome} options={{
                         headerShown: false,
                         tabBarShowLabel:false,
                         tabBarLabel: 'Community',     
                         tabBarIcon: ({ color, size, focused}) => (
                              <View style={{top: 10, alignItems:'center', justifyContent:'center'}}>
                                   <Ionicons name={focused ? "people-circle": "people-circle-outline"} color={color} size={focused ? 30: 25}/>
                                   <Text variant="labelSmall" style={focused ? {color:"grey"} : {color: "grey", fontSize: 10}}>Community</Text>
                              </View>
                         )
                         }}></Tab.Screen>
                                        <Tab.Screen name="Planner" component={ListScreen} options={{
                         headerShown: false,
                         tabBarBadge: plans,
                         tabBarShowLabel:false,
                         tabBarLabel: 'Planner',
                         tabBarIcon: ({ color, size, focused}) => (
                              <View style={{top: 10, alignItems:'center', justifyContent:'center'}}>
                                   <Ionicons name={focused ? "bookmark" : "bookmark-outline"} color={color} size={focused ? 30: 25}/>
                                   <Text variant="labelSmall" style={focused ? {color:"grey"} : {color: "grey", fontSize: 10}}>Planner</Text>
                              </View>
                         )
                         }}>
                    
                    </Tab.Screen>
                    <Tab.Screen name="Profile" component={Profile} options={{
                         headerShown: false,
                         tabBarShowLabel:false,
                         tabBarLabel: 'Profile',
                         tabBarIcon: ({ color, size, focused}) => (
                              <View style={{top: 10, alignItems:'center', justifyContent:'center'}}>
                              <Ionicons name={focused ? "person" : "person-outline"} color={color} size={focused ? 30: 25}/>
                              <Text variant="labelSmall" style={focused ? {color:"grey"} : {color: "grey", fontSize: 10}}>Profile</Text>
                              </View>
                         )
                         }}>
                    </Tab.Screen>
               </Tab.Navigator>
          </Context.Provider>
     )
}