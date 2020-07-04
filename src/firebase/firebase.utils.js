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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // If null don't do anything.
  const userRef = firestore.doc(`users/${userAuth.uid}`);// even if it doesn't exist it will still return object
  const snapshot = await userRef.get();// using get we get snapshot of reference
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error Creating User", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
