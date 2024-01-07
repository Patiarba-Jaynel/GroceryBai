import URL from "../constants"


async function CreateAccount(data) {
     const response = await fetch(`${URL}/api/user/create`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          body: data
     })
     
     
     const message =  await response.json()

     return message
}



module.exports = { CreateAccount }