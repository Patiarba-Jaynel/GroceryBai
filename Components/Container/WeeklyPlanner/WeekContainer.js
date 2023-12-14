import { useState } from 'react'
import { View, TouchableOpacity, StyleSheet} from 'react-native'

import { Text, Icon } from 'react-native-paper'

export default function WeekContainer(props) {

     return (
     <View style={{marginBottom: 10}}>
          <TouchableOpacity onPress={props.onPress}>
               <View style={style.weekContainer}>
                    <View style={{margin: 20}}>
                         <Text variant='labelLarge'>{props.week}</Text>
                    </View>
                    <View style={{margin: 10}}>
                         <Text variant='labelMedium'><Icon source={'cart'} size={20}></Icon>: ₱ {props.total}</Text>
                    </View>
               </View>
          </TouchableOpacity>
     </View>
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