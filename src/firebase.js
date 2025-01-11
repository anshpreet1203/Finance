// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyD1P1W6mRDlmIoloLBoZrgYl3IcwKfHNkk",
    authDomain: "finance-c07e9.firebaseapp.com",
    projectId: "finance-c07e9",
    storageBucket: "finance-c07e9.firebasestorage.app",
    messagingSenderId: "1079285257725",
    appId: "1:1079285257725:web:33218a925dfbdd7717b594",
    measurementId: "G-BPL1KWGTRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };