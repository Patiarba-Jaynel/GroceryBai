import { createContext } from "react";
import * as SecureStore from 'expo-secure-store';
import URL from "../api/constants";

let isloggedIn = false

export default async function Check () {
     const token = await SecureStore.getItemAsync('Token')

     if (!token) {
          return false
     }
}

export async function isValid() {
     try {
          const response = await fetch(`${URL}/api/user/me`, {
               headers: {
                    'Authorization': `Bearer ${ await SecureStore.getItemAsync('token')}`
               }
          })
          return response
     } catch (error) {
          return error
     }
}


export const AuthContext = createContext({ isloggedIn: isloggedIn, });