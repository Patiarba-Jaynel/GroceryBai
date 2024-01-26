
import { View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert, ScrollView, SafeAreaView,Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { Text,Icon, Button, List, Modal, Portal, Divider, TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

import WeekContainer from '../WeeklyPlanner/WeekContainer'
import { useEffect, useState, useCallback, createContext, useContext } from 'react'
import { ListItem, createList } from '../../../api/planner/item'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store'
import URL from '../../../api/constants'
import Loading from '../../miscsCompontent/Loading'
import CloseButton from '../../miscsCompontent/CloseButton'
import { useIsFocused } from '@react-navigation/native';
import Empty from '../WeeklyPlanner/Empty'


import { Context } from '../../../utils/context';

export default function History({ navigation, route }) {
     const [list1, setList1] = useState([])
     const [totalPrice, setPrice] = useState([])
     const [error, setError] = useState()
     const [plannerLoading, setLoading] = useState(false)
     const [isEmpty, setIsEmpty] = useState(false)
     

     async function userMe() {
          try {
               setLoading(true)
               //console.log( await SecureStore.getItemAsync('token'))
               const response = await fetch(`${URL}/api/user/deleted_items`, {
                    headers: {
                         'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`
                    }
               })

               if (response.status == 403) {navigation.replace('Login'); return Alert.alert("Token has been expired", "Please Login Again")}

               const message =  await response.json()
               setList1(message.item)
               setLoading(false)
          } catch (error) {
               setLoading(true)
               Alert.alert('Error has been occurred', `${error}`)
               setLoading(false)
          }

     }


     useFocusEffect(
          useCallback(() => {
               userMe()
          }, []),

        );



     const isFocused = useIsFocused();


     const createNewList = async (name, schedule) => {
          try {
               let data = {
                    name: name,
                    items: [],
                    schedule: schedule
               }
               const addList =  await createList(JSON.stringify(data))

               return addList
          } catch (error) {
               return error
          }
     }


     return (
          <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor:'#f5f5f5'}}>
               <View>
                    <View style={{flex: 5}}>
                         <View style={{alignItems:'center', justifyContent: 'center', marginBottom: 50, marginTop: Platform.OS == "android" ? 100: 20}}>
                              <Text variant='titleLarge' style={{fontWeight: 'bold'}}>Your History Planner</Text>
                         </View>
                              <ScrollView showsVerticalScrollIndicator={false}>
                                   <View>
                                        <View style={{alignItems:'center', justifyContent:'center'}}>
                                             {    
                                                  plannerLoading ? <View style={{position:'absolute',left: 0,right: 0,top: 0, bottom: 0, elevation: 1, alignSelf: 'center', alignItems:'center'}} ><Loading loading={plannerLoading}></Loading></View>
                                                  :
                                                  list1.map((item, index) => { 
                                                       return (
                                                       <WeekContainer schedule={item.schedule} date={item.dateCreated} week={item.name} total={item.total} key={index} onPress={() => {navigation.navigate('HistoryContainer', {...item, total: item.total})}}/>
                                                       )
                                                  })
                                             }         
                                        </View>
                                   </View>
                              </ScrollView>
                    <Divider style={{marginBottom: 20}}/>
                    </View>
               </View>
          </SafeAreaView>
     )
}

const style = StyleSheet.create({
     container: {
          backgroundColor: "#f5f5f5",
          justifyContent: "center",
          alignItems: "center",
     },

     weekContainer: {
          backgroundColor: 'white', height: 100, width: 300, borderRadius: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row',
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
     }
})