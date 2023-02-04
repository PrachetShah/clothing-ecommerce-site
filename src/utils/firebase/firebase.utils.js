import { initializeApp } from "firebase/app";
import {
  getAuth,
  sigInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0q7e4UQSRv8p1KGoDAlxnGxEb5o5igVo",
  authDomain: "ecommerce-store-e846c.firebaseapp.com",
  projectId: "ecommerce-store-e846c",
  storageBucket: "ecommerce-store-e846c.appspot.com",
  messagingSenderId: "69184092990",
  appId: "1:69184092990:web:3332f660a866e84588ca6f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// There can be multiple providers for diff methods but one app has a single Auth i.e. getAuth()
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // if user data exists -> return userDocRef
  // if user data does not exist -> create/set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  } else {
    return userDocRef;
  }
};
