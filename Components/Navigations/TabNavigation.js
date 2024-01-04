import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from "../Screens/HomeScreen";
import Profile from "../Form/Profile";
import Product from "../Container/Product";
import ListScreen from "../Screens/ListScreen";

const Tab = createBottomTabNavigator()


export default function TabNavigation() {
     return (
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
                    tabBarActiveTintColor: '#18B127',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                         backgroundColor: '#F5F5F8',
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
                    <Tab.Screen name="Planner" component={ListScreen} options={{
                         headerShown: false,
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
     )
}