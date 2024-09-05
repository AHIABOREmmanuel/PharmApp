// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwv_j4jt4OPWK5iKtVFb101NlEYAi2eZQ",
  authDomain: "pharmaapp-f733b.firebaseapp.com",
  projectId: "pharmaapp-f733b",
  storageBucket: "pharmaapp-f733b.appspot.com",
  messagingSenderId: "1007557625417",
  appId: "1:1007557625417:web:0d3ec1f477fedb6bcf6198"
};

// Initialize Firebase
export const FIREBASE_APP= initializeApp(firebaseConfig);
export const FIREBASE_AUTH= getAuth(FIREBASE_APP);
export const FIREBASE_DB= getFirestore(FIREBASE_APP);