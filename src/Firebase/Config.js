
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCys8cvC5bgrybcF0lP7KHZ7kwgdhP_mEI",
    authDomain: "stream-98aaa.firebaseapp.com",
    projectId: "stream-98aaa",
    storageBucket: "stream-98aaa.firebasestorage.app",
    messagingSenderId: "387523840099",
    appId: "1:387523840099:web:30fab64ad8a1d71b265056",
    measurementId: "G-GGJDHX2FLJ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore
const auth = getAuth(app); // Authentication
const analytics = getAnalytics(app); // Analytics

export { db, auth, analytics};
