import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, doc, getDoc } from "../services/firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Declare the loading state here
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [hasFetchedOnboardingStatus, setHasFetchedOnboardingStatus] =
    useState(false);
  const fetchUserOnboardingStatus = async () => {
    setLoading(true); // Set loading to true at the start

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

    setLoading(false); // Set loading to false at the end
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Set loading to false once the auth state is determined
      if (user) {
        fetchUserOnboardingStatus();
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        hasCompletedOnboarding,
        hasFetchedOnboardingStatus,
        loading,
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
