import {View, StyleSheet, TouchableOpacity, Alert, ImageBackground, SafeAreaView, ScrollView} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import { Button } from 'react-native-paper';
import { Image } from 'expo-image';
import CloseButton from '../../miscsCompontent/CloseButton';
import { useEffect, useState } from 'react';
import { updateList, deleteList } from '../../../api/planner/item'

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


function ListContainer({navigation, route}) {


    const [total, setTotal] = useState()
    const [list, setList] = useState([])

    useEffect(() => {
      function set() {
        setList(items)
      }
      set()
    }, [])

    const items = route.params.items
    const userId = route.params.userId
    const ItemId = route.params._id

    const data = JSON.stringify({
      userId: userId,
      itemId: ItemId
    })

    function ListDelete() {
      deleteList(JSON.stringify(data))
      navigation.pop()
    }

     return (
      <SafeAreaView>
        <CloseButton navigation={navigation}/>
        <View style={{alignItems:'center', marginBottom: 50}}>
        <View style={{ alignItems:'center'}}>
          <Text variant='titleLarge' style={style.boldText}>Your Week List</Text>
        </View>
         </View>
         <View style={{alignItems:'center', justifyContent: 'center'}}>
          <ScrollView>
          {
            list.map((item, index) => {
              return (
                <View  key={index}>
                  <View>
                    <View style={style.container}>
                        <Image source={item.image_url} style={style.image}></Image>
                        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{margin: 5, textAlign: 'center', textAlignVertical: 'auto'}}>{item.title}</Text>
                            <View style={{alignItems:'center', flexDirection:'row'}}>
                              <Text style={{fontWeight: "bold", color:'#18B127'}}>₱{item.price}</Text>
                              <Button icon={'delete-forever-outline'} mode='text' textColor='white' buttonColor='red' style={{marginLeft: 150}} onPress={()=> {
                                try {
                                  let NewList = [...list]
                                  NewList.splice(index, 1)
                                  json = {
                                    itemId: ItemId,
                                    userId: userId,
                                    items: NewList
                                  }
                                  const req = updateList(JSON.stringify(json))
                                  setList(NewList)
                                } catch (error) {
                                  Alert.alert('Error occurred', error)
                                }
                              }}>Remove</Button>
                            </View>

                        </View>
                    </View>
                  </View>
                </View>
              )
            })
          }
          </ScrollView> 
          </View>
          <View style={{backgroundColor:'white', padding: 20, borderRadius: 20, flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
            <Text variant='titleMedium' key={route.params._id}>Total: ₱ {route.params.total}</Text>
            <View style={{flexDirection:'row', alignSelf:'center', padding: 20}}>
              <Button icon={'store-plus-outline'} mode='elevated' textColor='black' buttonColor='white' style={{margin: 10}} onPress={() => {
                navigation.navigate('Home')
              }}>Add more</Button>
              <Button icon={'delete-outline'} mode='elevated' textColor='white' buttonColor='#18B127' style={{margin: 10}} onPress={() => (deleteList(data, navigation))}>Delete</Button>
            </View>
            </View>
        </SafeAreaView>
     )
}

export default ListContainer;

const style = StyleSheet.create({
     container: 
     {  
          flexDirection:"row",
          backgroundColor: 'white',
          display: 'flex',
          padding: 10,
          alignItems: 'center', 
          borderRadius: 20, 
          marginBottom: 10,
          elevation: 3,
     },
     image: {
          borderTopEndRadius: 20,
          borderTopLeftRadius: 20,
          height: 100,
          width: 100,
          marginBottom: 10,
          marginRight: 10,
     },
     imageContainer: 
     {
          borderRadius: 100,
          backgroundColor: 'white', 
          margin: 5,
          shadowColor: "green",
          shadowOffset: {
               width: 0,
               height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
     },
     boldText: {
      fontWeight: 'bold'
 },
})