import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './components/firebase';
import ApplicationPage from './components/ApplicationPage';
import SignIn from './components/SignIn';

function App() {
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

export default App;
