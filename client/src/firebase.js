// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArTKtNCRfi6OgyMqMNq1rpHDtyT6099GE",
  authDomain: "mern-estate-3c26c.firebaseapp.com",
  projectId: "mern-estate-3c26c",
  storageBucket: "mern-estate-3c26c.appspot.com",
  messagingSenderId: "887550954546",
  appId: "1:887550954546:web:3ce98d7f9b02c4781d802b",
  measurementId: "G-P8JGVXNJW9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
