// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGa__Z3y125momPYGI4E0a02zM5gVrkAA",
  authDomain: "evaluacion-6317b.firebaseapp.com",
  projectId: "evaluacion-6317b",
  storageBucket: "evaluacion-6317b.firebasestorage.app",
  messagingSenderId: "453155714045",
  appId: "1:453155714045:web:e8f6736c06f280a63a9f94",
  measurementId: "G-2MLWK2KD5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);