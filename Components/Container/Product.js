import { useState } from 'react'
import {TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Alert} from 'react-native'
import { Button, Text } from 'react-native-paper'
import { Image } from 'expo-image';



export default function Product({route, navigation }) {
     const [item, setItem] = useState()
     const [quantity, setQuantity] = useState(0)


     const { name, price, image } = route.params

     return (
          <KeyboardAvoidingView style={style.container}>
          <View style={{justifyContent:'center'}}>

               <View style={{alignItems:'center', marginBottom: 50}}>
                    <Text variant='titleLarge'>Item Details</Text>
               </View>

               <View style={{justifyContent:'center', alignItems:'center'}}>
                    <View style={{marginBottom: 20, borderRadius: 200, alignItems: 'center', backgroundColor: 'white', height: 300, width: 300, justifyContent: 'center', shadowColor: "#000",shadowOffset: {	width: 0,	height: 1,},shadowOpacity: 0.22,shadowRadius: 2.22,elevation: 3,}}>
                         <View style={{}}>
                              <Image source={image} style={{height: 200, width: 200}} contentFit='cover' transition={1000}/>
                         </View>
                    </View>
               </View>

               <View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 100, marginTop: 50}}>
                         <Text variant='labelLarge'>{name}</Text>
                         <Text variant='labelMedium'>₱{price}</Text>
                    </View>
               </View>

               <View style={{flexDirection: 'row'}}>
                    <View style={{alignItems:'center', flexDirection:'row'}}>
                         <Button mode='text' icon={"minus"} textColor='black' onPress={() =>{
                              if (quantity == 0) return setQuantity(0)

                              setQuantity(quantity - 1)
                         }}></Button>
                         <Text>{quantity}</Text>
                         <Button mode='text' icon={"plus"} textColor='black' onPress={() => {
                              setQuantity(quantity + 1)
                         }}></Button>
                    </View>
                    <Button textColor='white' mode='contained-tonal' buttonColor='#00BF63' style={{height: 50, width: 200, justifyContent:'center'}}>Add to List</Button>
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
     }
})