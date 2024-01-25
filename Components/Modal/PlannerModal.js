import { View, StyleSheet } from "react-native"
import { Portal, Modal, Button, TextInput, Text, } from "react-native-paper"
import DropDown from "react-native-paper-dropdown";
import { useState } from "react";
import { ListItem, createList } from '../../api/planner/item'

export default function PlannerModal(props) {
     const [visible, setVisible] = useState(false);
     const showModal = () => setVisible(true);
     const hideModal = () => setVisible(false);
     const containerStyle = {backgroundColor: 'white', padding: 20, alignSelf: 'center', width: 350, borderRadius: 10};
     
     const [listName, setListName] = useState()
     const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
     const [showDropDown, setShowDropDown] = useState(false);
     const [schedule, setSchedule] = useState()
     const Schedules = [
          {
               label: 'Monday',
               value: 'Monday'
          },
          {
               label: 'Tuesday',
               value: 'Tuesday'
          },
          {
               label: 'Wednesday',
               value: 'Wednesday'
          },
          {
               label: 'Thursday',
               value: 'Thursday'
          },
          {
               label: 'Friday',
               value: 'Friday'
          },
          {
               label: 'Saturday',
               value: 'Saturday'
          },
          {
               label: 'Sunday',
               value: 'Sunday'
          },
     ]

     const createNewList = async (name, schedule) => {
          try {
               let data = {
                    name: name,
                    items: [],
                    schedule: schedule
               }
               const addList =  await createList(JSON.stringify(data))

               return addList
          } catch (error) {
               return error
          }

     }

     return (
          <View style={{flex: 1, alignItems: 'center'}}>
          <Portal>
               <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View>
                         <Text variant='titleMedium' style={{padding: 10}}>Add New</Text>
                         <TextInput
                                   value={listName}
                                   onChangeText={(text) => setListName(text)}
                                   autoCapitalize='none'
                                   mode='flat'
                                   activeUnderlineColor='green'
                                   placeholder='List Name'
                                   style={style.Input}>
                         </TextInput>
                         <View style={{margin: 10}}>
                         <DropDown
                         label={'Schedule to purchase'}
                         mode='flat'
                         visible={showMultiSelectDropDown}
                         showDropDown={() => setShowMultiSelectDropDown(true)}
                         onDismiss={() => setShowMultiSelectDropDown(false)}
                         value={schedule}
                         setValue={setSchedule}
                         list={Schedules}
                         activeColor={'green'}
                         inputProps={{ style:style.dropDown}}
                         dropDownItemSelectedStyle={style.dropDown}
                         //dropDownItemSelectedTextStyle={style.dropDown}
                         dropDownItemStyle={style.dropDown}
                         //dropDownItemTextStyle={style.dropDown}
                         />
                         </View>
                         <Button mode='contained-tonal' textColor='white' buttonColor='#18B127' onPress={async () => {
                              try {
                                   if(listName == '') {
                                        Alert.alert('error', 'Please add a name for the list')
                                   }
                                   else {
                                        const add = await createNewList(listName, schedule)
                                        setVisible(false)
                                        props.userMe()
                                        setListName('')
                                   }
                              } catch (error) {
                                   Alert.alert('Error Occurred', error)
                              }

                         }}>Add New List </Button>
                    </View>
               </Modal>
          </Portal>       
          <Button mode='contained-tonal' buttonColor='#18B127' textColor='white' icon={"clipboard-list-outline"}
          onPress={showModal} style={{height: 40, width: 250}}>Add New Weekly Planner</Button>
     </View>
     )
}

const style = StyleSheet.create({
     Input: {
          backgroundColor: 'transparent',
          width: 300,
          borderRadius: 100,
          margin: 10
     },
     dropDown: {
          backgroundColor:'white'
     }
})