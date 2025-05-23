// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1oET6ANWFpYhP_9y9A4-PkCpZc-FHINo",
  authDomain: "historical-platform-bc51f.firebaseapp.com",
  projectId: "historical-platform-bc51f",
  storageBucket: "historical-platform-bc51f.firebasestorage.app",
  messagingSenderId: "200141245409",
  appId: "1:200141245409:web:a727aff40c0a4352a360a0",
  measurementId: "G-SH1VYEYRPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getFirestore(app);

export { db };
