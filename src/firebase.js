// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ikms-d78d2.firebaseapp.com",
  projectId: "ikms-d78d2",
  storageBucket: "ikms-d78d2.firebasestorage.app",
  messagingSenderId: "371692480080",
  appId: "1:371692480080:web:5d494f619d8fe1c6089355",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
