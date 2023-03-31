// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQIF-Nv29vExXn2m9OJZ3c8JRWF_s2_AU",
  authDomain: "oura-ai.firebaseapp.com",
  databaseURL: "https://oura-ai-default-rtdb.firebaseio.com",
  projectId: "oura-ai",
  storageBucket: "oura-ai.appspot.com",
  messagingSenderId: "385586703455",
  appId: "1:385586703455:web:054cfe7b31ddc5c7b3ffea",
  measurementId: "G-7PNRG0FXKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);