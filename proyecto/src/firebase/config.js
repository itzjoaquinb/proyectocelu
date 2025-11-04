
import app from "firebase/app";
import firebase from "firebase"


const firebaseConfig = {
  apiKey: "AIzaSyCs5o2c2_mM86b7HVf78R36TEHgTYy8vmk",
  authDomain: "proyecto-rn-1f4c2.firebaseapp.com",
  projectId: "proyecto-rn-1f4c2",
  storageBucket: "proyecto-rn-1f4c2.firebasestorage.app",
  messagingSenderId: "896182747277",
  appId: "1:896182747277:web:9c00d2c43a0d08ad55e2c4"
};
app.initializeApp(firebaseConfig)
  
  
export const auth = firebase.auth() 
export const storage = app.storage()
export const db = app.firestore()