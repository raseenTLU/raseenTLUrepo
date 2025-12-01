//const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

import {  createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          signOut,
          onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { auth } from "./firebase.js";

  export const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      return userCredential.user;
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorCode, errorMessage);
    }
  }

  export const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      console.log(errorCode, errorMessage);
    }
  }

  export const logout = async () => {
    try {
      await signOut(auth);
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorCode, errorMessage);
    }
  }

  export const onAuthChange = (callback)=>{
    return onAuthStateChange(auth, user => {
      callback(user)
    })
  }