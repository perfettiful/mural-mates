
  // src/firebase.js
import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyD6I-P71UPC2Cdd9f_rn9497_20_YPExko",
    authDomain: "muralmates-112a4.firebaseapp.com",
    databaseURL: "https://muralmates-112a4.firebaseio.com",
    projectId: "muralmates-112a4",
    storageBucket: "muralmates-112a4.appspot.com",
    messagingSenderId: "6045233262"
};
firebase.initializeApp(config);
export default firebase;