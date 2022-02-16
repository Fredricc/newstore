// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCn04aafHOpMk2TsbKPTXcxYgr_433ueeg",
  authDomain: "newstore-a3f89.firebaseapp.com",
  projectId: "newstore-a3f89",
  storageBucket: "newstore-a3f89.appspot.com",
  messagingSenderId: "798023506188",
  appId: "1:798023506188:web:d07d9a499376e5950b9129",
  measurementId: "G-54FZPHVY86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app)

export default fireDB