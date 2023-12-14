import URL from "../constants"


async function Login(data) {
     const response = await fetch(`${URL}/api/user/login`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          body: data
     })


     const message =  await response.json()

     return message
}



module.exports = { Login }