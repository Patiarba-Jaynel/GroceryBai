import { Button, TextInput, Text, HelperText, ActivityIndicator, FAB} from 'react-native-paper'
import { View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert, ScrollView } from 'react-native'
import { Formik } from 'formik'
import { loginSchema } from '../../utils/schema'
import { Login } from '../../api/account/login'

import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loading from '../miscsCompontent/Loading'


export default function Login1( { navigation }) {

     const [isLoading, setLoading] = useState(false);
     const [show, setShow]= useState(true);

     return (
          <SafeAreaView style={style.container}>
               <Loading loading={isLoading}></Loading>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <ScrollView showsVerticalScrollIndicator={false}>
               <View style={{margin: 30, alignItems:'center'}}>
                    <Text variant='titleLarge' style={style.boldText}>Sign In</Text>
               </View>

               <View style={{alignItems:'center'}}>
                    <Image source={require('../../assets/grocerylist.png')} style={{height: 250, width: 250}}></Image>
               </View>
               <View style={style.inputContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Formik
                    onSubmit={ async (values)=> {
                         try {
                              setLoading(true)
                              const userLogin =  await Login(JSON.stringify(values))
                              
                              if (userLogin.error) {
                                   setLoading(false)
                                   return Alert.alert("Error has been occurred", userLogin.message)
                              }

                              const token = await SecureStore.setItemAsync('token', userLogin.token)
                              const userId = await SecureStore.setItemAsync('userId', userLogin.id)
     
                              navigation.replace('Screen')
                              setLoading(false)
                         } catch (error) {
                              setLoading(true)
                              Alert.alert('Error has been occurred', `${error}`)
                              setLoading(false)
                         }

                    }}
                    validationSchema={loginSchema}
                    initialValues={{email: '', password: ''}}>
                         {
                              ({ handleChange, values, handleBlur, handleSubmit, errors, touched }) => (
                                   <View style={{alignItems: 'center'}}>
                                        <View>
                                             <TextInput
                                                  autoCapitalize='none'
                                                  mode='outlined'
                                                  activeUnderlineColor='green'
                                                  activeOutlineColor='green'
                                                  placeholder='Enter your Email'
                                                  onChangeText={handleChange('email')}
                                                  value={values.email}
                                                  error={errors.email && touched.password}
                                                  onBlur={handleBlur('email')}
                                                  style={style.Input}
                                                  left={<TextInput.Icon icon={"email"}/>}
                                             >
                                             </TextInput>
                                             <HelperText type='error'>{errors.email}</HelperText>
                                        </View>
                                        <View>
                                             <TextInput
                                                  autoCapitalize='none'
                                                  mode='outlined'
                                                  activeUnderlineColor='green'
                                                  activeOutlineColor='green'
                                                  placeholder='Enter Your Password'
                                                  secureTextEntry={show}
                                                  onChangeText={handleChange('password')}
                                                  value={values.password}
                                                  error={errors.email && touched.password}
                                                  onBlur={handleBlur('password')}
                                                  style={style.Input}
                                                  right={<TextInput.Icon onPress={() => (setShow(!show))} icon={show ? "eye-off": "eye"}/>}
                                                  >
                                             </TextInput>
                                             <HelperText type='error'>{errors.password}</HelperText>
                                        </View>
                                             <Button
                                                  loading={isLoading}   
                                                  mode='elevated'
                                                  onPress={handleSubmit}
                                                  icon={'login'}
                                                  textColor='black'
                                                  buttonColor='white'
                                                  style={{
                                                       width:250,
                                                       margin: 5
                                                  }}>Sign In
                                             </Button>
                                   </View>
                              )
                         }
                    </Formik>

                    <Button 
                    mode='elevated'
                    onPress={
                         () => (navigation.navigate('Reset'))
                    }
                    icon={'login'}
                    textColor='white'
                    buttonColor='#00BF63'
                    style={{
                         width:250,
                         marginTop: 5,
                         margin: 5
                    }}>Reset Password</Button>

                    <View style={{flexDirection:'row', margin: 5, justifyContent: 'space-between'}}>
                         <Text>Doesn't have account?</Text>
                         <TouchableOpacity style={{marginLeft: 10}} onPress={ () => navigation.navigate('Register')}>
                              <Text style={{color: 'green'}}>Register Here</Text>
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