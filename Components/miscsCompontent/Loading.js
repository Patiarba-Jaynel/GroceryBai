
import { BlurView } from 'expo-blur';
import { StyleSheet, Text, ActivityIndicator, View } from "react-native";

export default function Loading(props){
     const loading = props.loading


     if (loading) {
          return (
               <View style={styles.container} >
                    <BlurView
                    style={styles.absolute}
                    intensity={20} tint='dark'
                    >
                         <ActivityIndicator size={'large'} animating={true}></ActivityIndicator>
                    </BlurView>   
               </View>
          )
     }
}
const styles = StyleSheet.create({
     container: {
       position: 'absolute',
       justifyContent: "center",
       alignItems: "center",
       height: 100,
       width: 100,
       backgroundColor:'#FFFFFF',
       borderRadius: 30,
       elevation: 5,
       overflow: 'hidden',
     },
     absolute: {
          position:'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 4
     }
   });