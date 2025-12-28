import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyBO7Xoh53sPwMpo6JMKcrj9i1j9-LITwPA",
  authDomain: "symc-62c8f.firebaseapp.com",
  projectId: "symc-62c8f",
  storageBucket: "symc-62c8f.firebasestorage.app",
  messagingSenderId: "926727338104",
  appId: "1:926727338104:web:ff44abf24feb506eb3d58d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);