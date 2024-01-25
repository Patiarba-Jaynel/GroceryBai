import {View, StyleSheet, TouchableOpacity, Alert, ImageBackground, SafeAreaView, ScrollView, Platform} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import { Button } from 'react-native-paper';
import { Image } from 'expo-image';
import CloseButton from '../../miscsCompontent/CloseButton';
import { useEffect, useState } from 'react';
import { updateList } from '../../../api/planner/item'
import { createList, deleteList} from '../../../api/planner/historyitems'


function ListContainer({navigation, route}) {

    const [isLoading, setLoading] = useState(false)
    const [list, setList] = useState([])


    const total = route.params.total

    useEffect(() => {
      function set() {
        setList(items)
      }
      set()
    }, [])


    const items = route.params.items
    const userId = route.params.userId
    const ItemId = route.params._id
    const schedule1 = route.params.schedule

    const data = JSON.stringify({
      userId: userId,
      itemId: ItemId
    })


     return (
      <SafeAreaView style={{justifyContent: 'center', flex: 1}}>
              <View style={{flex:1}} >
                <View style={{alignItems:'center', justifyContent: 'center', marginBottom: 50, marginTop: Platform.OS == "android" ? 100: 20}}>
                      <Text variant='titleLarge' style={{fontWeight: 'bold', fontSize:30}}>Grocery Weekly Planner</Text>
                </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                              <ScrollView showsVerticalScrollIndicator={false}> 
                                <View style={{flex: 1}}>
                                  {
                                    list.map((item, index) => {
                                      return (
                                        <View key={index}>
                                          <View style={style.container}>
                                            <Image source={item.image_url} style={style.image}></Image>
                                            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                                            <Text style={{textAlign: 'center', flexWrap:'wrap', width:250}}numberOfLines={2}>{item.title}</Text>
                                            <View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-around'}}>
                                              <Text style={{marginTop:10, fontWeight: "bold", fontSize:20, color:'#18B127'}}>₱ {item.price}</Text>
                
                                            </View>
                                        </View>

                                        {/* this is an empty space */}
                                        <View></View>

                                          </View>
                                          {/* The Remove Bttn */}
                                          <View style={{marginBottom:30, justifyContent:'center'}} >
                                              </View>
                                          
                                        </View>
                                      )
                                    })
                                  }
                                </View>
                              </ScrollView>
                              <Divider style={{marginBottom: Platform.OS == "android" ? 250 : 50}}/>
                    </View>
              </View>
              <View >
            <View style={{backgroundColor:'white', padding: 10, borderRadius: 10, flexDirection:'row', alignItems:'center', justifyContent: 'space-between'}}>
              <Text variant='titleMedium' key={route.params._id}>Total: ₱ {total.toFixed(2)}</Text>
              <View style={{flexDirection:'row', alignSelf:'center', padding: 10,}}>
                <Button loading={isLoading} icon={'delete-outline'} mode='elevated' textColor='white' buttonColor='#18B127' style={{margin: 2}} onPress={ async () => {
                    await deleteList(data, navigation)
                }}>Delete</Button>
              </View>
            </View>
          </View>
        </SafeAreaView>
     )
}

export default ListContainer;

const style = StyleSheet.create({
     container: 
     {    
          justifyContent:'space-between',
          flexDirection:"row",
          backgroundColor: 'white',
          // display: 'flex',
          height: 100,
          width: 350,
          alignItems: 'center', 
          borderRadius: 20
          
     },
     image: {
          borderTopStartRadius: 20,
          borderBottomLeftRadius: 20,
          height: 95,
          width: 90,
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