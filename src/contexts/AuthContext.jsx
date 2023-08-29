import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, doc, getDoc } from "../services/firebase";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [hasFetchedOnboardingStatus, setHasFetchedOnboardingStatus] =
    useState(false);

  const fetchUserOnboardingStatus = async () => {
    setLoading(true);
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists && userDoc.data().hasCompletedOnboarding) {
        setHasCompletedOnboarding(true);
      } else {
        setHasCompletedOnboarding(false);
      }
    }
    setHasFetchedOnboardingStatus(true);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        const onboardingStatus = await fetchUserOnboardingStatus(user.uid);
        setHasCompletedOnboarding(onboardingStatus);
        setHasFetchedOnboardingStatus(true);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    hasCompletedOnboarding,
    hasFetchedOnboardingStatus,
    loading,
    fetchUserOnboardingStatus,
    setHasCompletedOnboarding,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthProvider, useAuth };
