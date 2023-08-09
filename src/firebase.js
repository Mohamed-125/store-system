// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_REACT_APP_ID) // 123

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_API_KEY,
  authDomain: import.meta.env.VITE_REACT_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_PROJECT_ID ,
  storageBucket: import.meta.env.REACT_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
