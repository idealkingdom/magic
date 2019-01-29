  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBl5RbSWauHZNEEwJLwSMJiNfN_Hq5Rgko",
    authDomain: "firestoredynata.firebaseapp.com",
    databaseURL: "https://firestoredynata.firebaseio.com",
    projectId: "firestoredynata",
    storageBucket: "firestoredynata.appspot.com",
    messagingSenderId: "845172163083"
  };
  firebase.initializeApp(config);


var db = firebase.firestore();
var storageRef = firebase.storage().ref();
// Disable deprecated features

