import { View, KeyboardAvoidingView, StyleSheet, ActivityIndicator, Alert, Image, TouchableOpacity, ScrollView} from "react-native";

import { TextInput, Text } from "react-native-paper";

import * as SecureStore from 'expo-secure-store'
import {AsyncStorage} from 'react-native';

import URL from "../../api/constants";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from 'react-native-vector-icons/Ionicons';

import Loading from "../miscsCompontent/Loading";


export default function Profile( { navigation }) {
     const [user, setUser] = useState([]);
     const [isLoading, setLoading] = useState(false);


     useEffect(() => {
          async function userMe() {
               try {
                    setLoading(true)
                    console.log( await SecureStore.getItemAsync('token'))
                    const response = await fetch(`${URL}/api/user/me`, {
                         headers: {
                              'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`
                         }
                    })
     
                    if (response.status == 403) {navigation.replace('Login'); return Alert.alert("Token has been expired", "Please Login Again")}
     
                    const message =  await response.json()
                    setUser(message)
     
                    setLoading(false)
               } catch (error) {
                    setLoading(true)
                    Alert.alert('Error has been occurred', `${error}`)
                    setLoading(false)
               }

          }
          
          async function Check() {
               if (await SecureStore.getItemAsync('token') == '') {navigation.replace('Login'); return Alert.alert("Token has been expired", "Please Login Again")}
               userMe()
          }

          Check()
     }, [])

     return (
     <SafeAreaView style={style.container}>
          <View>
               <View style={{flex: 1, margin: 20, alignItems: 'center'}}>
                    <View style={{marginBottom: 50}}>
                         <Text variant="titleLarge" style={{fontWeight: 'bold'}}>My Profile</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>
                         <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom:10}}>
                                   <Text variant="titleSmall">Personal Information</Text>
                         </View>
                         <TouchableOpacity style={{marginBottom: 50}}>
                              <View style={{borderColor: 'black', backgroundColor: 'white', width: 350, height: 200, borderRadius: 20, flexDirection:'row'}}>
                                   <View style={{ backgroundColor:'white', alignItems:'center', height: 100, marginTop: 50, marginLeft: 20, borderRightWidth:1}}>
                                        <Image source={require('../../assets/google.png')} style={{ height: 100, width: 100, marginRight:10}}></Image>
                                   </View>

                                   {
                                        isLoading ? 
                                        <View style={{alignItems:"center", justifyContent:'center'}}>
                                             <Loading loading={isLoading}/>
                                        </View>:
                                             <View style={{margin: 20, marginTop: 70}}>
                                                  <Text variant='titleMedium'>{`${user.first_name} ${user.last_name}`}</Text>
                                                  <Text variant='titleSmall'>{user.email}</Text>
                                             </View>
                                   }

                              </View>
                         </TouchableOpacity>
                    
                         <View>
                              <View style={{marginBottom: 20, backgroundColor: 'white', height: 60, width: 315, borderRadius: 20, justifyContent:'center'}}>
                                   <TouchableOpacity style={{justifyContent:'space-between', flexDirection:'row'}}>
                                        <Text style={{marginLeft: 20}}variant='titleMedium'>
                                             Wishlist
                                        </Text>
                                        <Text style={{marginRight: 20}}>
                                             <Icon name="chevron-forward-outline" size={20} color="black" />
                                        </Text>
                                   </TouchableOpacity>
                              </View>

                              <View style={{marginBottom: 20, backgroundColor: 'white', height: 60, width: 315, borderRadius: 20, justifyContent:'center'}}>
                                   <TouchableOpacity style={{justifyContent:'space-between', flexDirection:'row'}}>
                                        <Text style={{marginLeft: 20}}variant='titleMedium'>
                                             Add Custom Product
                                        </Text>
                                        <Text style={{marginRight: 20}}>
                                             <Icon name="chevron-forward-outline" size={20} color="black" />
                                        </Text>
                                   </TouchableOpacity>
                              </View>

                              <View style={{marginBottom: 20, backgroundColor: 'white', height: 60, width: 315, borderRadius: 20, justifyContent:'center'}}>
                                   <TouchableOpacity style={{justifyContent:'space-between', flexDirection:'row'}} onPress={() => {navigation.navigate('Reset')}}>
                                        <Text style={{marginLeft: 20}}variant='titleMedium'>
                                             Password Reset
                                        </Text>
                                        <Text style={{marginRight: 20}}>
                                             <Icon name="chevron-forward-outline" size={20} color="black" />
                                        </Text>
                                   </TouchableOpacity>
                              </View>

                              <View style={{marginBottom: 20, backgroundColor: 'white', height: 60, width: 315, borderRadius: 20, justifyContent:'center'}}>
                                   <TouchableOpacity style={{justifyContent:'space-between', flexDirection:'row'}}>
                                        <Text style={{marginLeft: 20}}variant='titleMedium'>
                                             FAQ
                                        </Text>
                                        <Text style={{marginRight: 20}}>
                                             <Icon name="chevron-forward-outline" size={20} color="black" />
                                        </Text>
                                   </TouchableOpacity>
                              </View>


                              <View style={{marginBottom: 20, backgroundColor: 'white', height: 60, width: 315, borderRadius: 20, justifyContent:'center'}}>
                                   <TouchableOpacity>
                                        <Text style={{marginLeft: 20, color:'red'}} variant='titleMedium' onPress={async () => {
                                             const token = await SecureStore.setItemAsync('token', '')
                                             navigation.navigate('Login')
                                        }}>Logout</Text>
                                   </TouchableOpacity>
                              </View>
                         </View>

                    </View>
               </View>
          </View>
     </SafeAreaView>
     )
}



const style = StyleSheet.create({
     container: {
          backgroundColor: "#F5F5F8",
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