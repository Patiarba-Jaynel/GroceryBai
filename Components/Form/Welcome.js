import { View, StyleSheet, ImageBackground } from "react-native";
import { Text, Button } from "react-native-paper";


const image = {uri: '../../assets/landing.png'};

export default function Welcome({ navigation }) {
     return (
          <View style={styles.container}>
               <ImageBackground source={require('../../assets/landing.png')} resizeMode="cover" style={styles.image}>
                    <View>
                         <Button icon={"play-outline"} mode="elevated" textColor="black" style={{top: 350, width: 150, justifyContent: 'center', alignSelf:'center'}} onPress={() => {navigation.replace('Login')}}>Continue</Button>
                    </View>
               </ImageBackground>
          </View>
     )
}


const styles = StyleSheet.create({
     container: {
       flex: 1,
     },
     image: {
       flex: 1,
       justifyContent: 'center',
     },
     text: {
       color: 'white',
       fontSize: 42,
       lineHeight: 84,
       fontWeight: 'bold',
       textAlign: 'center',
       backgroundColor: '#000000c0',
     },
   });