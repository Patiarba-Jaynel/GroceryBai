import { View, KeyboardAvoidingView, StyleSheet, ActivityIndicator, Alert, Image, TouchableOpacity} from "react-native";

import { TextInput, Text } from "react-native-paper";

import * as SecureStore from 'expo-secure-store'

import URL from "../../api/constants";
import { useEffect, useState } from "react";



export default function Profile( { navigation }) {
     const [user, setUser] = useState([]);

     useEffect(() => {
          async function userMe() {
               console.log( await SecureStore.getItemAsync('token'))
               const response = await fetch(`${URL}/api/user/me`, {
                    headers: {
                         'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`
                    }
               })

               if (response.status == 403) {navigation.replace('Login'); return Alert.alert("Token has been expired", "Please Login Again")}

               const message =  await response.json()

               setUser(message)
          }
          
          async function Check() {
               if (await SecureStore.getItemAsync('token') == '') {navigation.replace('Login'); return Alert.alert("Token has been expired", "Please Login Again")}
               userMe()
          }

          Check()
     }, [])

     return (
     <KeyboardAvoidingView style={style.container}>
          <View>
               <View style={{flex: 1, margin: 100, alignItems: 'center'}}>
                    <View style={{marginBottom: 100}}>
                         <Text variant="titleLarge" style={{fontWeight: 'bold'}}>Personal details</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>
                         <TouchableOpacity style={{marginBottom: 50}}>
                              <View style={{marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <Text variant="titleSmall">Personal Information</Text>
                                   <Text variant="titleSmall" style={{color: 'green'}}>change</Text>
                              </View>

                              <View style={{borderColor: 'black', backgroundColor: 'white', width: 400, height: 200, borderRadius: 20, flexDirection:'row', shadowColor: "#000",shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.22,shadowRadius: 2.22,elevation: 3,}}>
                                   <View style={{ backgroundColor:'white', borderRadius: 10, alignItems:'center', height: 100, marginTop: 50, marginLeft: 50}}>
                                        <Image source={require('../../assets/google.png')} style={{ height: 100, width: 100}}></Image>
                                   </View>

                                   <View style={{margin: 50, marginTop: 70}}>
                                        <Text variant='titleMedium'>{`${user.first_name} ${user.last_name}`}</Text>
                                        <Text variant='titleSmall'>{user.email}</Text>
                                   </View>

                              </View>
                         </TouchableOpacity>
                    
                         <View>
                              <View style={{marginBottom: 20, backgroundColor: 'white', height: 50, width: 400, borderRadius: 20, justifyContent:'center', shadowColor: "#000",shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.22,shadowRadius: 2.22,elevation: 3,}}>
                                   <TouchableOpacity>
                                        <Text style={{marginLeft: 30}} variant='titleMedium'>Added Items</Text>
                                   </TouchableOpacity>
                              </View>

                              <View style={{marginBottom: 20, backgroundColor: 'white', height: 50, width: 400, borderRadius: 20, justifyContent:'center', shadowColor: "#000",shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.22,shadowRadius: 2.22,elevation: 3,}}>
                                   <TouchableOpacity>
                                        <Text style={{marginLeft: 30}} variant='titleMedium'>Password Reset</Text>
                                   </TouchableOpacity>
                              </View>

                              <View style={{marginBottom: 20, backgroundColor: 'white', height: 50, width: 400, borderRadius: 20, justifyContent:'center', shadowColor: "#000",shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.22,shadowRadius: 2.22,elevation: 3,}}>
                                   <TouchableOpacity>
                                        <Text style={{marginLeft: 30}} variant='titleMedium'>FAQ</Text>
                                   </TouchableOpacity>
                              </View>


                              <View style={{marginBottom: 20, backgroundColor: 'white', height: 50, width: 400, borderRadius: 20, justifyContent:'center', shadowColor: "#000",shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.22,shadowRadius: 2.22,elevation: 3,}}>
                                   <TouchableOpacity>
                                        <Text style={{marginLeft: 30, color:'red'}} variant='titleMedium' onPress={async () => {
                                             const token = await SecureStore.setItemAsync('token', '')
                                             navigation.navigate('Login')
                                        }}>Logout</Text>
                                   </TouchableOpacity>
                              </View>
                         </View>

                    </View>
               </View>
          </View>
     </KeyboardAvoidingView>
     )
}



const style = StyleSheet.create({
     container: {
          backgroundColor: "#fff",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
     },
     ImageContainer: {
     },
     boldText: {
          fontWeight: 'bold'
     },
     Input: {
          backgroundColor: 'white',
          width: 300,
          borderRadius: 100,
          margin: 10
     },
     inputContainer: {
          textAlign: 'center',
          alignItems: 'center',
          flex: 2,
          margin: 1
     }
})