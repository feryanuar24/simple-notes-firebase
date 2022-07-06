import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBTYGSjsIDB9gOHZ2kBpoqoExLQZoavYjI",
  authDomain: "simple-notes-firebase-30f3d.firebaseapp.com",
  projectId: "simple-notes-firebase-30f3d",
  storageBucket: "simple-notes-firebase-30f3d.appspot.com",
  messagingSenderId: "809897402519",
  appId: "1:809897402519:web:8aa3629964e9f932a1c9d2",
  measurementId: "G-8VLYBY95KG",
};

const init = initializeApp(firebaseConfig);

export const database = getDatabase(init);

const firebase = getAuth(init);

export default firebase;
