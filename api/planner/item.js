import URL from "../constants"
import * as SecureStore from 'expo-secure-store'


async function ListItem(setList1, setLoading, setError) {
     try {
          setLoading(true)
          const response = await fetch(`${URL}/api/user/items`, {
               headers: {
                    'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`
               }
          })
          const data = await response.json()
     
          setList1(data)
          setLoading(false)
     } catch (error) {
          setError(true)
     }

}

async function ListItem1(itemId) {
     try {
          const response = await fetch(`${URL}/api/user/items?itemId=${itemId}`, {
               headers: {
                    'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`
               }
          })
          const data = await response.json()

          return data
     } catch (error) {
          return error
     }
}


async function updateList(data1) {
     try {
          const response = await fetch(`${URL}/api/user/items`, {
               'method': 'PUT',
               headers: {
                    'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`,
                    'Content-Type': 'application/json'
               },
               body: data1
          })
          const data = await response.json()
     
     } catch (error) {
          console.log(error)
     }

}

async function deleteList(data1, navigation) {
     try {
          const response = await fetch(`${URL}/api/user/items`, {
               'method': 'DELETE',
               headers: {
                    'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`,
                    'Content-Type': 'application/json'
               },
               body: data1
          })
          const data = await response.json()

          navigation.pop()
     
     } catch (error) {
          console.log(error)
          navigation.pop()
     }

}


async function createList(data1) {
     try {
          const response = await fetch(`${URL}/api/user/items`, {
               'method': 'POST',
               headers: {
                    'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`,
                    'Content-Type': 'application/json'
               },
               body: data1
          })
          const data = await response.json()
     
     } catch (error) {
          console.log(error)
     }

}



module.exports = { ListItem, updateList, deleteList, createList, ListItem1  }