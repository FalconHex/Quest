import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBewovtpKkIZtgLfbhOR14sQ7yMTYDpEwk",
    authDomain: "quest-23979.firebaseapp.com",
    projectId: "quest-23979",
    storageBucket: "quest-23979.appspot.com",
    messagingSenderId: "677317184773",
    appId: "1:677317184773:web:c98f605ccc8e964caefb6c"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const db = firebaseApp.firestore();

export {auth, provider};
export default db;