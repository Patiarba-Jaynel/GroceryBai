import { useState, useEffect, useCallback } from 'react'
import {TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Alert, ScrollView, Platform} from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { chooseCategory1 }  from '../../api/product/products'
import ProductContainer from '../Container/ProductContainer'
import Loading from '../miscsCompontent/Loading';
import { Portal, Modal, TextInput, IconButton } from "react-native-paper"
import DropDown from "react-native-paper-dropdown";
import * as SecureStore from 'expo-secure-store';

import { ListItem, updateList, ListItem1 } from '../../api/planner/item'

import {createProduct} from '../../api/product/favorite'


import ProductContainerModal from '../Modal/ProductContainerModal';

import CloseButton from '../miscsCompontent/CloseButton';


export default function Product({route, navigation }) {
     const [list, setList] = useState([])
     const [item, setItem] = useState([])
     const [quantity, setQuantity] = useState(1)
     const [currentList, setCurrentList] = useState([])

     const [isLoading, setLoading ] = useState(false)
     const [addLoading, setAddLoading] = useState(false)
     const [isError, setError] = useState(false)

     const [product, setProduct] = useState([])

     const { name, image, category } = route.params

     const {image_url, title, price, _id} = route.params.product


     async function selectCategory(name) {
          chooseCategory1(name, setProduct, setLoading)
     }

     async function LoadItem() {
          const items = list.item
          //console.log(items)
          if (items) {
               let y = []
     
               items.map((data, index) => {
                    let i = {
                         label: data.name,
                         value: data._id
                    }
                    y.push(i)
               })
               setItem(y)
          }
     }

     async function getItem(itemId) {
          const req = await ListItem1(itemId)
          const userItem = req.item[0].items
     }


     useEffect(() => {
          // write your code here, it's like componentWillMount

      }, [])

     useFocusEffect(
          useCallback(() => {
               selectCategory(category)
               ListItem(setList, setLoading, setError)
               //LoadItem()
          }, [])
     );

     //modal
     const [visible, setVisible] = useState(false);
     const showModal = () => setVisible(true);
     const hideModal = () => setVisible(false);
     const containerStyle = {backgroundColor: 'white', padding: 20, alignSelf: 'center', width: 350, borderRadius: 10};

     const [listName, setListName] = useState()
     const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
     const [showDropDown, setShowDropDown] = useState(false);
     const [selectedList, setSelectedList] = useState()

     const [choose, setChoose] = useState(false);



     //add it to favorite
     

     return (
          <SafeAreaView style={style.container}>
          <ScrollView>
          <View style={{justifyContent:'center'}}>
               {/*<CloseButton navigation={navigation}/>*/}
               <View style={{justifyContent:'center', alignItems:'center', flex: 2}}>
                    <View style={{}}>
                         <View style={{width: 350, height: 420, backgroundColor: 'white', borderRadius: 30}}>
                              <Image source={image_url} style={{height: 300, width: 350, borderTopLeftRadius: 30, borderTopRightRadius: 30}} contentFit='cover' transition={3000}/>

                              <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginBottom: 20, marginTop: 20, margin: 5}}>
                                   <Text variant='labelLarge' style={{fontWeight:'bold', textAlign: 'auto', fontSize: 15, marginLeft: 10,}}>{title}</Text>
                                   <Text variant='labelMedium' style={{fontWeight:'bold', textAlign:'left', marginTop: 10, marginLeft: 10, fontSize: 15, color: '#18B127'}}>{category}</Text>
                                   <View style={{flexDirection: 'row', justifyContent:'space-evenly'}}>
                                        <Text variant='labelMedium' style={{fontWeight:'bold', textAlign:'left', marginTop: 10, marginLeft: 10, fontSize: 15, color: '#18B127'}}>₱{price}</Text>
                                        <IconButton
                                        iconColor='#18B127'
                                        icon={choose ? "heart" : "heart-outline"}
                                        style={{left: 200, bottom: 30}}
                                        color={"#EFEEEE"}
                                        size={30}
                                        onPress={async () => {
                                             console.log("clicked")
                                             try {
                                                  const userId = await SecureStore.getItemAsync('userId')
                                                  console.log(_id)
                                                  data = JSON.stringify({
                                                       "_id": _id,
                                                       "category": category,
                                                       "userId": userId,
                                                       "product": {
                                                            "title": title,
                                                            "price": Number(price),
                                                            "image_url": image_url
                                                       }
                                                  })

     
                                                  const add = await createProduct(data)
     
                                                  !choose ? setChoose(true) : setChoose(false)
                                                  
                                                  if (add) {
                                                       Alert.alert("Successfully added", 'Successfully added to the favorite')
                                                  }
                                                  else {
                                                       Alert.alert("Unknown error Occurred", 'Unknown error Occurred')
                                                  }

                                             } catch (error) {
                                                  Alert.alert("Unknown error Occurred", error)
                                             }

                                        }}/>
                                   </View>

                              </View>
                         </View>
                    </View>


                    <View style={{flexDirection: 'row', marginTop: 20}}>
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
                         <Button textColor='white' icon={"cart-plus"} mode='contained' buttonColor='#18B127' style={{justifyContent:'center'}} onPress={()=>{
                              showModal()
                              LoadItem()
                         }}>Add
                         </Button>
                    </View>
               </View>
               <View  style={{ alignItems: 'center'}}>
               <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                         <Text variant='titleMedium' style={{padding: 10}}>Add To List</Text>
                         {
                         <DropDown
                         label={'Insert to'}
                         mode='flat'
                         visible={showMultiSelectDropDown}
                         showDropDown={() => setShowMultiSelectDropDown(true)}
                         onDismiss={() => setShowMultiSelectDropDown(false)}
                         value={selectedList}
                         setValue={setSelectedList}
                         list={item}
                         activeColor={'green'}
                         inputProps={{ style:style.dropDown}}
                         dropDownItemSelectedStyle={style.dropDown}
                         //dropDownItemSelectedTextStyle={style.dropDown}
                         dropDownItemStyle={style.dropDown}
                         //dropDownItemTextStyle={style.dropDown}
                         />
                         }
                         <View style={{margin: 10}}>
                              <Button loading={addLoading} icon={"bookmark-plus-outline"} mode='contained-tonal' textColor='white' buttonColor='#18B127' onPress={async () => {
                                   try {
                                        setAddLoading(true)
                                        const id = selectedList
                                        const newItem = {
                                             image_url:image_url,
                                             title:title,
                                             price: price
                                        }

                                        for (let i = 0; i < quantity; i++){
                                             const req = await ListItem1(id)
                                             const userItem = req.item[0].items
                                             const userId = req.item[0].userId
                                             const update = await updateList(JSON.stringify({
                                                  itemId: id,
                                                  userId: userId,
                                                  items: [...userItem, newItem]
                                             }))
                                        }
                                        setAddLoading(false)
                                        setVisible(false)
                                        navigation.pop()
                                   } catch (error) {
                                        Alert.alert('Error Occurred', error)
                                   }
                              }}>Add New List </Button>
                         </View>
                    </Modal>
               </Portal>
               </View>
               {/** this is for recommendation */}
               
               <View style={{flex: 1}}>
                    <View>
                         <TouchableOpacity>
                              <Text variant='labelLarge' style={{fontWeight: 'bold', marginLeft: 10, paddingBottom: 10}}>
                                   Similar Product
                              </Text>
                         </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={Platform.OS == "android" ? false : true}>
                              <View style={style.itemContainer}>
                              {
                                   product.map((items, index) => {
                                        return <ProductContainer name={items.product.title} price={items.product.price} image={items.product.image_url} category={items.product.category} key={index} onPress={
                                             () => {
                                                  navigation.replace('AddProduct', {...items})
                                             }
                                        } />
                                   })
                              }
                              </View>
                    </ScrollView>
               </View>
               
          </View>
          </ScrollView>
          </SafeAreaView>
     )
}

const style = StyleSheet.create({
     container: {
          marginTop: 40,
          backgroundColor: "#F5F5F8",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
     },
     itemContainer: {
          justifyContent:'center',
          flexDirection: 'row', 
          flexWrap: 'wrap',
     },
     Input: {
          backgroundColor: 'transparent',
          width: 300,
          borderRadius: 100,
          margin: 10
     },
     dropDown: {
          backgroundColor:'white'
     }
})