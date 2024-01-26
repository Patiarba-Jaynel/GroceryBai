import {View, KeyboardAvoidingView, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, TextInput, RefreshControl, Platform} from 'react-native'
import {Button, Text, Searchbar, Chip, ActivityIndicator} from 'react-native-paper'

import React, { useRef } from 'react'
import Container from '../Container/Container'
import { useState, useEffect, useCallback } from 'react'
import Empty from '../Container/WeeklyPlanner/Empty'
import URL from '../../api/constants'


import Loading from '../miscsCompontent/Loading'
import { products, chooseCategory, searchProduct }  from '../../api/product/custom.js'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useScrollToTop } from '@react-navigation/native'
import {IconButton} from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native';

const category_list = ["Fresh Meat & Seafoods", "Fresh Produce", "Frozen Goods", "Ready To Heat & Eat Items", "Chilled & Dairy Items", "International Goods","Bakery", "Pantry", "Snacks", "Beverage", "Health & Beauty", "Babies & Kids", "Home Care", "DIY/Hardware", "Pet Care", "Health & Hygiene Essentials"]


export default function CustomHome( { navigation } ) {
     const ref = useRef(null)
     const [select, setSelect] = useState(false)

     const scrollRef = useRef();
     const [refreshing, setRefreshing] = React.useState(false)
     const [search, setSearch] = useState()
     const [isLoading, setLoading] = useState(false)
     const [isDisplay, setDisplay] = useState('flex')

     const [product, setProduct] = useState([])

     const [hasItem, setHasItem] = useState(false);

     const [error, setError] = useState(false)

     function item(item) {
          selectCategory(item)
          scrollBack()
     }

     useScrollToTop(ref)

      useFocusEffect(
          useCallback(() => {
               loadItem();
          }, [])
        );

     async function loadItem() {
          setRefreshing(true);
          products(setProduct, setLoading, setError)
          setRefreshing(false);
          setError(false)
     }
     
     async function selectCategory(name) {
          chooseCategory(name, setProduct, setLoading)
     }

     async function searchItem(name) {
          if (name.length == 0) return Alert.alert("Empty Search", "Please input desired item")

          searchProduct(name, setProduct, setLoading)
     }

     /** 
     if (isLoading) {
          return (
               <ActivityIndicator size={'medium'} animating={isLoading} style={style.loading} color='#00BF63'/>
          )
     }
     */

     function scrollBack() {
          scrollRef.current?.scrollTo({
               y: 0,
               animated: true
          })
     }

     if (error) {
          return (
               <Empty title="Cannot connect to the server" buttonTitle="Click to refresh" onPress={() => {
                    loadItem()
               }} />
          )
     }


     function renderItem(){
          return (
               <View style={{flex: 1, justifyContent:'flex-start'}}>
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                         <RefreshControl refreshing={refreshing} onRefresh={loadItem}></RefreshControl>
                     }
                    ref={scrollRef}>
                         <View style={style.itemContainer}>
                         {
                              product.map((items, index) => {


                                   return <Container name={items.product.title} price={items.product.price} image={items.product.image_url} category={items.product.category} key={index} onPress={
                                        () => {
                                             //navigation.navigate('AddProduct', {name: items.product.title, price: items.product.price, image: items.product.image_url, category: items.category})
                                             navigation.navigate('AddProduct', {...items})
                                        }
                                   } />
                              })
                         }

                         </View>
                    </ScrollView>
               </View>
          )
     }

     function renderEmpty() {
          return (
               <Empty title="No community Products are available" buttonTitle="Contribute now!" onPress={() => {
                    navigation.navigate('Custom')
               }} />
          )
     }

     return (
          <SafeAreaView  style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <View style={{flex: 1}}>
                    <View style={{marginBottom: 10, flexDirection:'row', alignItems:'center', justifyContent:'center', justifyContent:'space-around'}}>
                         <View style={{alignItems:'center'}}>
                              <Searchbar iconColor='#000000' onSubmitEditing={() => (searchItem(search))} placeholder='Search Item' onChangeText={(value) => {setSearch(value)}} value={search} style={{width: 300, backgroundColor:'#EFEEEE'}}  />
                         </View>
                         <View>
                              <TouchableOpacity>
                                   <IconButton
                                        iconColor='#18B127'
                                        icon="heart-outline"
                                        color={"#EFEEEE"}
                                        size={30}
                                        onPress={() => {
                                             navigation.navigate('Favorite');
                                        }}/>
                              </TouchableOpacity>
                         </View>
                    </View>

                    <View style={{flexDirection: "row", height: 40}}>
                         <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{}}>
                              {
                                   category_list.map((items, index) => {
                                        return <TouchableOpacity style={{margin: 10}} key={index} value={items} onPress={(() => (item(items)))}>
                                                  <Text>{items}</Text>
                                             </TouchableOpacity>
                                   })
                              }
                         </ScrollView>
                    </View>
                    {isLoading ? <View style={{position:'absolute',left: 0,right: 0,top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', elevation: 5}} ><Loading loading={isLoading}></Loading></View>
                    : product.length !== 0 ? renderItem() : renderEmpty() }
               </View>
          </SafeAreaView>
     )
}

const style = StyleSheet.create({
     container: {
          backgroundColor: "#F5F5F8",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
     },
     itemContainer: {
          justifyContent:'center',
          flexDirection: 'row', 
          flexWrap: 'wrap',
          marginBottom: 50
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