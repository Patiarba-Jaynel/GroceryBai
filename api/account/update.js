import URL from "../constants"
import * as SecureStore from 'expo-secure-store'

async function updateAccount(data) {
     const response = await fetch(`${URL}/api/user/update`, {
          method: 'POST',
          headers: {
               'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`,
               'Content-Type': 'application/json'
          },
          body: data
     })
     
     
     const message =  await response.json()

     return message
}



module.exports = { updateAccount }