// CHANGE THIS FILE WITH TRIPAZE API


import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdrE2IZMrS6t9XpbPNN5gbHNwaGt2biNs",
    authDomain: "tripaze-demo2.firebaseapp.com",
    databaseURL: "https://tripaze-demo2.firebaseio.com",
    projectId: "tripaze-demo2",
    storageBucket: "tripaze-demo2.appspot.com",
    messagingSenderId: "105236210696",
    appId: "1:105236210696:web:14dda452e8e405c8d35dbd",
    measurementId: "G-ZCNNNY0CZ9"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// firebase.firestore().settings({ timestampsInSnapshots: true})
const db = firebase.firestore()

export {db }; // db will store a reference to our firestore
export default firebase;