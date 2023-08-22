import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, doc, getDoc } from "../services/firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  // Add a new state
  const [hasFetchedOnboardingStatus, setHasFetchedOnboardingStatus] =
    useState(false);

  // Update the fetchUserOnboardingStatus function
  const fetchUserOnboardingStatus = async () => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists && userDoc.data().hasCompletedOnboarding) {
        setHasCompletedOnboarding(true);
      } else {
        setHasCompletedOnboarding(false);
      }
    }
    // Move this line outside the currentUser check
    setHasFetchedOnboardingStatus(true);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        hasCompletedOnboarding,
        hasFetchedOnboardingStatus,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthProvider, useAuth };
