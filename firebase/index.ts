// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGo5mWCfzlfIj9oqou-nZPYXKeO6nkHuw",
  authDomain: "petup-428f3.firebaseapp.com",
  projectId: "petup-428f3",
  storageBucket: "petup-428f3.appspot.com",
  messagingSenderId: "780391284177",
  appId: "1:780391284177:web:95c1c5e5d2b791d05874f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)