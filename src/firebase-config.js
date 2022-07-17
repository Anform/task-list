
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyADy0ejB-f0w2rXr9uoKQiR1Ld8NI3wJqg",
  authDomain: "task-list-6ff79.firebaseapp.com",
  projectId: "task-list-6ff79",
  storageBucket: "task-list-6ff79.appspot.com",
  messagingSenderId: "331518723650",
  appId: "1:331518723650:web:379f39c7bce85f80b1cfdb",
  measurementId: "G-P8VSDRL4LP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);