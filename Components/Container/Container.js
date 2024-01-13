import {View, StyleSheet, TouchableOpacity, Alert, ImageBackground} from 'react-native';
import {Text} from 'react-native-paper';
import { Button } from 'react-native-paper';
import { Image } from 'expo-image';

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


function Container(item) {


     return (
          <TouchableOpacity onPress={item.onPress}>
               <View style={style.container}>
                    {/** 
                    <View style={style.imageContainer}>
                         <Image  source={item.image} style={style.image} contentFit='cover' transition={1000} placeholder={blurhash}/>
                    </View>
     */}
                    <Image source={item.image} style={style.image}></Image>
                    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                         <Text style={{margin: 5, textAlign: 'center', textAlignVertical: 'auto'}}>{item.name}</Text>
                         <Text style={{fontWeight: "bold", color:'#18B127'}}>₱{item.price}</Text>
                    </View>
               </View>
          </TouchableOpacity>
     )
}

export default Container;

const style = StyleSheet.create({
     container: 
     {
          backgroundColor: 'white',
          display: 'flex',
          width: 170, 
          height: 250, 
          alignItems: 'center', 
          borderRadius: 20, 
          margin: 5,
          elevation: 3,
     },
     image: {
          borderTopEndRadius: 20,
          borderTopLeftRadius: 20,
          width: 170,
          height: 150,
          marginBottom: 10
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
     }
})