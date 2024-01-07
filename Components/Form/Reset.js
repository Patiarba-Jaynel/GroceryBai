import { Button, TextInput, Text, HelperText, ActivityIndicator, Icon, IconButton} from 'react-native-paper'
import { View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert } from 'react-native'
import { Formik } from 'formik'
import { forgotSchema } from '../../utils/schema'
import { SendOTP } from '../../api/account/reset'
import CloseButton from '../miscsCompontent/CloseButton'

import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

import Loading from '../miscsCompontent/Loading'


export default function Reset( { navigation }) {

     const [isLoading, setLoading] = useState(false);

     return (
          
          <SafeAreaView style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <View style={{position:'absolute',left: 0,right: 0,top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', elevation: 5}} ><Loading loading={isLoading}></Loading></View>
               <CloseButton navigation={navigation}/>
               <View style={{margin: 30, alignItems:'center'}}>
                    <Text variant='titleLarge' style={style.boldText}>Reset Your Password</Text>
               </View>

               <View style={{alignItems:'center'}}>
                    <Image source={require('../../assets/grocerylist.png')} style={{height: 250, width: 250}}></Image>
               </View>
               <View style={style.inputContainer}>
                    <Formik
                    onSubmit={ async (values) => {
                         try {
                              setLoading(true)
                              const send = await SendOTP(JSON.stringify(values))

                              if (send.error) 
                              {
                                   setLoading(false)
                                   return Alert.alert('Error has been occurred', `${send.message}`)
                              }
                              Alert.alert('OTP Token has been send', `${send.message}`)
                              navigation.replace('OTP', {userEmail: values.email})
                              setLoading(false)
                         } catch (error) {
                              Alert.alert('Error Ocurred', `${error}`)
                         }
                    }}
                    validationSchema={forgotSchema}
                    initialValues={{email: ''}}>
                         {
                              ({ handleChange, values, handleBlur, handleSubmit, errors, touched }) => (
                                   <View style={{alignItems: 'center'}}>
                                        <View>
                                             <TextInput
                                                  autoCapitalize='none'
                                                  mode='flat'
                                                  activeUnderlineColor='green'
                                                  activeOutlineColor='green'
                                                  placeholder='Enter your Email'
                                                  onChangeText={handleChange('email')}
                                                  value={values.email}
                                                  error={errors.email}
                                                  onBlur={handleBlur('email')}
                                                  style={style.Input}>
                                             </TextInput>
                                             <HelperText type='error'>{errors.email}</HelperText>
                                        </View>
                                             <Button   
                                                  mode='elevated'
                                                  onPress={handleSubmit}
                                                  icon={'send-outline'}
                                                  textColor='black'
                                                  buttonColor='white'
                                                  style={{
                                                       width:250,
                                                       margin: 5
                                                  }}>Send Reset Token
                                             </Button>
                                   </View>
                              )
                         }
                    </Formik>
                    <View style={{flexDirection:'row', margin: 5, justifyContent: 'space-between'}}>
                         <Text>Doesn't have account?</Text>
                         <TouchableOpacity style={{marginLeft: 10}} onPress={ () => navigation.navigate('Register')}>
                              <Text style={{color: 'green'}}>Register Here</Text>
                         </TouchableOpacity>
                    </View>
               </View>
               
          </SafeAreaView>
     )
}



const style = StyleSheet.create({
     container: {
          backgroundColor: "#F5F5F8",
          flex: 1,
     },
     ImageContainer: {
     },
     boldText: {
          fontWeight: 'bold'
     },
     Input: {
          backgroundColor: 'transparent',
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