import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import ApplicationPage from './ApplicationPage';
import SignIn from './SignIn';

function AuthenticationHandler() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated) {
    return <ApplicationPage />;
  } else {
    return <SignIn onAuthenticated={() => setIsAuthenticated(true)} />;
  }
}

export default AuthenticationHandler;
