import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_96sQ_xjpq1t1ito3kFcXsMRIa0cJzUE",
  authDomain: "chat-cf547.firebaseapp.com",
  projectId: "chat-cf547",
  storageBucket: "chat-cf547.appspot.com",
  messagingSenderId: "581878946405",
  appId: "1:581878946405:web:21e1ab6573ed3fe13a048c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence)
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);