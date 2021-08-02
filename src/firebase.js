import firebase from "firebase";

const firebaseConfig = {
    apiKey: "###################",
    authDomain: "###################",
    projectId: "###################",
    storageBucket: "###################",
    messagingSenderId: "###################",
    appId: "###################",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const db = firebaseApp.firestore();

export {auth, provider};
export default db;
