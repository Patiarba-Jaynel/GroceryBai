import {View, StyleSheet, TouchableOpacity, Alert, ScrollView, SafeAreaView} from 'react-native';
import {Text} from 'react-native-paper';
import CloseButton from "../miscsCompontent/CloseButton";



function FAQ({navigation}) {
     return (
          <SafeAreaView style={{flex:1, alignItems:'center', marginLeft:24, marginRight:24}}>
               <ScrollView showsVerticalScrollIndicator={false}>
               <View>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'green'}}>
                    1.What is the Grocery Bai Application? 
                    </Text>
                    <Text></Text>
                    <Text style={{textAlign:'justify', fontSize:16}}>
                    The Grocery Bai Application is a convenient tool designed to help you plan, 
                    organize, and manage your grocery shopping. It allows you to create and 
                    customize shopping lists, making your trips to the grocery store more efficient.
                    </Text>

                    <Text></Text>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'green'}}>
                    2.How do I create a new grocery list?
                    </Text>
                    <Text></Text>
                    <Text style={{textAlign:'justify', fontSize:16}}>
                    To create a new grocery list, simply open the app and navigate to the 
                    "Planner" screen. Give your list a name and add a schedule when to buy 
                    then you can start adding items to it by searching or browsing through 
                    the home screen, or just press the "add more" button.
                    </Text>

                    <Text></Text>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'green'}}>
                    3. Can I customize my grocery lists?
                    </Text>
                    <Text></Text>
                    <Text style={{textAlign:'justify', fontSize:16}}>
                    Yes, you can customize your grocery lists by adding or removing items, 
                    adjusting quantities, and organizing items into categories. This way, 
                    you can tailor your lists to match your preferences and shopping habits.
                    </Text>

                    <Text></Text>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'green'}}>
                    4. Is there a way to share my grocery list with others?
                    </Text>
                    <Text></Text>
                    {/* Initial explanation cuz this is not yet added */}
                    <Text style={{textAlign:'justify', fontSize:16}}>
                    Absolutely! The app allows you to share your grocery lists with family
                    members, friends, or anyone you want to collaborate with. Simply select 
                    the "Share" option and choose the desired sharing method, such as email 
                    or messaging.
                    </Text>

                    <Text></Text>
                    {/* Initial explanation cuz this is not yet added */}
                    <Text style={{fontSize:20, fontWeight:'bold', color:'green'}}>
                    5. Can I set reminders for my grocery lists?
                    </Text>
                    <Text></Text>
                    <Text style={{textAlign:'justify', fontSize:16}}>
                    Yes, the app comes with a reminder feature that allows you to set 
                    notifications for your grocery lists. This can help ensure you never 
                    forget an item and stay on top of your shopping needs.
                    </Text>

                    <Text></Text>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'green'}}>
                    6. How do I synchronize my grocery lists across multiple devices?
                    </Text>
                    <Text></Text>
                    <Text style={{textAlign:'justify', fontSize:16}}>
                    The app provides synchronization capabilities, allowing you to access your 
                    grocery lists from different devices. Make sure you are logged in with the 
                    same account on all devices, and your lists will be automatically synchronized.
                    </Text>

                    <Text></Text>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'green'}}>
                    7. Is there a barcode scanning feature?
                    </Text>
                    <Text></Text>
                    <Text style={{textAlign:'justify', fontSize:16}}>
                    There is no barcode available on this application.
                    </Text>

                    <Text></Text>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'green'}}>
                    8. Can I track my expenses using the Grocery Bai Application?
                    </Text>
                    <Text></Text>
                    <Text style={{textAlign:'justify', fontSize:16}}>
                    While the primary focus is on creating and managing lists, 
                    some versions of the app may include expense tracking features. 
                    Check the app's "Planner" Screen.
                    </Text>

                    <Text></Text>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'green'}}>
                    9. How often is the app updated with new features?
                    </Text>
                    <Text></Text>
                    <Text style={{textAlign:'justify', fontSize:16}}>
                    The app is regularly updated to improve performance, add new 
                    features, and enhance user experience. Check the app store for 
                    updates, and be sure to enable automatic updates on your device 
                    for the latest improvements.
                    </Text>

                    <Text></Text>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'green'}}>
                    10. What do I do if I encounter issues with the app?
                    </Text>
                    <Text></Text>
                    <Text style={{textAlign:'justify', fontSize:16}}>
                    If you experience any issues or have questions, visit the app's 
                    support page for troubleshooting guides or contact the support 
                    team for assistance. They will be happy to help resolve any 
                    concerns you may have.
                    </Text>
               </View>
               </ScrollView>
          </SafeAreaView>
     )
}

export default FAQ;

const style = StyleSheet.create({
     container: 
     {
          backgroundColor: 'white',
          display: 'flex',
          width: 170, 
          height: 250, 
          alignItems: 'center', 
          borderRadius: 20, 
          margin: 5,
          elevation: 3,
     },
     image: {
          borderTopEndRadius: 20,
          borderTopLeftRadius: 20,
          width: 170,
          height: 150,
          marginBottom: 10
     },
     imageContainer: 
     {
          borderRadius: 100,
          backgroundColor: 'white', 
          margin: 5,
          shadowColor: "green",
          shadowOffset: {
               width: 0,
               height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
     }
})