import { useState } from 'react'
import { View, TouchableOpacity, StyleSheet} from 'react-native'

import { Text, Icon, HelperText } from 'react-native-paper'

export default function WeekContainer(props) {

     const date = new Date(props.date).toDateString().replace(' ', ', ');

     return (
     <View style={{marginBottom: 10}}>
          <TouchableOpacity onPress={props.onPress} onLongPress={props.onLongPress}>
               <View style={style.weekContainer}>
                    <View style={{margin: 20}}>
                         <Text variant='labelLarge'>{props.week}</Text>
                         <Text variant='labelMedium' style={{color:'#18B127'}}>{`Grocery for ${props.schedule}`}</Text>
                         <Text variant='labelSmall' style={{color:'gray'}}>{`Added on ${date}`}</Text>
                    </View>
                    <View style={{flexWrap:'wrap'}}>
                         <Text variant='labelMedium' style={{color:'#18B127'}}><Icon color='gray' source={'cart-outline'} size={20}></Icon>: ₱ {props.total}</Text>
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
          backgroundColor: 'white', padding: 5, borderRadius: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row',
          height: 100,
          width: 300
     }
})