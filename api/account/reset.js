import URL from "../constants"


async function SendOTP(data) {
     const response = await fetch(`${URL}/api/user/send`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          body: data
     })
     

     const message =  await response.json()


     return message
}


async function ResetPassword(data) {
     const response = await fetch(`${URL}/api/user/reset`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          body: data
     })
     

     const message =  await response.json()


     return message
}



module.exports = { SendOTP, ResetPassword }