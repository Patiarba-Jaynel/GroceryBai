import { useState, useEffect } from 'react'
import {TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Alert, ScrollView} from 'react-native'
import { Button, Text } from 'react-native-paper'
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { chooseCategory }  from '../../api/product/products'
import ProductContainer from '../Container/ProductContainer'
import Loading from '../miscsCompontent/Loading';


import CloseButton from '../miscsCompontent/CloseButton';

export default function Product({route, navigation }) {
     const [item, setItem] = useState()
     const [quantity, setQuantity] = useState(0)

     const [isLoading, setLoading ] = useState(false)

     const [product, setProduct] = useState([])

     const { name, image, category } = route.params

     const {image_url, title, price} = route.params.product


     async function selectCategory(name) {
          chooseCategory(name, setProduct, setLoading)
     }

     useEffect(() => {
          // write your code here, it's like componentWillMount
          selectCategory(category)
      }, [])

     return (
          <SafeAreaView style={style.container}>
          <View style={{justifyContent:'center'}}>
               <CloseButton navigation={navigation}/>
               <View style={{justifyContent:'center', alignItems:'center', flex: 2}}>
                    <View style={{}}>
                         <View style={{width: 350, height: 420, backgroundColor: 'white', borderRadius: 30}}>
                              <Image source={image_url} style={{height: 300, width: 350, borderTopLeftRadius: 30, borderTopRightRadius: 30}} contentFit='cover' transition={3000}/>

                              <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginBottom: 20, marginTop: 20, margin: 5}}>
                                   <Text variant='labelLarge' style={{fontWeight:'bold', textAlign: 'auto', fontSize: 15, marginLeft: 10,}}>{title}</Text>
                                   <Text variant='labelMedium' style={{fontWeight:'bold', textAlign:'left', marginTop: 10, marginLeft: 10, fontSize: 15, color: '#18B127'}}>{category}</Text>
                                   <Text variant='labelMedium' style={{fontWeight:'bold', textAlign:'left', marginTop: 10, marginLeft: 10, fontSize: 15, color: '#18B127'}}>₱{price}</Text>
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
                         <Button textColor='white' mode='elevated' buttonColor='#18B127' style={{height: 50, width: 150, justifyContent:'center'}}>Add
                         </Button>
                    </View>
               </View>


               {/** this is for recommendation */}
               <View style={{flex: 1}}>
                    <View style={{position:'absolute',left: 0,right: 0,top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', elevation: 5}} ><Loading loading={isLoading}></Loading></View>
                    <View>
                         <TouchableOpacity>
                              <Text variant='labelLarge' style={{fontWeight: 'bold', marginLeft: 10, paddingBottom: 10}}>
                                   Similar Product
                              </Text>
                         </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true}>
                         <View>
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
                         </View>
                    </ScrollView>
               </View>

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
          flexDirection: 'column', 
          flexWrap: 'wrap',
     },
})