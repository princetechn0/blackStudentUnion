// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpC-3bwTUCX5v7S2qMeMUtpOwDA3HiLjU",
  authDomain: "uci-blacksu.firebaseapp.com",
  projectId: "uci-blacksu",
  storageBucket: "uci-blacksu.appspot.com",
  messagingSenderId: "319287840462",
  appId: "1:319287840462:web:4e5cceb64a6ebdc49c8a9f",
  measurementId: "G-EZYE6GR345",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { db, storage };
