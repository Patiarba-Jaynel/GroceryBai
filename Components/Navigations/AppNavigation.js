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

const Stack = createNativeStackNavigator() 




export default function AppNavigation() {
     return (
          <NavigationContainer>
          <Stack.Navigator>
               <Stack.Group>
                    <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
                    <Stack.Screen options={{headerShown: true}} name="Register" component={RegisterScreen} />
                    <Stack.Screen options={{headerShown: false}} name="Profile" component={Profile} />
               </Stack.Group>

               <Stack.Group>
                    <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
                    <Stack.Screen options={{headerShown: true}} name="AddProduct" component={Product} />
                    <Stack.Screen options={{headerShown: true}} name="Planner" component={Planner} />
                    <Stack.Screen options={{headerShown: true}} name="ListContainer" component={ListContainer} />
               </Stack.Group>

          </Stack.Navigator>
     </NavigationContainer>
     )

}