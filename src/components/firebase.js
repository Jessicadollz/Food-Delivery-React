// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2_1_f01nVzeosWgFfH5a450S-V0mqRkI",
  authDomain: "login-auth-90bb2.firebaseapp.com",
  projectId: "login-auth-90bb2",
  storageBucket: "login-auth-90bb2.appspot.com",
  messagingSenderId: "1055284359019",
  appId: "1:1055284359019:web:61b145c2b467e31134e62e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;