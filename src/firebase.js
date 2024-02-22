import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDsYMye0A9DIPet6nCcuUUGb6sgZgXntQ4",
  authDomain: "clone-instagram-3297e.firebaseapp.com",
  projectId: "clone-instagram-3297e",
  storageBucket: "clone-instagram-3297e.appspot.com",
  messagingSenderId: "29293417303",
  appId: "1:29293417303:web:7ba0e88e014909f6292412",
  measurementId: "G-80NEZJ2WFH"
  });


const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();


export {db, auth, storage, functions};