// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

// Replace process.env calls with actual values
const firebaseConfig = {
  apiKey: "AIzaSyDO9kzHTcMWB2uY3eLJ2L09HEO5xO7XBSk",
  authDomain: "da-source.firebaseapp.com",
  projectId: "da-source",
  storageBucket: "da-source.appspot.com",
  messagingSenderId: "139946344467",
  appId: "1:139946344467:web:5551be32c3115442f8ffe6",
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore();
