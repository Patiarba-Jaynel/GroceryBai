
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
     email: Yup.string().email().required('Email is required'),
     password: Yup.string().required('Password is required')
})


const registerSchema = Yup.object().shape(
     {    
          first_name: Yup.string().required('First name is required'),
          last_name: Yup.string().required('Last name is required'),
          email: Yup.string().email().required().lowercase(),
          password: Yup.string().required('Password is required')
     }    
)

const forgotSchema = Yup.object().shape(
     {
          email: Yup.string().email().required('Email is required').lowercase(),
     }    
)

const PasswordResetSchema = Yup.object().shape(
     {
          otp: Yup.string().required('6 Digit Code is required').length(6),
          password: Yup.string().required('Password is required')
     }    
)

module.exports = { loginSchema, registerSchema, forgotSchema, PasswordResetSchema }; 
