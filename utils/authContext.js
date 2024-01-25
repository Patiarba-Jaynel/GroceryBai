import { createContext } from "react";
import * as SecureStore from 'expo-secure-store';


let isloggedIn = false

export default async function Check () {
     const token = await SecureStore.getItemAsync('Token')

     if (token) {
          return isloggedIn = true
     }
}


export const AuthContext = createContext({ isloggedIn: isloggedIn, });