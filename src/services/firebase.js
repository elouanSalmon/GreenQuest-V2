import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs7mpsU9L_5WYYxORikVp79PCjmtSf_Xs",
  authDomain: "greenquest-0.firebaseapp.com",
  projectId: "greenquest-0",
  storageBucket: "greenquest-0.appspot.com",
  messagingSenderId: "1045310162804",
  appId: "1:1045310162804:web:79e862eccd16cf39248e21",
  measurementId: "G-PY1VCW7VVK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Auth and GoogleAuthProvider
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);

// Export Firestore instance
export const db = getFirestore(app);

// Export Storage instance
export const storage = getStorage(app);

//accessing secret key Stripe
const stripe = new Stripe(functions.config().stripe.secret);
