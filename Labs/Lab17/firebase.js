import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {  getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import {  getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firebase.js";
import { firebaseConfig } from "./config.js";

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);