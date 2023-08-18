// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  // apiKey: "AIzaSyDbp7tTRQegA5rpaDIO5Op_v7gJdjMEjKY",
  // // apiKey: import.meta.env.VITE_REACT_API_KEY,
  // authDomain: import.meta.env.VITE_REACT_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_REACT_PROJECT_ID ,
  // storageBucket: import.meta.env.REACT_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_REACT_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_REACT_APP_ID,

  // apiKey: "AIzaSyDbp7tTRQegA5rpaDIO5Op_v7gJdjMEjKY",
  // authDomain: "m7al-gomlah.firebaseapp.com",
  // projectId: "m7al-gomlah",
  // storageBucket: "m7al-gomlah.appspot.com",
  // messagingSenderId: "691675781695",
  // appId: "1:691675781695:web:22957c2a473f37fc0f768a",


  apiKey: "AIzaSyAVn3zs-hqFHknKjKmZExtKVsohduwoZ0E",
  authDomain: "supermarket-3ab7b.firebaseapp.com",
  projectId: "supermarket-3ab7b",
  storageBucket: "supermarket-3ab7b.appspot.com",
  messagingSenderId: "324001805315",
  appId: "1:324001805315:web:7b6c14afd9c35cc1fbca36",
  measurementId: "G-TPH3X419GH"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

export const logout = async () => {
  signOut(auth);
};
