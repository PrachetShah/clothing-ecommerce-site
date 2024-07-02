import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// Actual value to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// this is the actual functional component, which has to be added in "index.js"
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  // for every context that gets build for us, there is a provider
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
