import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDHiYWyv8VzHSw9KU4_WIl_hMi6V2kKqqE",
    authDomain: "todo-hw3-shi-ed78c.firebaseapp.com",
    databaseURL: "https://todo-hw3-shi-ed78c.firebaseio.com",
    projectId: "todo-hw3-shi-ed78c",
    storageBucket: "todo-hw3-shi-ed78c.appspot.com",
    messagingSenderId: "371842295429",
    appId: "1:371842295429:web:f22b507d55fbbd40512bec",
    measurementId: "G-EW00EWF82F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;