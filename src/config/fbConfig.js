import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAdrE2IZMrS6t9XpbPNN5gbHNwaGt2biNs',
  authDomain: 'tripaze-demo2.firebaseapp.com',
  databaseURL: 'https://tripaze-demo2.firebaseio.com',
  projectId: 'tripaze-demo2',
  storageBucket: 'tripaze-demo2.appspot.com',
  messagingSenderId: '105236210696',
  appId: '1:105236210696:web:14dda452e8e405c8d35dbd',
  measurementId: 'G-ZCNNNY0CZ9',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const storage = firebase.storage();

export { firebase, storage as default };
