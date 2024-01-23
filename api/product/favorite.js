import URL from "../constants"

import * as SecureStore from 'expo-secure-store'

async function products(setProduct, setLoading, setError) {
     try {
          setLoading(true)
          const response = await fetch(`${URL}/api/favorite_category`, {
               headers: {
                    'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`,
               }
          })
     
          const data = await response.json()
     
          setProduct([...data])
          setLoading(false)
     } catch (error) {
          setError(true)
     }

}

async function chooseCategory(name, setProduct, setLoading) {
     setLoading(true)
     const response = await fetch(`${URL}/api/favorite_category?category=${encodeURIComponent(name)}`, {
          headers: {
               'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`,
          }
     })

     const data = await response.json()
     
     setProduct([...data])
     setLoading(false)
}

async function createProduct(data1) {
     try {
          const response = await fetch(`${URL}/api/add_favorite`, {
               'method': 'POST',
               headers: {
                    'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`,
                    'Content-Type': 'application/json'
               },
               body: data1
          })
          const data = await response.json()
          return data
     } catch (error) {
          console.log(error)
     }
}

async function chooseCategory1(name, setProduct, setLoading) {
     setLoading(true)
     const response = await fetch(`${URL}/api/favorite_category?category=${encodeURIComponent(name)}`, {
          headers: {
               'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`,
          }
     })

     const data = await response.json()
     
     setProduct([...data])
     setLoading(false)
}

async function searchProduct(name, setProduct, setLoading) { 
     setLoading(true)
     const response = await fetch(`${URL}/api/favorite_category?item=${encodeURIComponent(name)}`, {
          headers: {
               'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`,
          }
     })
     
     const data = await response.json()

     setProduct([...data])
     setLoading(false)
}

module.exports = { products, chooseCategory, searchProduct, chooseCategory1, createProduct } ;