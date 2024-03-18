import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import "firebase/auth";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyAfvZUgXFZ9u00JYG4kIlu_7UJiog-pvC8",
  authDomain: "test-01-c678f.firebaseapp.com",
  databaseURL: "https://web3-334501-default-rtdb.firebaseio.com",
  projectId: "test-01-c678f",
  storageBucket: "test-01-c678f.appspot.com",
  messagingSenderId: "940910304070",
  appId: "1:940910304070:web:267ebe1a6a9330f6322347"
});

export const db = getFirestore(app);
export const storage = getStorage(app);
export const staticStorage = getStorage(app, "gs://static-web3-regional");
