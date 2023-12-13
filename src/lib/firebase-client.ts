import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp({
  apiKey: "AIzaSyAcSi9nJy77TXVHoiZfhERzez_NlbK3F90",
  authDomain: "nextjs-firestore-73e34.web.app",
  databaseURL: "https://nextjs-demo-73e34-default-rtdb.firebaseio.com",
  projectId: "nextjs-demo-73e34",
  storageBucket: "nextjs-demo-73e34.appspot.com",
  messagingSenderId: "1031831013463",
  appId: "1:1031831013463:web:2a3e8f715c262020f63b12",
  measurementId: "G-SNWQHVDPKK",
});

export const firestore = getFirestore(app);

export const auth = getAuth(app);
