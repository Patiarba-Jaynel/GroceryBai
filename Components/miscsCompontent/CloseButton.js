import { View } from 'react-native';
import { IconButton } from 'react-native-paper';



export default function CloseButton(props) {
     return (
          <View style={{alignItems:'flex-start',flexDirection:''}}>
               <IconButton
               mode='default'
               icon="close-circle-outline"
               color={"#EFEEEE"}
               size={30}
               onPress={() => (props.navigation.pop())}
               />
          </View>
     )
}