import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { loadStripe } from "@stripe/stripe-js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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

export const registerWithEmail = async (
  email,
  password,
  firstName,
  lastName,
  allowExtraEmails,
  rgpdConsent
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Utilisez firestore pour les opérations Firestore
    const userRef = doc(firestore, "users", user.uid);
    await setDoc(userRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      allowExtraEmails: allowExtraEmails,
      rgpdConsent: rgpdConsent,
    });

    return user;
  } catch (error) {
    throw error;
  }
};
// Export Firestore instance
export const db = getFirestore(app);

// Export Storage instance
export const storage = getStorage(app);

// Save Stripe customer ID to Firestore
export const saveStripeCustomerId = async (userId, customerId) => {
  const userRef = firestore.collection("users").doc(userId);
  await userRef.set({ stripeCustomerId: customerId }, { merge: true });
};

// Retrieve Stripe customer ID from Firestore
export const getStripeCustomerId = async (userId) => {
  const userRef = firestore.collection("users").doc(userId);
  const userDoc = await userRef.get();
  return userDoc.exists ? userDoc.data().stripeCustomerId : null;
};
