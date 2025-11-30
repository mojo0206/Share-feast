// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC27Yixw3smX-P3p9oqSNtmy72thHcs7ok",
  authDomain: "sharefeast291125-479708.firebaseapp.com",
  projectId: "sharefeast291125-479708",
  storageBucket: "sharefeast291125-479708.appspot.com",
  messagingSenderId: "924419686776",
  appId: "1:924419686776:web:a4682a4cf923cd134fc88d",
  measurementId: "G-2JCDG61NLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Utils
export { serverTimestamp };
