
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert, ScrollView } from 'react-native'

import { Text,Icon, Button } from 'react-native-paper'

import WeekContainer from './WeekContainer'
import { useState } from 'react'


import Empty from './Empty'

export default function Planner({ navigation }) {
     const [list, setList] = useState([
          {
               week: 'Week 1',
               price: 100.5
          },
          {
               week: 'Week 2',
               price: 253.23
          }
     ])

     const [list1, setList1] = useState([])

     if (list.length == 0) {
          return (
               <Empty title="No Weekly Planner Added" label="Hit the Green button down below to Create a Weekly Planner" buttonTitle="Add New Weekly Planner"/>
          )
     }
     return (
          <KeyboardAvoidingView style={style.container}>
               <View>
                    <View style={{alignItems: 'center', bottom: 450, left: 35, position: 'absolute'}}>
                         <Text variant='titleLarge' style={{fontWeight: 'bold'}}>Grocery Weekly Planner</Text>
                    </View>
                         <TouchableOpacity  onPress={ () => {
                              navigation.navigate('Login')
                         }}>
                              {
                                   list.map((list, index) => {
                                        return <WeekContainer week={list.price} total={list.price} key={index}/>
                                   })
                              }
                         </TouchableOpacity>
                    <View>
                         <Button mode='contained-tonal' buttonColor='#18B127' textColor='white' icon={"clipboard-list-outline"}
                         onPress={() => (Alert.alert('You have click this button', 'nice'))}>Add New Weekly Planner</Button>
                    </View>
               </View>
          </KeyboardAvoidingView>
     )
}


const style = StyleSheet.create({
     container: {
          backgroundColor: "#F5F5F8",
          flex: 1,
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