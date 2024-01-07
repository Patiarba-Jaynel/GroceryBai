import { Button, TextInput, Text, HelperText, ActivityIndicator, IconButton} from 'react-native-paper'
import { View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert, ScrollView } from 'react-native'
import { Formik } from 'formik'
import { registerSchema } from '../../utils/schema'
import { CreateAccount } from '../../api/account/register'
import { Login } from '../../api/account/login'
import CloseButton from '../miscsCompontent/CloseButton'

import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

import Loading from '../miscsCompontent/Loading'


export default function Login1( { navigation }) {

     const [isLoading, setLoading] = useState(false);

     return (
          
          <SafeAreaView style={style.container} >
               <View style={{position:'absolute',left: 0,right: 0,top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', elevation: 5}}>
                    <Loading loading={isLoading}></Loading>
               </View>
               <CloseButton navigation={navigation}/>
                    <ScrollView>
                         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                              <View style={{margin: 30, alignItems:'center'}}>
                                   <Text variant='titleLarge' style={style.boldText}>Sign Up</Text>
                              </View>
                              <View style={style.inputContainer}>
                                   <Formik
                                   onSubmit={ async (values)=> {
                                        try {
                                             setLoading(true)
                                             const register = await CreateAccount(JSON.stringify(values))
                                             if(register.error) {setLoading(false); return Alert.alert('Error has been occurred', `${register.message}`)}
                                             Alert.alert('Successful', `${register.message}`)

                                             navigation.navigate('Login')
                                             setLoading(false)
                                        } catch (error) {
                                             setLoading(true)
                                             Alert.alert('Error has been occurred', `${error}`)
                                             setLoading(false)
                                        }
                                   }}
                                   validationSchema={registerSchema}
                                   initialValues={{first_name:'', last_name:'', email: '', password: ''}}>
                                        {
                                             ({ handleChange, values, handleBlur, handleSubmit, errors, touched }) => (
                                                  <View style={{alignItems: 'center'}}>
                                                       <View>
                                                            <TextInput
                                                                 mode='flat'
                                                                 activeUnderlineColor='green'
                                                                 activeOutlineColor='green'
                                                                 placeholder='Enter your first name'
                                                                 onChangeText={handleChange('first_name')}
                                                                 value={values.first_name}
                                                                 error={errors.first_name}
                                                                 onBlur={handleBlur('first_name')}
                                                                 style={style.Input}>
                                                            </TextInput>
                                                            <HelperText type='error'>{errors.first_name}</HelperText>
                                                       </View>
                                                       <View>
                                                            <TextInput
                                                                 mode='flat'
                                                                 activeUnderlineColor='green'
                                                                 activeOutlineColor='green'
                                                                 placeholder='Enter your last name'
                                                                 onChangeText={handleChange('last_name')}
                                                                 value={values.last_name}
                                                                 error={errors.last_name}
                                                                 onBlur={handleBlur('last_name')}
                                                                 style={style.Input}>
                                                            </TextInput>
                                                            <HelperText type='error'>{errors.last_name}</HelperText>
                                                       </View>
                                                       <View>
                                                            <TextInput
                                                                 autoCapitalize='none'
                                                                 mode='flat'
                                                                 activeUnderlineColor='green'
                                                                 activeOutlineColor='green'
                                                                 placeholder='Enter your Email'
                                                                 onChangeText={handleChange('email')}
                                                                 value={values.email}
                                                                 error={errors.email && touched.password}
                                                                 onBlur={handleBlur('email')}
                                                                 style={style.Input}>
                                                            </TextInput>
                                                            <HelperText type='error'>{errors.email}</HelperText>
                                                       </View>
                                                       <View>
                                                            <TextInput
                                                                 autoCapitalize='none'
                                                                 mode='flat'
                                                                 activeUnderlineColor='green'
                                                                 placeholder='Enter Your Password'
                                                                 secureTextEntry={true}
                                                                 onChangeText={handleChange('password')}
                                                                 value={values.password}
                                                                 error={errors.email && touched.password}
                                                                 onBlur={handleBlur('password')}
                                                                 style={style.Input}>
                                                            </TextInput>
                                                            <HelperText type='error'>{errors.password}</HelperText>
                                                       </View>
                                                       <Button   
                                                            mode='elevated'
                                                            onPress={handleSubmit}
                                                            icon={'login'}
                                                            textColor='black'
                                                            buttonColor='white'
                                                            style={{
                                                                 width:250,
                                                                 margin: 5
                                                            }}>Sign Up
                                                       </Button>
                                                  </View>
                                             )
                                        }
                                   </Formik>
                                   

                                   <View style={{flexDirection:'row', margin: 5, justifyContent: 'space-between'}}>
                                        <Text>Already have an account?</Text>
                                        <TouchableOpacity style={{marginLeft: 10}} onPress={ () => navigation.navigate('Login')}>
                                             <Text style={{color: 'green'}}>Login Here</Text>
                                        </TouchableOpacity>
                                   </View>
                              </View>

                    </KeyboardAvoidingView>
               </ScrollView>

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