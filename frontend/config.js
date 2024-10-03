import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBQXl1s65EKvbz8b_hcSzEyXT8w05VUCHs",
    authDomain: "earth-vibe.firebaseapp.com",
    projectId: "earth-vibe",
    storageBucket: "earth-vibe.appspot.com",
    messagingSenderId: "382238614510",
    appId: "1:382238614510:web:09841bcbbd2165b5ac24ff",
    measurementId: "G-BVJB5H1P2E"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };