import {Text, TouchableOpacity, StyleSheet} from 'react-native'


function TestButton(props) {
     return (
          <TouchableOpacity style={style.buttonStyle}>
               <Text style={{color: '#F6F6F9',fontWeight: 400}}>
                    {props.name}
               </Text>
          </TouchableOpacity>
     )
}


export default TestButton;



const style = StyleSheet.create({
     buttonStyle: {
          alignItems:'center',
          justifyContent:'center',
          borderRadius:30,
          width: 314,
          height: 70,
          color:'#18B127',
          backgroundColor:'#18B127'
     }
})