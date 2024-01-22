import { Portal, Modal, Text, TextInput, Button } from "react-native-paper"
import { Formik } from "formik"
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native"
import { useState } from "react"
import { firebase } from "../../utils/config";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import { Image } from "expo-image";

import {updateAccount} from '../../api/account/update'

export default function ProfileModal(props) {

     const { email, first_name, last_name, _id }  = props


     const [image, setImage] = useState(props.image);
     const [uploading, setUploading] = useState(false);

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

     const uploadMedia = async (first_name, last_name) => {
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
               
               const data = JSON.stringify({
                    id: _id,
                    first_name: first_name,
                    last_name: last_name,
                    image: `https://firebasestorage.googleapis.com/v0/b/grocerybai.appspot.com/o/${fileName}?alt=media`
               })

               console.log(data)

               await updateAccount(data)


               setUploading(false)
               Alert.alert('Successfully Update', 'Your account has been successfully updated')
               setImage(null)
               props.setVisible(false)
          }
          catch (error){
               console.log(error)
               Alert.alert(error)
               setUploading(false)
               props.setVisible(false)
          }
     }

     return (
          <Portal>
          <Modal visible={props.visible} onDismiss={()=>(props.setVisible(false))} contentContainerStyle={style.containerStyle}>
               <Text variant="titleLarge" style={{marginBottom: 10, fontWeight: 'bold'}}>Edit Information</Text>
               <Formik
               onSubmit={async (values)=> {
                    console.log(values)
                    await uploadMedia(values.first_name, values.last_name)
               }}
               initialValues={{first_name: first_name, last_name: last_name}}>
                    {
                         ({ handleChange, values, handleBlur, handleSubmit, errors, touched }) => (
                              <View>
                                   <View style={{ alignItems: "center" }}>
                                        <View
                                             style={{
                                             elevation: 2,
                                             height: 200,
                                             width: 200,
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
                                             <Text>Upload Image</Text>
                                             </TouchableOpacity>
                                             </View>
                                        </View>
                                   </View>
                                   <TextInput
                                        mode='outlined'
                                        autoCapitalize='none'
                                        left={<TextInput.Icon icon={"form-textbox"}/>}
                                        activeUnderlineColor='green'
                                        activeOutlineColor='green'
                                        placeholder='Enter your first name'
                                        onChangeText={handleChange('first_name')}
                                        value={values.first_name}
                                        error={errors.first_name}
                                        onBlur={handleBlur('first_name')}
                                        style={style.Input}
                                   />
                                   
                                   <TextInput
                                        mode='outlined'
                                        autoCapitalize='none'
                                        left={<TextInput.Icon icon={"form-textbox"}/>}
                                        activeUnderlineColor='green'
                                        activeOutlineColor='green'
                                        placeholder='Enter your last name'
                                        onChangeText={handleChange('last_name')}
                                        value={values.last_name}
                                        error={errors.last_name}
                                        onBlur={handleBlur('last_name')}
                                        style={style.Input}
                                   />
                                   
                                   <Button
                                        loading={uploading}   
                                        mode='elevated'
                                        onPress={handleSubmit}
                                        icon={'pencil'}
                                        textColor='black'
                                        buttonColor='#D9EDBF'
                                        style={{
                                             alignSelf: 'center',
                                             padding: 2
                                        }}>Edit Information
                                   </Button>
                              </View>
                         )
                    }
               </Formik>
          </Modal>
     </Portal>
     )
}


const style = StyleSheet.create({
     container: {
          backgroundColor: "#F5F5F8",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
     },
     ImageContainer: {
     },
     boldText: {
          fontWeight: 'bold'
     },
     Input: {
          backgroundColor: 'white',
          width: 300,
          borderRadius: 100,
          margin: 10
     },
     inputContainer: {
          textAlign: 'center',
          alignItems: 'center',
          flex: 2,
          margin: 1
     },
     containerStyle: {
          backgroundColor: 'white', alignSelf: 'center', alignItems:'center', width: 400, height: 600, borderRadius: 10
     }
})