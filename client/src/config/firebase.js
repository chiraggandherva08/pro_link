// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr9DcSqnGHPUItGvlOqFF7N6YYtETpc8I",
  authDomain: "dev-lambda-383817.firebaseapp.com",
  projectId: "dev-lambda-383817",
  storageBucket: "dev-lambda-383817.appspot.com",
  messagingSenderId: "651376559450",
  appId: "1:651376559450:web:1472976e272b6e5ed21f63",
  measurementId: "G-RXCCWDBTJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

