import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login1 from "../Form/Login";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/SignUpScreen";
import HomeScreen from "../Screens/HomeScreen";
import Product from "../Container/Product";
import Profile from "../Form/Profile";
import Planner from "../Container/WeeklyPlanner/Planner";
import ListContainer from '../../Components/Container/WeeklyPlanner/ListContainer'
import TabNavigation from "./TabNavigation";
import ResetScreen from "../Screens/ResetScreen";
import ResetOTPScreen from "../Screens/ResetOTPScreen";

import * as SecureStore from 'expo-secure-store'

const Stack = createNativeStackNavigator() 


async function Auth() {
     if (await SecureStore.getItemAsync('token')) {
          return true
     }
}



export default function AppNavigation() {
     return (
          <NavigationContainer>
          <Stack.Navigator>
               <Stack.Group>
                    <Stack.Screen options={{headerShown: false}} name="Login" component={Login1} />
                    <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
                    <Stack.Screen options={{headerShown: false}} name="Reset" component={ResetScreen} />
                    <Stack.Screen options={{headerShown: false}} name="OTP" component={ResetOTPScreen} />
                    <Stack.Screen options={{headerShown: false}} name="Profile" component={Profile} />
               </Stack.Group>

               <Stack.Group>
                    <Stack.Screen options={{headerShown: false}} name="Screen" component={TabNavigation} />
                    <Stack.Screen options={{headerShown: false}} name="AddProduct" component={Product} />
                    <Stack.Screen options={{headerShown: true}} name="Planner" component={Planner} />
                    <Stack.Screen options={{headerShown: true}} name="ListContainer" component={ListContainer} />
               </Stack.Group>

          </Stack.Navigator>
     </NavigationContainer>
     )

}