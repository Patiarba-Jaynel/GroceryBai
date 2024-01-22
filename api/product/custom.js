import URL from "../constants"

import * as SecureStore from 'expo-secure-store'

async function products(setProduct, setLoading, setError) {
     try {
          setLoading(true)
          const response = await fetch(`${URL}/api/custom_category`)
     
          const data = await response.json()
     
          setProduct([...data])
          setLoading(false)
     } catch (error) {
          setError(true)
     }

}

async function chooseCategory(name, setProduct, setLoading) {
     setLoading(true)
     const response = await fetch(`${URL}/api/custom_category?category=${encodeURIComponent(name)}`)

     const data = await response.json()
     
     setProduct([...data])
     setLoading(false)
}

async function createProduct(data1) {
     try {
          const response = await fetch(`${URL}/api/create`, {
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
     const response = await fetch(`${URL}/api/custom_category?category=${encodeURIComponent(name)}`)

     const data = await response.json()
     
     setProduct([...data])
     setLoading(false)
}

async function searchProduct(name, setProduct, setLoading) { 
     setLoading(true)
     const response = await fetch(`${URL}/api/custom_search?item=${encodeURIComponent(name)}`)
     
     const data = await response.json()

     setProduct([...data])
     setLoading(false)
}

module.exports = { products, chooseCategory, searchProduct, chooseCategory1, createProduct } ;