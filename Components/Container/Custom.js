import { View, SafeAreaView, KeyboardAvoidingView, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useState } from "react";
import { Button, TextInput, HelperText } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { firebase } from "../../utils/config";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import CloseButton from "../miscsCompontent/CloseButton";
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from "@expo/vector-icons";

import { createProduct } from '../../api/product/custom'


export default function Custom({ navigation }) {
     const [image, setImage] = useState('/Users/user/Documents/Grocery/app/assets/tomato.png');
     const [uploading, setUploading] = useState(false);

     const [category, setCategory] = useState();
     const [title, setTitle] = useState();
     const [price, setPrice] = useState();
     
     const pickImage = async () => {
          // No permissions request is necessary for launching the image library
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
        };

     const uploadMedia = async () => {
          setUploading(true)

          try {
               const { uri } = await FileSystem.getInfoAsync(image);
               const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
     
                    xhr.onload = () => {
                         resolve(xhr.response)
                    }
                    xhr.onerror = (e) => {
                         reject(new TypeError('Network request failed'))
                    }
                    xhr.responseType = 'blob'
                    xhr.open('GET', uri, true)
                    xhr.send(null)
               })
     
               const filename = image.substring(image.lastIndexOf('/') + 1)
               const ref = firebase.storage().ref().child(filename)
     
               const up = await ref.put(blob)
               const fileName = up._delegate.metadata.fullPath
               
               const userId = await SecureStore.getItemAsync('userId')
               
               data = JSON.stringify({
                    "category": category,
                    "userId": userId,
                    "product": {
                         "title": title,
                         "price": Number(price),
                         "image_url": `https://firebasestorage.googleapis.com/v0/b/grocerybai.appspot.com/o/${fileName}?alt=media`
                    }
               })

               const productCreate = await createProduct(data)
               setUploading(false)
               Alert.alert('Successfully Added', 'Custom Product has been uploaded to the community product section')
               setImage(null)
               navigation.pop()
          }
          catch (error){
               Alert.alert(error)
               setUploading(false)
               navigation.pop()    
          }
     }


     const [showDropDown, setShowDropDown] = useState(false);
     const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
     const categoryList = [
       {
         label: "Fresh Meat & Seafoods",
         value: "Fresh Meat & Seafoods",
       },
       {
         label: "Fresh Produce",
         value: "Fresh Produce",
       },
       {
         label: "Frozen Goods",
         value: "Frozen Goods",
       },
       {
          label: "Ready To Heat & Eat Items",
          value: "Ready To Heat & Eat Items",
        },
        {
          label: "Chilled & Dairy Items",
          value: "Chilled & Dairy Items",
        },
        {
          label: "International Goods",
          value: "International Goods",
        },
        {
          label: "Bakery",
          value: "Bakery",
        },
        {
          label: "Pantry",
          value: "Pantry",
        },
        {
          label: "Snacks",
          value: "Snacks",
        },
        {
          label: "Beverage",
          value: "Beverage",
        },
        {
          label: "Health & Beauty",
          value: "Health & Beauty",
        },
        {
          label: "Babies & Kids",
          value: "Babies & Kids",
        },
        {
          label: "Home Care",
          value: "Home Care",
        },
        {
          label: "DIY/Hardware",
          value: "DIY/Hardware",
        },
        {
          label: "Pet Care",
          value: "Pet Care",
        },
        {
          label: "Health & Hygiene Essentials",
          value: "Health & Hygiene Essentials",
        },
     ];

     return (
     <SafeAreaView style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
               <CloseButton navigation={navigation}/>
               <KeyboardAvoidingView>
               <View>
                    <View style={{ alignItems: "center" }}>
                    <View
                         style={{
                         elevation: 2,
                         height: 200,
                         width: 200,
                         borderWidth:1,
                         backgroundColor: "#efefef",
                         position: "relative",
                         borderRadius: 999,
                         overflow: "hidden",
                         }}
                    >
                         {image && (
                         <Image
                         source={{ uri: image }}
                         style={{ width: 200, height: 200 }}
                         />
                         )}
                         <View
                         style={{
                         opacity: 0.7,
                         position: "absolute",
                         right: 0,
                         bottom: 0,
                         backgroundColor: "lightgrey",
                         width: "100%",
                         height: "25%",
                         }}
                         >
                         <TouchableOpacity
                         
                         onPress={pickImage}
                         style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                         }}
                         >
                              
                         <Text style={{ fontSize:16, marginTop:10}} >Upload Image</Text>
                         
                         </TouchableOpacity>
                         </View>
                    </View>
          
                    <View>
                    <DropDown
                         label={"Category"}
                         mode={"flat"}
                         visible={showDropDown}
                         showDropDown={() => setShowDropDown(true)}
                         onDismiss={() => setShowDropDown(false)}
                         value={category}
                         inputProps={{ style:style.Input}}
                         setValue={setCategory}
                         list={categoryList}
                         dropDownItemSelectedStyle={style.dropDown}
                         dropDownItemStyle={style.dropDown}
                         activeColor="green"
                         activeUnderlineColor='green'
                         activeOutlineColor='green'
                         style={style.Input}
                         />
                    {/*<HelperText type='error'>{errors.email}</HelperText>*/}
               </View>
                    <View>
                         <TextInput
                              onChangeText={(value) => setTitle(value) }
                              mode='flat'
                              activeUnderlineColor='green'
                              activeOutlineColor='green'
                              placeholder='Name'
                              //onChangeText={handleChange('email')}
                              //value={values.email}
                              //error={errors.email && touched.password}
                              //onBlur={handleBlur('email')}
                              style={style.Input}
                              >
                         </TextInput>
                    </View>
                    <View>
                         <TextInput
                              onChangeText={(value) => setPrice(value) }
                              keyboardType="numeric"
                              mode='flat'
                              activeUnderlineColor='green'
                              activeOutlineColor='green'
                              placeholder='Price'
                              //onChangeText={handleChange('email')}
                              //value={values.email}
                              //error={errors.email && touched.password}
                              //onBlur={handleBlur('email')}
                              style={style.Input}
                              >
                         </TextInput>
                    </View>
                    </View>
          
                    <View style={{ marginTop: 30, alignItems: "center" }}>
                    <Button
                         mode="contained-tonal"
                         buttonColor="#18B127"
                         icon={'camera'}
                         loading={uploading}
                         textColor="white"
                         // onPress={props.onPress}
                         onPress={uploadMedia}
                    >
                         {"Upload"}
                    </Button>
                    </View>
               </View>
               </KeyboardAvoidingView>
          </ScrollView>
       </SafeAreaView>
     );
   }
   const style = StyleSheet.create({
     container: {
       backgroundColor: "#F5F5F8",
       justifyContent: "center",
       alignItems: "center",
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
   });