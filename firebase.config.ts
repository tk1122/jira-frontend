const firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyDbcHAoqIWfGsdzhrHSAfMbVedOTmaepMo",
  authDomain: "jira-22139.firebaseapp.com",
  databaseURL: "https://jira-22139.firebaseio.com",
  projectId: "jira-22139",
  storageBucket: "jira-22139.appspot.com",
  messagingSenderId: "852768605522",
  appId: "1:852768605522:web:8619bfd52d367dc503268b",
  measurementId: "G-BB7TWQRJ37"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
