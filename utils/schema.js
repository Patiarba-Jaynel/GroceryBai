
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
     email: Yup.string().email().required('Email is required'),
     password: Yup.string().required('Password is required')
})


const registerSchema = Yup.object().shape(
     {    
          name: Yup.string().required(),
          email: Yup.string().email().required().lowercase(),
          password: Yup.string().required('Password is required'),
          renter_password: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match')
     }    
)

const forgotSchema = Yup.object().shape(
     {
          email: Yup.string().email().required('Email is required').lowercase(),
     }    
)

module.exports = { loginSchema, registerSchema, forgotSchema }; 
