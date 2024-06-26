import { initializeApp } from "firebase/app";
import {
  getAuth,
  sigInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

/*
  Initalisize the provider needed for login, we are using Google Auth Provider, similar are Facebook, Twitter, Github, etc
*/
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// There can be multiple providers for diff methods but one app has a single Auth i.e. getAuth()
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

//-------------------------------------------------------------------------------------------

/*
  CREATE USER DOCUMENT IN FIRESTORE FROM userAuth received from firebase
  
  userAuth -> contains all data of user from google sign-in
  
  additionalInformation -> required for email/password login since the auth received 
    does not have displayName which is passed through additional information to
    store in firestore document
*/
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  // Getting DB collection on which we can apply the GET and SET methods
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  /* 
    if userSnapshot.exists() === false ,then create document in database since it does not have in db  
    if user data exists() === true -> return userDocRef
  */
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }
  return userDocRef;
};

//-----------------------------------------------------------------------------------

/* CREATE USER WITH EMAIL AND PASSWORD */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  // RETURNS USER AUTH from FIREBASE
  return await createUserWithEmailAndPassword(auth, email, password);
};

/* SIGN IN USER WITH EMAIL AND PASSWORD */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  // RETURNS USER AUTH from FIREBASE
  return await signInWithEmailAndPassword(auth, email, password);
};

/* SIGN OUT Method */
export const signOutUser = async () => {
  await signOut(auth);
};

/*
  Helps reduce usage of Context for currentUser in every component by listening to Change in Auth State,
  It is an Observer Pattern 
*/
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
