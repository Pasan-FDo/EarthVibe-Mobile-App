import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCCCbXgikjeYLLu1qAlLBijM1mE7LDWJO0",
  authDomain: "earthvibe-72fbd.firebaseapp.com",
  projectId: "earthvibe-72fbd",
  storageBucket: "earthvibe-72fbd.appspot.com",
  messagingSenderId: "710905816054",
  appId: "1:710905816054:web:c98e25b58c6662b88bddd7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };