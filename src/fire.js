import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyDtJFRipXT4endfRmgiXHRJRTDaZIViKhk",
    authDomain: "braingame-495ed.firebaseapp.com",
    databaseURL: "https://braingame-495ed.firebaseio.com",
    projectId: "braingame-495ed",
    storageBucket: "braingame-495ed.appspot.com",
    messagingSenderId: "20617174234"
  };
var fire = firebase.initializeApp(config);
export default fire;