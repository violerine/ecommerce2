import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyD46asFT8QHjRx6Nhu7GbLWz2xd_cOjo6w",
    authDomain: "project-ecommerce.firebaseapp.com",
    databaseURL: "https://project-ecommerce.firebaseio.com",
    projectId: "project-ecommerce",
    storageBucket: "",
    messagingSenderId: "991223831741"
  };
  firebase.initializeApp(config);

export const Database = firebase.database()
