import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyChsf9IINeNzDWPZ--qcJOfyRIBNP5qc1c",
    authDomain: "wheel-of-fortune-b4c69.firebaseapp.com",
    databaseURL: "https://wheel-of-fortune-b4c69.firebaseio.com",
    projectId: "wheel-of-fortune-b4c69",
    storageBucket: "wheel-of-fortune-b4c69.appspot.com",
    messagingSenderId: "172968651984",
    appId: "1:172968651984:web:df5973929cebdd30f7c2d5",
    measurementId: "G-6W46Z5HGET"
  };

  firebase.initializeApp(config);
  export const firestore = firebase.firestore();
  export default firebase;