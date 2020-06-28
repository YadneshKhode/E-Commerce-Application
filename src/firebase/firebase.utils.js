import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBwUj6B0f4KyEIw-J3Uv2M9tH7fH409ics",
  authDomain: "crwn-db-7319a.firebaseapp.com",
  databaseURL: "https://crwn-db-7319a.firebaseio.com",
  projectId: "crwn-db-7319a",
  storageBucket: "crwn-db-7319a.appspot.com",
  messagingSenderId: "893584097987",
  appId: "1:893584097987:web:e414b16f269b492e5c9876",
  measurementId: "G-1YSXGVH1VK",
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;