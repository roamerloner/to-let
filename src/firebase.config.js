// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwmDvm3jpzXyNbu7FwfGz0ybOTJAJRZLo",
  authDomain: "to-let-80c58.firebaseapp.com",
  projectId: "to-let-80c58",
  storageBucket: "to-let-80c58.appspot.com",
  messagingSenderId: "476583125025",
  appId: "1:476583125025:web:c013ad38ddfc7e6a0a0360"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();