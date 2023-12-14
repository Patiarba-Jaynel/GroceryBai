import { Button, TextInput, Text} from 'react-native-paper'
import { View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert } from 'react-native'



export default function Register() {
     return (
          <KeyboardAvoidingView style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <View style={{margin: 100}}>
                    <Text variant='titleLarge' style={style.boldText}>Sign Up</Text>
               </View>

               <View>
                    <Image source={require('../../assets/gorcerybai.png')} style={{height: 250, width: 250}}></Image>
               </View>
               

               <View style={style.inputContainer}>
                    <View>
                         <TextInput
                         mode='outlined'
                         activeOutlineColor='green'
                         placeholder='Enter your Email'
                         style={style.Input}>

                         </TextInput>
                         
                         <TextInput
                         mode='outlined'
                         activeOutlineColor='green'
                         placeholder='Enter Your Password'
                         secureTextEntry={true}
                         style={style.Input}>

                         </TextInput>
                    </View>

                    <Button 
                    mode='elevated'
                    onPress={()=>(Alert.alert("ASds"))}
                    icon={'login'}
                    textColor='black'
                    buttonColor='white'
                    style={{
                         width:250,
                         margin: 5
                    }}>Sign In</Button>

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
                         <TouchableOpacity style={{marginLeft: 10}} onPress={()=>(Alert.alert("asdads"))}>
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