import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCOzL-C-imvZ7vucKiCDdNeGUgLkooe_Vg",
  authDomain: "final-project-cse-316.firebaseapp.com",
  databaseURL: "https://final-project-cse-316.firebaseio.com",
  projectId: "final-project-cse-316",
  storageBucket: "final-project-cse-316.appspot.com",
  messagingSenderId: "360491968646",
  appId: "1:360491968646:web:456021dc8057936bdd4907",
  measurementId: "G-4G2TFRTTQ6"
  };
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore(firebase.initializeApp(firebaseConfig));

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;