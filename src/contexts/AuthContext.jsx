import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, doc, getDoc } from "../services/firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
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
    };

    if (currentUser) {
      fetchUserOnboardingStatus();
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchUserOnboardingStatus();
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, hasCompletedOnboarding }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthProvider, useAuth };
