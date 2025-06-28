// This file is used to initialize Firebase in our application.
// Need to import the Firebase services we want to use, that is Authentication and Firestore.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCsuO4oZrEdHG9t7E5pa2wn0AoxLY1pm2Q",
    authDomain: "soccer-27.firebaseapp.com",
    projectId: "soccer-27",
    storageBucket: "soccer-27.firebasestorage.app",
    messagingSenderId: "33206326506",
    appId: "1:33206326506:web:2864df2c5ede7647e8f393"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

