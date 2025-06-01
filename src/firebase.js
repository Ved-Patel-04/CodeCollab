// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";   // <--- add this

const firebaseConfig = {
  apiKey: "AIzaSyDIFZd5StUb2Bm98GzUN8XESUo9z6-DIoM",
  authDomain: "codecollab-ved.firebaseapp.com",
  databaseURL: "https://codecollab-ved-default-rtdb.firebaseio.com",
  projectId: "codecollab-ved",
  storageBucket: "codecollab-ved.appspot.com",
  messagingSenderId: "364745681094",
  appId: "1:364745681094:web:4f717ea5b17df3cb228fc7"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getDatabase(app);
export const auth = getAuth(app);  // <--- export auth here
