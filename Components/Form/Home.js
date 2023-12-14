import {View, KeyboardAvoidingView, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, TextInput, RefreshControl, ActivityIndicator} from 'react-native'
import {Button, Text, Searchbar, Chip} from 'react-native-paper'

import React from 'react'

import Container from '../Container/Container'
import { useState, useEffect } from 'react'
import Empty from '../Container/WeeklyPlanner/Empty'

import URL from '../../api/constants'

import { products, chooseCategory, searchProduct }  from '../../api/product/products'

const category_list = ["Fresh Meat & Seafoods", "Fresh Produce", "Frozen Goods", "Ready To Heat & Eat Items", "Ready to Cook", "Chilled & Dairy Items", "International Goods","Bakery", "Pantry", "Snacks", "Beverage", "Health & Beauty", "Babies & Kids", "Home Care", "DIY/Hardware", "Pet Care", "Health & Hygiene Essentials"]


export default function Home( { navigation } ) {
     const [search, setSearch] = useState()
     const [isLoading, setLoading] = useState(false)
     const [isDisplay, setDisplay] = useState('flex')

     const [product, setProduct] = useState([])

     const [error, setError] = useState(false)

     function item(item) {
          selectCategory(item)
     }

     useEffect(() => {
          // write your code here, it's like componentWillMount
          loadItem();
      }, [])

     async function loadItem() {
          products(setProduct, setLoading, setError)
          setError(false)
     }
     
     async function selectCategory(name) {
          chooseCategory(name, setProduct, setLoading)
     }

     async function searchItem(name) {
          if (name.length == 0) return Alert.alert("Empty Search", "Please input desired item")

          searchProduct(name, setProduct, setLoading)
     }

     if (error) {
          return (
               <Empty title="Cannot connect to the server" buttonTitle="Click to refresh" onPress={() => {
                    loadItem()
               }} />
          )
     }

     return (
          <KeyboardAvoidingView  style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={{flex: 1, margin: 100}}>
               <View style={{marginBottom: 10}}>
                    <View>
                         <Searchbar onIconPress={() => (searchItem(search))} placeholder='Search Item' onChangeText={(value) => {setSearch(value)}} value={search} style={{width: 400}} />
                    </View>
               </View>

               <View style={{flexDirection: "row", height: 40}}>
                    <ScrollView horizontal={true}>
                         {
                              category_list.map((items, index) => {
                                   return <TouchableOpacity style={{margin: 10}} key={index} value={items} onPress={(() => (item(items)))}>
                                             <Text>{items}</Text>
                                          </TouchableOpacity>
                              })
                         }
                    </ScrollView>
               </View>
               
               <View style={{flex: 1, justifyContent:'flex-start'}}>
                    <ActivityIndicator size={'large'} animating={isLoading} style={style.loading}/>
                    <ScrollView>
                         <View style={style.itemContainer}>
                         {
                              product.map((items, index) => {
                                   return <Container display={setDisplay} name={items.product.title} price={items.product.price} image={items.product.image_url} key={index} onPress={
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
     },
     itemContainer: {
          justifyContent:'center',
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          justifyContent:'space-evenly'
     },

     loading: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
        }
})