import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDuAUd8N0HSYeNiII01zLTUAaKkqrwOxS4",
  authDomain: "grocerybai.firebaseapp.com",
  projectId: "grocerybai",
  storageBucket: "grocerybai.appspot.com",
  messagingSenderId: "424522854726",
  appId: "1:424522854726:web:163086113c6347eb5ab547",
  measurementId: "G-9F1SF8QEPN"
};

firebase.initializeApp(firebaseConfig)

export { firebase }; 