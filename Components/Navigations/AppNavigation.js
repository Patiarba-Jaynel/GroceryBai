import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, Text } from "react-native-paper";

import Login1 from "../Form/Login";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/SignUpScreen";
import HomeScreen from "../Screens/HomeScreen";
import Product from "../Container/Product";
import Profile from "../Form/Profile";
import Planner from "../Container/WeeklyPlanner/Planner";
import ListContainer from '../../Components/Container/WeeklyPlanner/ListContainer'
import HistoryContainer from '../../Components/Container/History/HistoryContainer'
import TabNavigation from "./TabNavigation";
import ResetScreen from "../Screens/ResetScreen";
import ResetOTPScreen from "../Screens/ResetOTPScreen";
import Custom from "../Container/Custom";
import FAQ from "../../Components/Container/FAQ";
import Favorite from '../../Components/Form/Favorite'
import History from '../../Components/Container/History/History'

import CustomHome from "../Form/CustomHome";

import * as SecureStore from 'expo-secure-store'
const Stack = createNativeStackNavigator() 

import { AuthContext } from "../../utils/authContext";
import { useContext, useEffect, useState } from "react";




export default function AppNavigation({ navigation }) {


     async function Auth() {
          if (await SecureStore.getItemAsync('token')) {
               return setloggedIn(true)
          }
     }

     useEffect(() => {
          // write your code here, it's like componentWillMount
          Auth()
      }, [])
     

     const [isloggedIn, setloggedIn] = useState(false)

     return (
          <AuthContext.Provider value={[isloggedIn, setloggedIn]}>
          <NavigationContainer>
          <Stack.Navigator>
              {
               isloggedIn == false ? (
                    <>
                    <Stack.Group>
                    <Stack.Screen options={{headerShown: false}} name="Login" component={Login1} />
                    <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
                    <Stack.Screen options={{headerShown: false}} name="Reset" component={ResetScreen} />
                    <Stack.Screen options={{headerShown: false}} name="OTP" component={ResetOTPScreen} />
               </Stack.Group>
                    </>
               ) : (
                    <>
               <Stack.Group>
                    <Stack.Screen options={{headerShown: false}} name="Screen" component={TabNavigation} />
                    <Stack.Screen options={{headerShown: true, headerTitle:'', headerTransparent: true, headerTintColor:'black'}} name="AddProduct" component={Product} />
                    <Stack.Screen options={{headerShown: true}} name="Planner" component={Planner} />
                    <Stack.Screen options={{headerShown: true, headerTitle: '', headerTransparent: true}} name="ListContainer" component={ListContainer} />
               </Stack.Group>

               <Stack.Group>
                    <Stack.Screen options={{headerShown: true, headerTitle: '', headerTransparent: true}} name="Custom" component={Custom} />
                    <Stack.Screen options={{
                    headerTransparent: true,
                    headerTintColor:'black',
                    headerShown: true, headerTitle: ''}} name="Favorite" component={Favorite} />

               </Stack.Group>
               <Stack.Group>
                    <Stack.Screen options={{headerShown: false}} name="Profile" component={Profile} />
                    <Stack.Screen options={{headerShown: false}} name="Reset1" component={ResetScreen} />
                    <Stack.Screen options={{headerShown: true, headerTitle:'', headerTransparent: true}} name="History" component={History} />
                    <Stack.Screen options={{headerShown: true, headerTitle: '', headerTransparent: true}} name="HistoryContainer" component={HistoryContainer} />
                    <Stack.Screen options={{headerShown: true, headerTransparent: true}} name="FAQ" component={FAQ} />
               </Stack.Group>
                    </>
               )
               }


          </Stack.Navigator>
     </NavigationContainer>
     </AuthContext.Provider>
     )

}