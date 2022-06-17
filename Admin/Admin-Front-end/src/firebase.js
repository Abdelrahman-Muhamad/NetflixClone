import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCbVbqhRelEwGfsk_aVa5VJpe7MK7BdQuE",
    authDomain: "netflix-e5b6b.firebaseapp.com",
    projectId: "netflix-e5b6b",
    storageBucket: "netflix-e5b6b.appspot.com",
    messagingSenderId: "628292580834",
    appId: "1:628292580834:web:b359de615d17ddad78b5bb",
    measurementId: "G-S0PB5EC4CH"
  };

  firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;