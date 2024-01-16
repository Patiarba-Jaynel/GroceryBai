import URL from "../constants"

async function products(setProduct, setLoading, setError) {
     try {
          setLoading(true)
          const response = await fetch(`${URL}/api/category`)
     
          const data = await response.json()
     
          setProduct([...data])
          setLoading(false)
     } catch (error) {
          setError(true)
     }

}

async function chooseCategory(name, setProduct, setLoading) {
     setLoading(true)
     const response = await fetch(`${URL}/api/category?category=${encodeURIComponent(name)}`)

     const data = await response.json()
     
     setProduct([...data])
     setLoading(false)
}

async function chooseCategory1(name, setProduct, setLoading) {
     setLoading(true)
     const response = await fetch(`${URL}/api/category1?category=${encodeURIComponent(name)}`)

     const data = await response.json()
     
     setProduct([...data])
     setLoading(false)
}

async function searchProduct(name, setProduct, setLoading) { 
     setLoading(true)
     const response = await fetch(`${URL}/api/search?item=${encodeURIComponent(name)}`)
     
     const data = await response.json()

     setProduct([...data])
     setLoading(false)
}

module.exports = { products, chooseCategory, searchProduct, chooseCategory1 } ;