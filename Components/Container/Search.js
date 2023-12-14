import { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ActivityIndicator, ScrollView } from "react-native";

import { Text, TextInput } from "react-native-paper";
import URL from "../../api/constants";
import Container from "./Container";


export default function Search( { navigation }) {
     const [item, setItem] = useState()
     const [isLoading, setIsLoading] = useState(false)
     const [data, setData] = useState([])

     const [query, setQuery] = useState()

               async function searchItem(item) {
               const response = await fetch(`${URL}/api/search?item=${encodeURIComponent(item)}`)

               const data = await response.json()

               setData(data)

               setIsLoading(false)

               console.log(data)
     }


     if (isLoading) {
          return (
               <View style={{alignItems:'center', justifyContent:'center'}}>
                    <ActivityIndicator  size={"large"} color={"green"}/>
               </View>
          )
     }



     return (
          <KeyboardAvoidingView  style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <View>
                    <View style={{flex: 1,marginTop: 200  , width:400}}>
                         <TextInput 
                         mode='outlined'
                         left={<TextInput.Icon icon={"magnify"} />}
                         value={query}
                         onChangeText={(value) => {
                              setTimeout(() => {
                                   searchItem(value)
                              }, 1000);
                         }
                              }>
                         </TextInput>
                    </View>

                    <View style={{flex: 1, justifyContent:'flex-start'}}>
                         <ActivityIndicator size={'large'} animating={isLoading} style={style.loading}/>
                         <ScrollView>
                              <View style={style.itemContainer}>
                              {
                                   data.map((items, index) => {
                                        return <Container name={items.product.title} price={items.product.price} image={items.product.image_url} key={index} onPress={
                                             () => {
                                                  navigation.navigate('AddProduct', {name: items.product.title, price: items.product.price, image: items.product.image_url})
                                             }
                                        } />
                                   })
                              }

                              </View>
                         </ScrollView>
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