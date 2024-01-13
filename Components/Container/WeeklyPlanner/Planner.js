
import { View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert, ScrollView, SafeAreaView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { Text,Icon, Button, List, Modal, Portal, Divider, TextInput } from 'react-native-paper'

import WeekContainer from './WeekContainer'
import { useEffect, useState, useCallback } from 'react'
import { ListItem } from '../../../api/planner/item'
import {AsyncStorage} from 'react-native';
import * as SecureStore from 'expo-secure-store'
import URL from '../../../api/constants'
import Loading from '../../miscsCompontent/Loading'
import CloseButton from '../../miscsCompontent/CloseButton'
import { useIsFocused } from '@react-navigation/native';

import Empty from './Empty'

export default function Planner({ navigation, route }) {
     const [list1, setList1] = useState([])
     const [totalPrice, setPrice] = useState([])
     const [error, setError] = useState()
     const [plannerLoading, setLoading] = useState(false)
     
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


     const isFocused = useIsFocused();

     /**
     if (list1.length == 0) {
          return (
               <Empty title="No Weekly Planner Added" label="Hit the Green button down below to Create a Weekly Planner" buttonTitle="Add New Weekly Planner"/>
          )
     }
     */
     const [visible, setVisible] = useState(false);
     const showModal = () => setVisible(true);
     const hideModal = () => setVisible(false);
     const containerStyle = {backgroundColor: 'white', padding: 20, alignSelf: 'center', width: 350, borderRadius: 10};
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
                                                  isFocused ? list1.map((item, index) => {  
                                                       return (
                                                       <WeekContainer week={`Week ${index += 1}`} total={item.total} key={index} onPress={() => (navigation.navigate('ListContainer', {...item, total: item.total}))}/>)
                                                  })
                                                  :
                                                  <View style={{position:'absolute',left: 0,right: 0,top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', elevation: 1}} ><Loading loading={plannerLoading}></Loading></View>
                                                  
                                                  /*list1.map((list, index) => {
                                                       return <WeekContainer week={list._id} total={list.item} key={index} onPress={() => (navigation.navigate('ListContainer'))}/>
                                                  })*/
                                             }         
                                        </View>
                                   </View>
                              </ScrollView>
                    <Divider style={{marginBottom: 20}}/>
                    </View>

                    <View style={{flex: 1, alignItems: 'center'}}>
                         <Portal>
                              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                   <View>
                                        <Text variant='titleMedium' style={{padding: 10}}>Add New</Text>
                                        <TextInput style={{marginBottom: 20}}></TextInput>
                                        <TextInput style={{marginBottom: 20}}></TextInput>
                                        <TextInput style={{marginBottom: 20}}></TextInput>
                                        <TextInput style={{marginBottom: 20}}></TextInput>
                                        <TextInput style={{marginBottom: 20}}></TextInput>
                                        <Button mode='contained-tonal' textColor='white' buttonColor='#18B127'>Add New List </Button>
                                   </View>
                              </Modal>
                         </Portal>       
                         <Button mode='contained-tonal' buttonColor='#18B127' textColor='white' icon={"clipboard-list-outline"}
                         onPress={showModal} style={{height: 40, width: 250}}>Add New Weekly Planner</Button>
                    </View>
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