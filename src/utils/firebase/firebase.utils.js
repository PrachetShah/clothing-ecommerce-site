import { initializeApp } from "firebase/app";
import {
  getAuth,
  sigInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

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
