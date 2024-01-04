import { useState } from 'react'
import {TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Alert, ScrollView} from 'react-native'
import { Button, Text } from 'react-native-paper'
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Product({route, navigation }) {
     const [item, setItem] = useState()
     const [quantity, setQuantity] = useState(0)


     const { name, price, image } = route.params

     return (
          <SafeAreaView style={style.container}>
          <View style={{justifyContent:'center'}}>

               <View style={{justifyContent:'center', alignItems:'center', flex: 2}}>
                    <View style={{}}>
                         <View style={{}}>
                              <Image source={image} style={{height: 300, width: 300}} contentFit='cover' transition={3000}/>
                         </View>
                    </View>

                    <View>
                         <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginBottom: 20, marginTop: 20, margin: 5}}>
                              <Text variant='labelLarge' style={{fontWeight:'bold', textAlign: 'auto', fontSize: 20}}>{name}</Text>
                              <Text variant='labelMedium' style={{fontWeight:'bold', textAlign:'left', marginTop: 10, fontSize: 15}}>₱{price}</Text>
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
                         <Button textColor='white' mode='contained-tonal' buttonColor='#00BF63' style={{height: 50, width: 200, justifyContent:'center'}}>Add to List
                         </Button>
                    </View>
               </View>
                              
               {/** this is for recommendation */}
               <View style={{flex: 1}}>
                    <View>
                         <TouchableOpacity>
                              <Text variant='labelLarge' style={{fontWeight: 'bold'}}>
                                   Similar Product
                              </Text>
                         </TouchableOpacity>
                    </View>
                    <ScrollView>
                         <View style={{width: 500, height: 500, backgroundColor: 'black'}}>

                         </View>
                    </ScrollView>
               </View>


          </View>
          </SafeAreaView>
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