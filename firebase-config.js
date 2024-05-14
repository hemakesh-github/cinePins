// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-r7hwKmaWwmV4Bvyyr7UyS2S5W84c854",
  authDomain: "cinepins.firebaseapp.com",
  projectId: "cinepins",
  storageBucket: "cinepins.appspot.com",
  messagingSenderId: "1025518254142",
  appId: "1:1025518254142:web:32f52806aae857ed31396f",
  measurementId: "G-C6N4QCEY4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);