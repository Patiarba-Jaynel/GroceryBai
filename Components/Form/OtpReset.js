import { Button, TextInput, Text, HelperText, ActivityIndicator, Icon, IconButton} from 'react-native-paper'
import { View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert } from 'react-native'
import { Formik } from 'formik'
import { PasswordResetSchema } from '../../utils/schema'
import { Login } from '../../api/account/login'
import CloseButton from '../miscsCompontent/CloseButton'

import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

import Loading from '../miscsCompontent/Loading'


export default function OTPReset( { route,  navigation }) {


     const email = route.params.userEmail

     const [isLoading, setLoading] = useState(false);

     return (
          
          <SafeAreaView style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <Loading loading={isLoading}></Loading>
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
                              Alert.alert(`${email}`)
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
                                                  mode='flat'
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
                         <TouchableOpacity style={{marginLeft: 10}} onPress={ () => navigation.navigate('Register')}>
                              <Text style={{color: 'green'}}>Resend</Text>
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