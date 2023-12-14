import { Button, TextInput, Text, HelperText} from 'react-native-paper'
import { View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert } from 'react-native'
import { Formik } from 'formik'
import { loginSchema } from '../../utils/schema'
import { Login } from '../../api/account/login'

import * as SecureStore from 'expo-secure-store';



export default function Login1( { navigation }) {
     return (
          <KeyboardAvoidingView style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <View style={{margin: 100}}>
                    <Text variant='titleLarge' style={style.boldText}>Sign In</Text>
               </View>

               <View>
                    <Image source={require('../../assets/gorcerybai.png')} style={{height: 250, width: 250}}></Image>
               </View>
               <View style={style.inputContainer}>
                    <Formik
                    onSubmit={ async (values)=> {
                         const userLogin =  await Login(JSON.stringify(values))

                         if (userLogin.error) return Alert.alert("User and Password is Invalid", userLogin.message)

                         const token = await SecureStore.setItemAsync('token', userLogin.token)

                         navigation.replace('Profile')
                    }}
                    validationSchema={loginSchema}
                    initialValues={{email: '', password: ''}}>
                         {
                              ({ handleChange, values, handleBlur, handleSubmit, errors, touched }) => (
                                   <View style={{alignItems: 'center'}}>
                                        <View>
                                             <TextInput
                                                  mode='outlined'
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
                                                  mode='outlined'
                                                  activeOutlineColor='green'
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
                                                  }}>Sign In
                                             </Button>
                                   </View>
                              )
                         }
                    </Formik>

                    <Button 
                    mode='elevated'
                    onPress={()=>(Alert.alert("ASds"))}
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
               

          </KeyboardAvoidingView>
     )
}



const style = StyleSheet.create({
     container: {
          backgroundColor: "#fff",
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
     }
})