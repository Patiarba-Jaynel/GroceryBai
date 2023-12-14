import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Text} from 'react-native-paper';
import { Button } from 'react-native-paper';
import { Image } from 'expo-image';

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


function Container(item) {


     function add() {
          Alert.alert("item has been added", "Your item has been added to the list")
     }

     return (
          <TouchableOpacity onPress={item.onPress} style={{display: `${item.display}`}}>
               <View style={style.container}>
                    <View>
                         <Image  source={item.image} style={{ height: 100, width: 100, margin: 20}} contentFit='cover' transition={1000} placeholder={blurhash}/>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                         <Text style={{margin: 10, textAlign: 'center'}}>{item.name}</Text>
                         <Text style={{fontWeight: "bold"}}>₱{item.price}</Text>
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
          width: 150, 
          height: 250, 
          alignItems: 'center', 
          borderRadius: 5, 
          margin: 10,
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
     },

})