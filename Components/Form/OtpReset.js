import { Button, TextInput, Text, HelperText, ActivityIndicator, Icon, IconButton} from 'react-native-paper'
import { View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert, ScrollView, Platform } from 'react-native'
import { Formik } from 'formik'
import { PasswordResetSchema } from '../../utils/schema'
import { ResetPassword, SendOTP } from '../../api/account/reset'
import CloseButton from '../miscsCompontent/CloseButton'

import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

import Loading from '../miscsCompontent/Loading'


export default function OTPReset( { route,  navigation }) {


     const email = route.params.userEmail

     const [isLoading, setLoading] = useState(false);

     return (
          
          <SafeAreaView style={style.container}>
               <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <ScrollView>
               <View style={{position:'absolute',left: 0,right: 0,top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', elevation: 5}} ><Loading loading={isLoading}></Loading></View>
               <CloseButton navigation={navigation}/>
               <View style={{margin: 30, alignItems:'center'}}>
                    <Text variant='titleLarge' style={style.boldText}>OTP Code</Text>
               </View>

               <View style={{alignItems:'center'}}>
                    <Image source={require('../../assets/grocerylist.png')} style={{height: 250, width: 250}}></Image>
               </View>
               <View style={style.inputContainer}>
                    <Formik
                    onSubmit={ async (values) => {
                         try {
                              setLoading(true)
                              const data = {
                                   email: email,
                                   password: values.password,
                                   otp: values.otp
                              }
                              const reset = await ResetPassword(JSON.stringify(data))

                              if (reset.error) {
                                   setLoading(false)
                                   return Alert.alert('Error has been occurred', reset.message)
                              }

                              Alert.alert('Success', reset.message)

                              setLoading(false)

                              navigation.replace('Login')

                         } catch (error) {
                              Alert.alert('Error Ocurred', `${error}`)
                         }
                    }}
                    validationSchema={PasswordResetSchema}
                    initialValues={{otp: '', password: ''}}>
                         {
                              ({ handleChange, values, handleBlur, handleSubmit, errors, touched }) => (
                                   <View style={{alignItems: 'center'}}>
                                        <View>
                                             <TextInput
                                                  keyboardType='numeric'
                                                  mode='flat'
                                                  activeUnderlineColor='green'
                                                  activeOutlineColor='green'
                                                  placeholder='6 Digit Code'
                                                  onChangeText={handleChange('otp')}
                                                  value={values.otp}
                                                  error={errors.otp}
                                                  onBlur={handleBlur('otp')}
                                                  style={style.Input}>
                                             </TextInput>
                                             <HelperText type='error'>{errors.otp}</HelperText>   
                                             <TextInput
                                                  secureTextEntry={true}
                                                  autoCapitalize='none'
                                                  mode='outlined'
                                                  activeUnderlineColor='green'
                                                  activeOutlineColor='green'
                                                  placeholder='Password'
                                                  onChangeText={handleChange('password')}
                                                  value={values.password}
                                                  error={errors.password}
                                                  onBlur={handleBlur('password')}
                                                  style={style.Input}>
                                             </TextInput>
                                             <HelperText type='error'>{errors.password}</HelperText>
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
                                                  }}>Create New Password
                                             </Button>
                                   </View>
                              )
                         }
                    </Formik>

                    <View style={{flexDirection:'row', margin: 5, justifyContent: 'space-between'}}>
                         <Text>Didn't received the code?</Text>
                         <TouchableOpacity style={{marginLeft: 10}} onPress={ async () => {
                              try {
                                   setLoading(true)
                                   const send = await SendOTP(JSON.stringify({email: email}))
                                   if (send.error) 
                                   {
                                        setLoading(false)
                                        return Alert.alert('Error has been occurred', `${send.message}`)
                                   }
                                   Alert.alert('OTP Token has been send', `${send.message}`)
                                   setLoading(false)
                              } catch (error) {
                                   Alert.alert('Error Ocurred', `${error}`)
                                   
                              }
                         }}>
                              <Text style={{color: 'green'}}>Resend</Text>
                         </TouchableOpacity>
                    </View>
               </View>
               </ScrollView>
               </KeyboardAvoidingView>
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