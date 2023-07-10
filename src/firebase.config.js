// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-iopdai54HXHpbcvONI_0xvSHFc5euQI",
  authDomain: "to-let-f9821.firebaseapp.com",
  projectId: "to-let-f9821",
  storageBucket: "to-let-f9821.appspot.com",
  messagingSenderId: "355942244186",
  appId: "1:355942244186:web:24501820efea1d2654dd63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();