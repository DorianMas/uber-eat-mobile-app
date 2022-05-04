import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBJpQP3_s2WqKzDcmsP2do_6UjQlULz1c4",
  authDomain: "uber-eat-app-exercise.firebaseapp.com",
  projectId: "uber-eat-app-exercise",
  storageBucket: "uber-eat-app-exercise.appspot.com",
  messagingSenderId: "158559511982",
  appId: "1:158559511982:web:ac638c819c43554d19d43f",
  measurementId: "G-Y0DCNXH7ZF",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
