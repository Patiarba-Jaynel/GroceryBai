
import { View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert, ScrollView, SafeAreaView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { Text,Icon, Button, List, Modal, Portal, Divider, TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

import WeekContainer from './WeekContainer'
import { useEffect, useState, useCallback } from 'react'
import { ListItem, createList } from '../../../api/planner/item'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store'
import URL from '../../../api/constants'
import Loading from '../../miscsCompontent/Loading'
import CloseButton from '../../miscsCompontent/CloseButton'
import { useIsFocused } from '@react-navigation/native';
import Empty from './Empty'

import PlannerModal from '../../Modal/PlannerModal';


export default function Planner({ navigation, route }) {
     const [list1, setList1] = useState([])
     const [totalPrice, setPrice] = useState([])
     const [error, setError] = useState()
     const [plannerLoading, setLoading] = useState(false)
     const [isEmpty, setIsEmpty] = useState(false)
     


     //for dropdown
     const [listName, setListName] = useState()
     const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
     const [showDropDown, setShowDropDown] = useState(false);
     const [schedule, setSchedule] = useState()
     const Schedules = [
          {
               label: 'Monday',
               value: 'Monday'
          },
          {
               label: 'Tuesday',
               value: 'Tuesday'
          },
          {
               label: 'Wednesday',
               value: 'Wednesday'
          },
          {
               label: 'Thursday',
               value: 'Thursday'
          },
          {
               label: 'Friday',
               value: 'Friday'
          },
          {
               label: 'Saturday',
               value: 'Saturday'
          },
          {
               label: 'Sunday',
               value: 'Sunday'
          },
     ]
     
     async function userMe() {
          try {
               setLoading(true)
               //console.log( await SecureStore.getItemAsync('token'))
               const response = await fetch(`${URL}/api/user/items`, {
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
          }, [])
        );
     

     useEffect(() => {
     }, [])

     /*
     const empty = () => {
          if (list1.length == 0) {
               setIsEmpty(true)
          }
          else {
               setIsEmpty(false)

          }
     }
     */


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

     //console.log(list1)

     return (
          <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}>
               <View>
                    <View style={{flex: 5}}>
                         <View style={{alignItems:'center', justifyContent: 'center', marginBottom: 50}}>
                              <Text variant='titleLarge' style={{fontWeight: 'bold'}}>Grocery Weekly Planner</Text>
                         </View>
                              <ScrollView showsVerticalScrollIndicator={false}>
                                   <View>
                                        <View style={{alignItems:'center', justifyContent:'center'}}>
                                             {    
                                                  plannerLoading ? <View style={{position:'absolute',left: 0,right: 0,top: 0, bottom: 0, elevation: 1, alignSelf: 'center', alignItems:'center'}} ><Loading loading={plannerLoading}></Loading></View>
                                                  :
                                                  list1.map((item, index) => { 
                                                       return (
                                                       <WeekContainer schedule={item.schedule} date={item.dateCreated} week={item.name} total={item.total} key={index} onPress={() => (navigation.navigate('ListContainer', {...item, total: item.total}))}/>)
                                                  })
                                                  
                                                  /*list1.map((list, index) => {
                                                       return <WeekContainer week={list._id} total={list.item} key={index} onPress={() => (navigation.navigate('ListContainer'))}/>
                                                  })*/
                                             }         
                                        </View>
                                   </View>
                              </ScrollView>
                    <Divider style={{marginBottom: 20}}/>
                    </View>
                    
                    {/**  Modal */}
                    <PlannerModal userMe={userMe}/>
               </View>
          </SafeAreaView>
     )
}

const style = StyleSheet.create({
     container: {
          backgroundColor: "#F5F5F8",
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